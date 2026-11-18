import { courseUnits, lessons } from "./lessons.js";
import { advancedLessons } from "./advanced-lessons.js";
import {
  buildLessonPredictions,
  buildLessonQuizzes,
} from "./assessments.js";
import { lessonGuides } from "./lesson-guides.js";
import { api } from "./api.js";
const allLessons = [
  ...lessons.map((lesson) => ({
    ...lesson,
    quizzes: buildLessonQuizzes(lesson),
    predictProblems: buildLessonPredictions(lesson),
  })),
  ...advancedLessons,
];
const $ = (id) => document.getElementById(id);
const DEVICE_TOKEN = "abed_academy_device_token";
let token = localStorage.getItem(DEVICE_TOKEN);
let current = 0,
  completed = new Set();
$("year").textContent = new Date().getFullYear();
function show(id) {
  $(id).classList.remove("hidden");
}
function hide(id) {
  $(id).classList.add("hidden");
}
function status(text) {
  $("connection-status").textContent = text;
}
function showGate(message = "") {
  show("activation-screen");
  hide("academy");
  $("activation-error").textContent = message;
  status("Activation required");
}
function showAcademy() {
  hide("activation-screen");
  show("academy");
  show("logout-btn");
  status("Device activated");
}
function currentCourseProgress(values) {
  const lessonIds = new Set(allLessons.map((lesson) => lesson.id));
  const savedIds = Array.isArray(values) ? values : [];
  return new Set(savedIds.filter((id) => lessonIds.has(id)));
}
function renderList() {
  $("lesson-list").innerHTML = courseUnits
    .map(
      (unit) => `
        <section class="lesson-group">
          <h3 class="lesson-group-title">${escapeHtml(unit.title)}</h3>
          ${allLessons
            .map((lesson, index) => ({ lesson, index }))
            .filter(
              ({ lesson }) =>
                Number(lesson.number) >= unit.firstLesson &&
                Number(lesson.number) <= unit.lastLesson,
            )
            .map(
              ({ lesson, index }) =>
                `<button class="lesson-item ${index === current ? "active" : ""}" data-index="${index}"><span class="num">${completed.has(lesson.id) ? "✓" : lesson.number}</span><span>${escapeHtml(lesson.title)}</span></button>`,
            )
            .join("")}
        </section>`,
    )
    .join("");
  document
    .querySelectorAll(".lesson-item")
    .forEach((b) =>
      b.addEventListener("click", () => loadLesson(Number(b.dataset.index))),
    );
}
function updateProgress() {
  const n = Math.round((completed.size / allLessons.length) * 100);
  $("progress-text").textContent = n + "%";
  $("progress-bar").style.width = n + "%";
  const challengeCount = allLessons.reduce(
    (total, lesson) => total + lesson.exercises.length,
    0,
  );
  const quizCount = allLessons.reduce(
    (total, lesson) => total + lesson.quizzes.length,
    0,
  );
  $("course-count").textContent =
    `${allLessons.length} lessons · ${challengeCount} challenges · ${quizCount} quizzes`;
  renderList();
}
function renderSections(sections) {
  return sections
    .map(
      (section, index) => `
        <section class="lesson-section">
          <h2>${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.body)}</p>
          ${
            section.code
              ? `<div class="example-code">
                  <pre><code>${escapeHtml(section.code)}</code></pre>
                  <button class="ghost run-example" type="button" data-example="${index}">Try this example</button>
                  <button class="ghost explain-example" type="button" data-example="${index}">Explain this code</button>
                  <ol class="code-explanation hidden" data-explanation="${index}"></ol>
                </div>`
              : ""
          }
          ${
            section.callout
              ? `<div class="callout">${escapeHtml(section.callout)}</div>`
              : ""
          }
        </section>`,
    )
    .join("");
}
function renderLessonGuide(lesson) {
  const guide = lessonGuides[lesson.number];
  if (!guide) {
    throw new Error(`Missing chapter guide for lesson ${lesson.number}.`);
  }
  const topics = lesson.sections
    .map(
      (section) => `
        <li>
          <strong>${escapeHtml(section.heading)}</strong>
          <span>${escapeHtml(section.body)}</span>
        </li>`,
    )
    .join("");
  return `
    <section class="chapter-guide" aria-labelledby="chapter-guide-title">
      <p class="eyebrow">CHAPTER ROADMAP</p>
      <h2 id="chapter-guide-title">What you are working on</h2>
      <p>${escapeHtml(guide.overview)}</p>
      <h3>By the end, you should be able to</h3>
      <ul class="guide-objectives">
        ${guide.objectives.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <details class="guide-topic-details">
        <summary>Review every topic in this chapter</summary>
        <ol>${topics}</ol>
      </details>
      <h3>Common mistakes to avoid</h3>
      <ul class="guide-mistakes">
        ${guide.mistakes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>`;
}
function renderExercises(exercises) {
  $("practice-list").innerHTML = exercises
    .map(
      (exercise, index) => `
        <article class="exercise-card">
          <div class="exercise-heading">
            <span class="eyebrow">CHALLENGE ${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(exercise.title)}</h3>
          </div>
          <p>${escapeHtml(exercise.task)}</p>
          <details>
            <summary>Show a hint</summary>
            <p>${escapeHtml(exercise.hint)}</p>
          </details>
          <details>
            <summary>View one possible solution</summary>
            <pre><code>${escapeHtml(exercise.solution)}</code></pre>
            <button class="ghost explain-solution" type="button" data-exercise="${index}">Explain this code</button>
            <ol class="code-explanation hidden" data-solution-explanation="${index}"></ol>
          </details>
          <button class="ghost try-exercise" type="button" data-exercise="${index}">Load starter in editor</button>
        </article>`,
    )
    .join("");

  document.querySelectorAll(".explain-solution").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.exercise);
      const explanation = document.querySelector(
        `[data-solution-explanation="${index}"]`,
      );
      explanation.innerHTML = explainCode(exercises[index].solution);
      explanation.classList.toggle("hidden");
      button.textContent = explanation.classList.contains("hidden")
        ? "Explain this code"
        : "Hide code explanation";
    });
  });

  document.querySelectorAll(".try-exercise").forEach((button) => {
    button.addEventListener("click", () => {
      const exercise = exercises[Number(button.dataset.exercise)];
      stopPythonRun();
      $("code-editor").value = exercise.starter;
      $("program-input").value = "";
      $("code-output").textContent =
        `Challenge loaded: ${exercise.title}. Add your solution, then run it.`;
      $("code-editor").focus();
    });
  });
}
function renderQuizzes(quizzes) {
  $("quiz-section").innerHTML = `
    <h2>Knowledge check</h2>
    <p class="muted">${quizzes.length} questions · Choose an answer and check your reasoning.</p>
    ${quizzes
      .map(
        (quiz, index) => `
          <article class="quiz-question" data-question="${index}">
            <h3>${index + 1}. ${escapeHtml(quiz.q)}</h3>
            ${quiz.options
              .map(
                (option, optionIndex) => `
                  <label class="quiz-option">
                    <input type="radio" name="quiz-${index}" value="${optionIndex}">
                    <span>${escapeHtml(option)}</span>
                  </label>`,
              )
              .join("")}
            <button class="ghost check-answer" type="button" data-question="${index}">Check answer</button>
            <p class="quiz-feedback" aria-live="polite"></p>
          </article>`,
      )
      .join("")}`;

  document.querySelectorAll(".check-answer").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.question);
      const quiz = quizzes[index];
      const selected = document.querySelector(
        `input[name="quiz-${index}"]:checked`,
      );
      const feedback = button
        .closest(".quiz-question")
        .querySelector(".quiz-feedback");
      if (!selected) {
        feedback.textContent = "Choose an answer first.";
        feedback.className = "quiz-feedback incorrect";
        return;
      }

      const correct = Number(selected.value) === quiz.answer;
      feedback.textContent = `${correct ? "Correct!" : "Not quite."} ${quiz.why}`;
      feedback.className = `quiz-feedback ${correct ? "correct" : "incorrect"}`;
    });
  });
}
function explainLine(line) {
  const text = line.trim();
  if (!text) return "Blank line: separates ideas for readability.";
  if (text.startsWith("#"))
    return "Comment: Python ignores this note when it runs the program.";
  if (/^(from .+ import |import )/.test(text))
    return "Import: makes a module or selected names available to this file.";
  if (/^@/.test(text))
    return "Decorator: wraps or modifies the function or class defined immediately below.";
  if (/^class /.test(text))
    return "Class definition: introduces a blueprint for creating objects.";
  if (/^def /.test(text))
    return "Function definition: names reusable behavior and declares its parameters.";
  if (/^(if |elif |else:|try:|except\b|finally:|with |for |while )/.test(text))
    return "Control-flow statement: determines which indented block runs and when.";
  if (/^return\b/.test(text))
    return "Return: sends a value back to the caller and ends this function call.";
  if (/^yield\b/.test(text))
    return "Yield: produces a value and pauses this generator until the next request.";
  if (/^raise\b/.test(text))
    return "Raise: signals an exception so this operation cannot continue normally.";
  if (/^print\(/.test(text))
    return "Output: evaluates the arguments and displays their values.";
  if (/^assert\b/.test(text))
    return "Assertion: checks an expectation and raises AssertionError if it is false.";
  if (/^[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*\s*(?:\+=|-=|\*=|\/=|=)/.test(text))
    return "Assignment: evaluates the expression on the right and stores the result under the name on the left.";
  if (/^[A-Za-z_]\w*\(.*\)$/.test(text))
    return "Function or method call: runs the named operation with the values inside its parentheses.";
  return "Python statement: inspect its names, operators, and punctuation to understand this step.";
}
function explainCode(code) {
  return code
    .split("\n")
    .map(
      (line) =>
        `<li><code>${escapeHtml(line || " ")}</code><span>${escapeHtml(explainLine(line))}</span></li>`,
    )
    .join("");
}
function renderPredictions(problems) {
  $("prediction-list").innerHTML = problems
    .map(
      (problem, index) => `
        <article class="exercise-card prediction-card">
          <span class="eyebrow">OUTPUT PROBLEM ${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(problem.title)}</h3>
          <p>Predict the exact output before trying the code in the editor.</p>
          <pre><code>${escapeHtml(problem.code)}</code></pre>
          <button class="ghost explain-prediction" type="button" data-prediction="${index}">Explain this code</button>
          <ol class="code-explanation hidden" data-prediction-explanation="${index}">${explainCode(problem.code)}</ol>
          <details>
            <summary>${problem.output ? "Reveal the expected output" : "How to check your prediction"}</summary>
            <pre>${escapeHtml(problem.output || "Load this snippet in the practice editor, provide input if requested, and run it to see the exact output.")}</pre>
            <p>${escapeHtml(problem.explanation)}</p>
          </details>
          <button class="ghost load-prediction" type="button" data-prediction="${index}">Load in editor</button>
          <button class="ghost run-prediction" type="button" data-prediction="${index}">Run to check output</button>
        </article>`,
    )
    .join("");

  document.querySelectorAll(".explain-prediction").forEach((button) => {
    button.addEventListener("click", () => {
      const explanation = document.querySelector(
        `[data-prediction-explanation="${button.dataset.prediction}"]`,
      );
      explanation.classList.toggle("hidden");
      button.textContent = explanation.classList.contains("hidden")
        ? "Explain this code"
        : "Hide code explanation";
    });
  });
  document.querySelectorAll(".load-prediction").forEach((button) => {
    button.addEventListener("click", () => {
      stopPythonRun();
      $("code-editor").value = problems[Number(button.dataset.prediction)].code;
      $("program-input").value = "";
      $("code-output").textContent =
        "Example loaded. Write down your predicted output, then run the code to check it.";
      $("code-editor").focus();
    });
  });
  document.querySelectorAll(".run-prediction").forEach((button) => {
    button.addEventListener("click", () => {
      stopPythonRun();
      $("code-editor").value = problems[Number(button.dataset.prediction)].code;
      $("program-input").value = "";
      $("code-output").textContent =
        "Running prediction code so you can check your answer…";
      $("run-code").click();
    });
  });
}
function loadLesson(index) {
  stopPythonRun();
  current = Math.max(0, Math.min(index, allLessons.length - 1));
  const l = allLessons[current];
  $("lesson-number").textContent = "LESSON " + l.number;
  $("lesson-title").textContent = l.title;
  $("lesson-intro").textContent = l.intro;
  $("lesson-guide").innerHTML = renderLessonGuide(l);
  $("lesson-complete").textContent = completed.has(l.id)
    ? "Completed"
    : "Not completed";
  $("lesson-complete").classList.toggle("done", completed.has(l.id));
  $("lesson-content").innerHTML = renderSections(l.sections);
  $("lesson-content")
    .querySelectorAll(".run-example")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const section = l.sections[Number(button.dataset.example)];
        stopPythonRun();
        $("code-editor").value = section.code;
        $("program-input").value = "";
        $("code-output").textContent =
          `Example loaded: ${section.heading}. Select Run code to try it.`;
        $("code-editor").focus();
      });
    });
  $("lesson-content")
    .querySelectorAll(".explain-example")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const sectionIndex = Number(button.dataset.example);
        const explanation = $("lesson-content").querySelector(
          `[data-explanation="${sectionIndex}"]`,
        );
        explanation.innerHTML = explainCode(l.sections[sectionIndex].code);
        explanation.classList.toggle("hidden");
        button.textContent = explanation.classList.contains("hidden")
          ? "Explain this code"
          : "Hide code explanation";
      });
    });
  $("code-editor").value = l.example;
  $("program-input").value = "";
  $("code-output").textContent = "Your output will appear here.";
  renderExercises(l.exercises);
  renderQuizzes(l.quizzes);
  renderPredictions(l.predictProblems);
  $("previous-lesson").disabled = current === 0;
  $("complete-lesson").textContent =
    current === allLessons.length - 1
      ? "Mark complete"
      : "Mark complete & continue →";
  renderList();
}
function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
let pythonWorker;
let pythonTimeout;
function stopPythonRun() {
  if (pythonTimeout) clearTimeout(pythonTimeout);
  pythonTimeout = null;
  if (pythonWorker) pythonWorker.terminate();
  pythonWorker = null;
  $("run-code").disabled = false;
}
function showPythonResult(output, error = "") {
  const limitNotice =
    output.length >= 20_000 ? "\nOutput truncated at 20,000 characters." : "";
  $("code-output").textContent = [output.trimEnd(), error, limitNotice]
    .filter(Boolean)
    .join("\n");
  if (!$("code-output").textContent) {
    $("code-output").textContent = "Program finished with no output.";
  }
}
async function saveProgress() {
  try {
    await api.progress(token, [...completed]);
    updateProgress();
  } catch (e) {
    status("Progress sync failed");
    alert(e.message);
  }
}
async function enter(data) {
  token = data.deviceToken;
  localStorage.setItem(DEVICE_TOKEN, token);
  completed = currentCourseProgress(data.completed || []);
  showAcademy();
  updateProgress();
  loadLesson(0);
}
$("activation-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = $("license-code").value.trim();
  const button = e.submitter;
  button.disabled = true;
  try {
    const data = await api.activate(code);
    await enter(data);
  } catch (err) {
    $("activation-error").textContent = err.message;
  } finally {
    button.disabled = false;
  }
});
$("run-code").addEventListener("click", () => {
  const code = $("code-editor").value;
  if (code.length > 50_000) {
    $("code-output").textContent =
      "Code is too long to run. The maximum size is 50,000 characters.";
    return;
  }

  stopPythonRun();
  $("run-code").disabled = true;
  $("code-output").textContent = "Starting Python…";
  try {
    pythonWorker = new Worker("/assets/js/python-worker.js");
    pythonTimeout = setTimeout(() => {
      stopPythonRun();
      $("code-output").textContent =
        "Python could not start within 90 seconds. Check your connection and try again.";
    }, 90_000);
    pythonWorker.addEventListener("message", (event) => {
      if (event.data.status === "ready") {
        clearTimeout(pythonTimeout);
        $("code-output").textContent = "Running Python…";
        pythonTimeout = setTimeout(() => {
          stopPythonRun();
          $("code-output").textContent =
            "Execution stopped after 30 seconds. Check your code for an endless loop.";
        }, 30_000);
        return;
      }
      stopPythonRun();
      showPythonResult(event.data.output, event.data.error);
    });
    pythonWorker.addEventListener("error", (event) => {
      stopPythonRun();
      $("code-output").textContent =
        `Python runner failed to start: ${event.message}`;
    });
    pythonWorker.postMessage({
      code,
      input: $("program-input").value,
    });
  } catch (error) {
    stopPythonRun();
    $("code-output").textContent =
      `Python runner could not start: ${error.message}`;
  }
});
$("reset-code").addEventListener("click", () => {
  stopPythonRun();
  $("code-editor").value = allLessons[current].example;
  $("program-input").value = "";
  $("code-output").textContent = "Your output will appear here.";
});
$("complete-lesson").addEventListener("click", async () => {
  completed.add(allLessons[current].id);
  await saveProgress();
  if (current < allLessons.length - 1) loadLesson(current + 1);
  else loadLesson(current);
});
$("previous-lesson").addEventListener("click", () => loadLesson(current - 1));
$("logout-btn").addEventListener("click", () => {
  localStorage.removeItem(DEVICE_TOKEN);
  token = null;
  showGate();
});
(async () => {
  if (!token) {
    showGate();
    return;
  }
  try {
    const data = await api.verify(token);
    completed = currentCourseProgress(data.completed || []);
    showAcademy();
    updateProgress();
    loadLesson(0);
  } catch (e) {
    localStorage.removeItem(DEVICE_TOKEN);
    token = null;
    showGate(
      "This device is not authorized. If you believe this is an error, contact ABED LABS.",
    );
  }
})();
