const PYODIDE_VERSION = "0.27.7";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const OUTPUT_LIMIT = 20_000;
let runtimePromise;

function getRuntime() {
  if (!runtimePromise) {
    runtimePromise = (async () => {
      importScripts(`${PYODIDE_BASE}pyodide.js`);
      return loadPyodide({ indexURL: PYODIDE_BASE });
    })();
  }
  return runtimePromise;
}

self.addEventListener("message", async (event) => {
  const { code, input } = event.data;
  let output = "";
  const appendOutput = (text) => {
    output += `${text}\n`.slice(0, OUTPUT_LIMIT - output.length);
  };
  const inputLines = String(input ?? "")
    .replace(/\r\n/g, "\n")
    .split("\n");
  let inputIndex = 0;

  try {
    const pyodide = await getRuntime();
    self.postMessage({ status: "ready" });
    pyodide.setStdout({ batched: appendOutput });
    pyodide.setStderr({ batched: appendOutput });
    pyodide.setStdin({
      stdin: () =>
        inputIndex < inputLines.length ? inputLines[inputIndex++] : undefined,
    });
    await pyodide.runPythonAsync(code);
    self.postMessage({ output, status: "complete" });
  } catch (error) {
    self.postMessage({
      output,
      error: String(error).slice(0, OUTPUT_LIMIT),
      status: "error",
    });
  }
});
