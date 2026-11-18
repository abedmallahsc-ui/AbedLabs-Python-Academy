import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const workerSource = await readFile(
  new URL("../assets/js/python-worker.js", import.meta.url),
  "utf8",
);

function createWorker(runtime) {
  let messageHandler;
  const messages = [];
  const context = {
    self: {
      addEventListener(type, handler) {
        assert.equal(type, "message");
        messageHandler = handler;
      },
      postMessage(message) {
        messages.push(message);
      },
    },
    importScripts(url) {
      assert.equal(
        url,
        "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js",
      );
      context.loadPyodide = async () => runtime;
    },
  };
  vm.runInNewContext(workerSource, context);
  return {
    messages,
    run: (data) => messageHandler({ data }),
  };
}

test("Python worker captures output and passes input lines to stdin", async () => {
  let stdin;
  const runtime = {
    setStdout({ batched }) {
      this.stdout = batched;
    },
    setStderr() {},
    setStdin(options) {
      stdin = options.stdin;
    },
    async runPythonAsync(code) {
      assert.equal(code, "print(input())");
      assert.equal(stdin(), "héllo");
      assert.equal(stdin(), "second");
      assert.equal(stdin(), undefined);
      this.stdout("héllo");
    },
  };
  const worker = createWorker(runtime);
  await worker.run({ code: "print(input())", input: "héllo\nsecond" });

  assert.equal(worker.messages.length, 2);
  assert.equal(worker.messages[0].status, "ready");
  assert.equal(worker.messages[1].status, "complete");
  assert.equal(worker.messages[1].output, "héllo\n");
});

test("Python worker reports execution errors with captured output", async () => {
  const runtime = {
    setStdout({ batched }) {
      this.stdout = batched;
    },
    setStderr({ batched }) {
      this.stderr = batched;
    },
    setStdin() {},
    async runPythonAsync() {
      this.stdout("before error");
      this.stderr("Traceback");
      throw new Error("SyntaxError");
    },
  };
  const worker = createWorker(runtime);
  await worker.run({ code: "bad code", input: "" });

  assert.equal(worker.messages[1].status, "error");
  assert.match(worker.messages[1].output, /before error/);
  assert.match(worker.messages[1].output, /Traceback/);
  assert.match(worker.messages[1].error, /SyntaxError/);
});

test("Python worker bounds captured output", async () => {
  const runtime = {
    setStdout({ batched }) {
      this.stdout = batched;
    },
    setStderr() {},
    setStdin() {},
    async runPythonAsync() {
      this.stdout("x".repeat(50_000));
    },
  };
  const worker = createWorker(runtime);
  await worker.run({ code: "print('x')", input: "" });

  assert.equal(worker.messages[1].output.length, 20_000);
});
