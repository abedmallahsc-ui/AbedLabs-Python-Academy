import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const { headers } = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

function contentSecurityPolicy(source) {
  const config = headers.find((header) => header.source === source);
  return config.headers.find(
    (header) => header.key === "Content-Security-Policy",
  ).value;
}

test("CSP allows Pyodide WebAssembly without enabling JavaScript eval", () => {
  for (const source of ["/assets/js/python-worker.js", "/(.*)"]) {
    const policy = contentSecurityPolicy(source);
    assert.match(policy, /script-src[^;]*'wasm-unsafe-eval'/);
    assert.doesNotMatch(policy, /'unsafe-eval'/);
  }
});
