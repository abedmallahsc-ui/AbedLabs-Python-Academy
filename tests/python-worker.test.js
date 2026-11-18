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
  let runtimeLoads = 0;
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
      context.loadPyodide = async () => {
        runtimeLoads += 1;
        return runtime;
      };
    },
  };
  vm.runInNewContext(workerSource, context);
  return {
    messages,
    get runtimeLoads() {
      return runtimeLoads;
    },
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
    runPython() {
      return { destroy() {} };
    },
    async runPythonAsync(code, { globals }) {
      assert.ok(globals);
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
    runPython() {
      return { destroy() {} };
    },
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
    runPython() {
      return { destroy() {} };
    },
    async runPythonAsync() {
      this.stdout("x".repeat(50_000));
    },
  };
  const worker = createWorker(runtime);
  await worker.run({ code: "print('x')", input: "" });

  assert.equal(worker.messages[1].output.length, 20_000);
});

test("Python worker reuses its runtime for separate runs and isolates globals", async () => {
  const namespaces = [];
  const runtime = {
    setStdout() {},
    setStderr() {},
    setStdin() {},
    runPython() {
      const namespace = { destroy() {} };
      namespaces.push(namespace);
      return namespace;
    },
    async runPythonAsync(_code, { globals }) {
      assert.ok(globals);
    },
  };
  const worker = createWorker(runtime);
  await worker.run({ code: "value = 1", input: "", runId: 1 });
  await worker.run({ code: "value = 2", input: "", runId: 2 });

  assert.equal(worker.runtimeLoads, 1);
  assert.equal(namespaces.length, 2);
  assert.notEqual(namespaces[0], namespaces[1]);
  assert.deepEqual(
    worker.messages.map((message) => [message.status, message.runId]),
    [
      ["ready", 1],
      ["complete", 1],
      ["ready", 2],
      ["complete", 2],
    ],
  );
});

test("Python worker returns an explanation trace and releases proxy results", async () => {
  let assignedCode;
  let proxyDestroyed = false;
  const runtime = {
    setStdout() {},
    setStderr() {},
    setStdin() {},
    runPython() {
      return {
        destroy() {},
        set(name, value) {
          assert.equal(name, "__academy_code");
          assignedCode = value;
        },
      };
    },
    async runPythonAsync(script, { globals }) {
      assert.ok(globals);
      assert.match(script, /_trace_print/);
      return {
        toJs() {
          return JSON.stringify({
            events: [{ line: 1, output: "Hello\n" }],
            output: "Hello\n",
            error: null,
            truncated: false,
          });
        },
        destroy() {
          proxyDestroyed = true;
        },
      };
    },
  };
  const worker = createWorker(runtime);
  await worker.run({
    code: 'print("Hello")',
    input: "",
    mode: "explain",
    runId: 7,
  });

  assert.equal(assignedCode, 'print("Hello")');
  assert.equal(worker.messages[1].status, "complete");
  assert.equal(worker.messages[1].runId, 7);
  assert.deepEqual(JSON.parse(worker.messages[1].explanation), {
    events: [{ line: 1, output: "Hello\n" }],
    output: "Hello\n",
    error: null,
    truncated: false,
  });
  assert.equal(proxyDestroyed, true);
});

test("Python worker accepts a JavaScript string explanation result", async () => {
  const runtime = {
    setStdout() {},
    setStderr() {},
    setStdin() {},
    runPython() {
      return { set() {}, destroy() {} };
    },
    async runPythonAsync() {
      return '{"events":[],"output":"","error":null,"truncated":false}';
    },
  };
  const worker = createWorker(runtime);
  await worker.run({ code: "value = 1", input: "", mode: "explain" });

  assert.equal(worker.messages[1].status, "complete");
  assert.equal(
    worker.messages[1].explanation,
    '{"events":[],"output":"","error":null,"truncated":false}',
  );
});
