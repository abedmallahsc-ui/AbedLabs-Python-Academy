import assert from "node:assert/strict";
import { test } from "node:test";
import { renderCodeExplanation } from "../assets/js/code-explanations.js";

test("code explanation describes each line and reports exact loop output", () => {
  const explanation = renderCodeExplanation(
    'total = 0\nfor number in range(1, 4):\n    total += number\n    print(number, total)\nprint("Total:", total)',
    {
      events: [
        { line: 4, output: "1 1\n" },
        { line: 4, output: "2 3\n" },
        { line: 4, output: "3 6\n" },
        { line: 5, output: "Total: 6\n" },
      ],
    },
  );

  assert.match(explanation, /Line 1:<\/strong> Assignment/);
  assert.match(explanation, /stop value is excluded/);
  assert.match(explanation, /Output from this line \(3 times\)/);
  assert.match(explanation, /1 1\n2 3\n3 6\n/);
  assert.match(explanation, /Total: 6\n/);
  assert.match(explanation, /Complete program output/);
});

test("code explanation identifies no-output lines and runtime errors", () => {
  const explanation = renderCodeExplanation("value = 1\nprint(value)\nprint(1 / 0)", {
    events: [{ line: 2, output: "1\n" }],
    error: "ZeroDivisionError: division by zero",
  });

  assert.match(explanation, /stores the result in `value`/);
  assert.match(explanation, /Output from this line/);
  assert.match(explanation, /did not produce output before the error/);
  assert.match(explanation, /ZeroDivisionError: division by zero/);
});

test("code explanation escapes source and output before rendering HTML", () => {
  const explanation = renderCodeExplanation("print('<script>')", {
    events: [{ line: 1, output: "<script>\n" }],
  });

  assert.doesNotMatch(explanation, /<script>/);
  assert.match(explanation, /&lt;script&gt;/);
});

test("code explanation explicitly says when a program prints nothing", () => {
  const explanation = renderCodeExplanation("value = 42");

  assert.match(explanation, /This code produced no printed output/);
  assert.match(explanation, /does not print by itself/);
});
