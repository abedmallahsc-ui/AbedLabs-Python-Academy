const PYODIDE_VERSION = "0.27.7";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const OUTPUT_LIMIT = 20_000;
let runtimePromise;
const EXPLANATION_SCRIPT = `
import ast as _ast
import builtins as _builtins
import inspect as _inspect
import io as _io
import json as _json

_events = []
_captured_size = 0
_event_limit = 300
_output_limit = 20000
_trace_truncated = False
_source = __academy_code
_stdout = _io.StringIO()

def _trace_print(*args, **kwargs):
    global _captured_size, _trace_truncated
    _line = _inspect.currentframe().f_back.f_lineno
    if kwargs.get("file") is not None:
        _builtins.print(*args, **kwargs)
        return
    _line_output = _io.StringIO()
    kwargs["file"] = _line_output
    _builtins.print(*args, **kwargs)
    _text = _line_output.getvalue()
    _remaining = _output_limit - _captured_size
    if _remaining > 0 and len(_events) < _event_limit:
        _text = _text[:_remaining]
        _events.append({"line": _line, "output": _text})
        _stdout.write(_text)
        _captured_size += len(_text)
    else:
        _trace_truncated = True

_builtins_for_program = dict(vars(_builtins))
_builtins_for_program["print"] = _trace_print
_namespace = {
    "__builtins__": _builtins_for_program,
    "__name__": "__main__",
}
_error = None
try:
    _tree = _ast.parse(_source, filename="<student>")
    exec(compile(_tree, "<student>", "exec"), _namespace)
except BaseException as _exception:
    _error = f"{type(_exception).__name__}: {_exception}"

_json.dumps({
    "events": _events,
    "output": _stdout.getvalue(),
    "error": _error,
    "truncated": _trace_truncated,
}, ensure_ascii=False)
`;

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
  const { code, input, mode, runId } = event.data;
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
    self.postMessage({ runId, status: "ready" });
    pyodide.setStdout({ batched: appendOutput });
    pyodide.setStderr({ batched: appendOutput });
    pyodide.setStdin({
      stdin: () =>
        inputIndex < inputLines.length ? inputLines[inputIndex++] : undefined,
    });
    const globals = pyodide.runPython("dict(__name__='__main__')");
    try {
      if (mode === "explain") {
        globals.set("__academy_code", code);
        const result = await pyodide.runPythonAsync(EXPLANATION_SCRIPT, {
          globals,
        });
        try {
          self.postMessage({
            explanation: typeof result === "string" ? result : result.toJs(),
            output,
            runId,
            status: "complete",
          });
        } finally {
          if (typeof result !== "string") result.destroy();
        }
      } else {
        await pyodide.runPythonAsync(code, { globals });
        self.postMessage({ output, runId, status: "complete" });
      }
    } finally {
      globals.destroy();
    }
  } catch (error) {
    self.postMessage({
      output,
      error: String(error).slice(0, OUTPUT_LIMIT),
      runId,
      status: "error",
    });
  }
});
