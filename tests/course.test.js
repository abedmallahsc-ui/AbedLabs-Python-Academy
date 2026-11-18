import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildLessonPredictions,
  buildLessonQuizzes,
} from "../assets/js/assessments.js";
import { advancedLessons } from "../assets/js/advanced-lessons.js";
import { lessonGuides } from "../assets/js/lesson-guides.js";
import { courseUnits, lessons } from "../assets/js/lessons.js";

const allLessons = [...lessons, ...advancedLessons];

test("course contains 39 ordered lessons with distinct versioned progress IDs", () => {
  assert.equal(allLessons.length, 39);
  assert.deepEqual(
    allLessons.map((lesson) => lesson.number),
    Array.from({ length: 39 }, (_, index) =>
      String(index + 1).padStart(2, "0"),
    ),
  );
  assert.equal(new Set(allLessons.map((lesson) => lesson.id)).size, 39);
  assert.ok(allLessons.every((lesson) => /^v3-\d{2}$/.test(lesson.id)));

  const groupedLessons = courseUnits.flatMap((unit) =>
    allLessons
      .filter(
        (lesson) =>
          Number(lesson.number) >= unit.firstLesson &&
          Number(lesson.number) <= unit.lastLesson,
      )
      .map((lesson) => lesson.number),
  );
  assert.deepEqual(
    groupedLessons,
    allLessons.map((lesson) => lesson.number),
  );
});

test("every lesson provides explanations, examples, and three coding tasks", () => {
  for (const lesson of allLessons) {
    const guide = lessonGuides[lesson.number];
    assert.ok(lesson.title.trim(), `${lesson.id} needs a title`);
    assert.ok(lesson.intro.trim(), `${lesson.id} needs an introduction`);
    assert.ok(guide?.overview.trim(), `${lesson.id} needs an expanded roadmap`);
    assert.ok(
      guide.objectives.length >= 4,
      `${lesson.id} needs chapter learning objectives`,
    );
    assert.ok(
      guide.mistakes.length >= 3,
      `${lesson.id} needs chapter-specific common mistakes`,
    );
    assert.ok(lesson.example.trim(), `${lesson.id} needs an editor example`);
    assert.ok(lesson.sections.length >= 3, `${lesson.id} needs explanations`);
    assert.ok(
      lesson.sections.filter((section) => section.code?.trim()).length >= 2,
      `${lesson.id} needs at least two worked examples`,
    );
    assert.equal(
      lesson.exercises.length,
      3,
      `${lesson.id} needs three coding tasks`,
    );

    for (const exercise of lesson.exercises) {
      assert.ok(exercise.title.trim(), `${lesson.id} has an untitled exercise`);
      assert.ok(exercise.task.trim(), `${exercise.title} needs instructions`);
      assert.ok(
        exercise.starter.trim(),
        `${exercise.title} needs starter code`,
      );
      assert.ok(exercise.hint.trim(), `${exercise.title} needs a hint`);
      assert.ok(exercise.solution.trim(), `${exercise.title} needs a solution`);
    }

    const quizzes = buildLessonQuizzes(lesson);
    assert.equal(quizzes.length, 10, `${lesson.id} needs ten MCQs`);
    for (const quiz of quizzes) {
      assert.ok(quiz.q.trim(), `${lesson.id} has an empty question`);
      assert.equal(quiz.options.length, 3, `${quiz.q} needs three choices`);
      assert.equal(new Set(quiz.options).size, 3, `${quiz.q} has duplicate choices`);
      assert.ok(
        Number.isInteger(quiz.answer) &&
          quiz.answer >= 0 &&
          quiz.answer < quiz.options.length,
        `${quiz.q} has an invalid correct answer`,
      );
      assert.ok(quiz.why.trim(), `${quiz.q} needs an explanation`);
    }

    const predictions = buildLessonPredictions(lesson);
    assert.equal(predictions.length, 10, `${lesson.id} needs ten output problems`);
    assert.equal(
      new Set(predictions.map((problem) => problem.code)).size,
      10,
      `${lesson.id} needs ten distinct output snippets`,
    );
    for (const problem of predictions) {
      assert.ok(problem.title.trim(), `${lesson.id} has an untitled prediction`);
      assert.ok(problem.code.trim(), `${problem.title} needs code`);
      assert.ok(problem.explanation.trim(), `${problem.title} needs guidance`);
    }
  }
});

test("loops chapter teaches nested loops, loop controls, and boundary behavior", () => {
  const loops = allLessons.find((lesson) => lesson.number === "07");
  assert.ok(loops);
  assert.ok(
    loops.sections.some((section) => /nested loops/i.test(section.heading)),
  );
  assert.ok(
    loops.sections.some((section) => /\bbreak\b.*\bcontinue\b.*\belse\b/i.test(section.body)),
  );
  assert.ok(
    loops.exercises.every((exercise) => /nested loop|nested loops/i.test(exercise.task)),
  );
  assert.ok(
    loops.sections.some((section) => /triangles and pyramids/i.test(section.heading)),
  );
  assert.ok(
    loops.sections.some((section) => /checkerboards and hollow rectangles/i.test(section.heading)),
  );
});

test("slicing chapter includes practical patterns and common edge cases", () => {
  const slicing = advancedLessons.find((lesson) => lesson.number === "25");
  assert.ok(slicing);
  assert.ok(
    slicing.sections.some((section) => /common sequence operations/i.test(section.heading)),
  );
  assert.ok(
    slicing.sections.some((section) => /listing its indexes/i.test(section.heading)),
  );
  assert.ok(
    slicing.sections.some((section) => /boundary mistakes/i.test(section.heading)),
  );
  assert.ok(lessonGuides["25"].mistakes.some((mistake) => /stop index/i.test(mistake)));
});

test("string and list chapters teach slicing before the dedicated slicing chapter", () => {
  const strings = lessons.find((lesson) => lesson.number === "04");
  const lists = lessons.find((lesson) => lesson.number === "08");
  assert.ok(strings.sections.some((section) => /slice text/i.test(section.heading)));
  assert.ok(strings.sections.some((section) => section.code.includes("[::-1]")));
  assert.ok(lists.sections.some((section) => /slice/i.test(section.heading)));
  assert.ok(
    lists.sections.some((section) => /replace, delete/i.test(section.heading)),
  );
});

test("course includes 117 coding tasks, 390 quizzes, and 390 output problems", () => {
  const challengeCount = allLessons.reduce(
    (total, lesson) => total + lesson.exercises.length,
    0,
  );
  const quizCount = allLessons.reduce(
    (total, lesson) => total + buildLessonQuizzes(lesson).length,
    0,
  );
  const predictionCount = allLessons.reduce(
    (total, lesson) => total + buildLessonPredictions(lesson).length,
    0,
  );

  assert.equal(challengeCount, 117);
  assert.equal(quizCount, 390);
  assert.equal(predictionCount, 390);
});
