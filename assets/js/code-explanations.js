function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function describeLine(sourceLine) {
  const indentation = sourceLine.match(/^\s*/)[0].length;
  const line = sourceLine.trim();
  if (!line) return "Blank line: it separates parts of the program for readability.";
  if (line.startsWith("#")) {
    return "Comment: Python ignores this line when running the program; it is a note for the reader.";
  }
  if (/^(from .+ import |import )/.test(line)) {
    return "Import: makes the named module or selected names available to the following code. Importing alone does not print output.";
  }
  if (/^def\s+/.test(line)) {
    return "Function definition: creates reusable instructions and names its parameters. The indented function body does not run until the function is called.";
  }
  if (/^class\s+/.test(line)) {
    return "Class definition: creates a class used to describe objects. Its indented body defines the class contents.";
  }
  if (/^@/.test(line)) {
    return "Decorator: modifies or wraps the function or class defined immediately below it.";
  }
  if (/^if\s+/.test(line)) {
    return "Condition: Python evaluates this expression as true or false. It runs the following indented block only when the condition is true.";
  }
  if (/^elif\s+/.test(line)) {
    return "Alternative condition: Python checks this only if the earlier if/elif conditions were false.";
  }
  if (line === "else:" || line.startsWith("else:")) {
    return "Fallback branch: Python runs this indented block only when the preceding if conditions were false, or when a loop finished without break.";
  }
  if (/^for\s+/.test(line)) {
    const range = line.match(/\brange\(([^)]*)\)/);
    const rangeNote = range
      ? ` The range is range(${range[1]}); its stop value is excluded.`
      : "";
    return `Loop: Python takes the next item and assigns it to the loop variable, then runs the indented body. The body repeats once per item.${rangeNote}`;
  }
  if (/^while\s+/.test(line)) {
    return "Loop condition: Python checks this condition before each pass. The indented body repeats while it is true, so something in the loop usually needs to make it become false.";
  }
  if (/^try:/.test(line)) {
    return "Error-handling block: Python runs the indented statements and transfers to a matching except block if one of them raises an error.";
  }
  if (/^except\b/.test(line)) {
    return "Error handler: this block runs only if the try block raises a matching exception.";
  }
  if (/^finally:/.test(line)) {
    return "Cleanup block: Python runs this after try/except whether the operation succeeded or raised an error.";
  }
  if (/^with\s+/.test(line)) {
    return "Context manager: enters the managed operation, runs the indented body, then performs its cleanup when the body ends.";
  }
  if (/^return\b/.test(line)) {
    return "Return: evaluates this value, sends it back to the caller, and ends the current function call. Return itself does not print.";
  }
  if (/^yield\b/.test(line)) {
    return "Yield: produces this value for the caller and pauses the generator until it is asked for another value.";
  }
  if (/^break$/.test(line)) {
    return "Break: immediately exits the nearest enclosing loop; remaining iterations are skipped.";
  }
  if (/^continue$/.test(line)) {
    return "Continue: skips the rest of this loop iteration and moves to the next one.";
  }
  if (/^pass$/.test(line)) {
    return "Pass: intentionally does nothing; it is a placeholder where Python requires a statement.";
  }
  if (/^raise\b/.test(line)) {
    return "Raise: signals an exception. Python stops the current path unless a matching except block handles it.";
  }
  if (/^assert\b/.test(line)) {
    return "Assertion: checks whether this expression is true. It produces no output when true and raises AssertionError when false.";
  }
  if (/^print\s*\(/.test(line)) {
    return "Print: Python evaluates the arguments from left to right and writes their displayed values to the output. The exact output for this line is shown below.";
  }
  if (/^input\s*\(/.test(line) || /=\s*input\s*\(/.test(line)) {
    return "Input: waits for the next supplied input line. If assigned to a variable, that variable receives the entered text as a string.";
  }
  const assignment = line.match(
    /^([A-Za-z_]\w*(?:\.[A-Za-z_]\w*|\[[^\]]+\])*)\s*(\+=|-=|\*=|\/=|\/\/=|%=|\*\*=|=)(?!=)\s*(.*)$/,
  );
  if (assignment) {
    const [, target, operator, expression] = assignment;
    if (operator === "=") {
      return `Assignment: Python evaluates \`${expression}\` and stores the result in \`${target}\`. Assignment changes program state but does not print by itself.`;
    }
    const operation = {
      "+=": "adds",
      "-=": "subtracts",
      "*=": "multiplies",
      "/=": "divides",
      "//=": "floor-divides",
      "%=": "stores the remainder from dividing",
      "**=": "raises",
    }[operator];
    return `Update: Python ${operation || "updates"} the current value of \`${target}\` using \`${expression}\`, then stores the result back in \`${target}\`. This does not print by itself.`;
  }
  if (/^[A-Za-z_]\w*\s*\(/.test(line)) {
    return "Function call: Python evaluates the arguments and runs the named function. A returned value is only displayed if the code prints it or stores it.";
  }
  if (indentation > 0) {
    return "Indented statement: this line belongs to the enclosing function, condition, loop, or error-handling block. Python runs it when that block is reached.";
  }
  return "Statement: Python evaluates this expression or operation in order. It does not display a value unless it explicitly writes output.";
}

export function renderCodeExplanation(code, trace = {}) {
  const eventsByLine = new Map();
  for (const event of trace.events || []) {
    const events = eventsByLine.get(event.line) || [];
    events.push(event.output);
    eventsByLine.set(event.line, events);
  }

  const lines = code.split("\n");
  const details = lines
    .map((sourceLine, index) => {
      const lineNumber = index + 1;
      const lineEvents = eventsByLine.get(lineNumber) || [];
      const output = lineEvents.length
        ? `<span class="explanation-output"><strong>Output from this line${lineEvents.length > 1 ? ` (${lineEvents.length} times)` : ""}:</strong><code>${lineEvents.map(escapeHtml).join("")}</code></span>`
        : /print\s*\(/.test(sourceLine) && trace.error
          ? '<span class="explanation-output">This print line did not produce output before the error stopped the program.</span>'
          : "";

      return `<li><code>${escapeHtml(sourceLine || " ")}</code><span><strong>Line ${lineNumber}:</strong> ${escapeHtml(describeLine(sourceLine))}${output}</span></li>`;
    })
    .join("");

  const programOutput = (trace.events || [])
    .map((event) => event.output)
    .join("");
  const outputSummary = programOutput
    ? `<section class="explanation-summary"><h4>Complete program output</h4><pre>${escapeHtml(programOutput)}</pre></section>`
    : '<section class="explanation-summary"><h4>Complete program output</h4><p>This code produced no printed output.</p></section>';
  const extraOutput = trace.extraOutput
    ? `<section class="explanation-summary"><h4>Additional output</h4><pre>${escapeHtml(trace.extraOutput)}</pre></section>`
    : "";
  const truncatedNote = trace.truncated
    ? '<p class="explanation-truncated">Output tracing stopped after reaching its safety limit.</p>'
    : "";
  const errorSummary = trace.error
    ? `<p class="explanation-error"><strong>Execution stopped with an error:</strong> ${escapeHtml(trace.error)}. Lines after the error were not completed.</p>`
    : "";

  return `${outputSummary}${extraOutput}${truncatedNote}${errorSummary}<h4>What happens, line by line</h4><ol class="code-explanation">${details}</ol>`;
}
