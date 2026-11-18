import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildLessonExercises,
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

test("every lesson provides explanations, examples, and 15 practice challenges", () => {
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

    const quizzes = buildLessonQuizzes(lesson, guide);
    assert.equal(quizzes.length, 15, `${lesson.id} needs 15 MCQs`);
    assert.equal(
      new Set(quizzes.map((quiz) => quiz.q)).size,
      15,
      `${lesson.id} needs 15 distinct MCQ questions`,
    );
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
      assert.ok(
        !quiz.q.toLowerCase().includes(quiz.why.toLowerCase()),
        `${quiz.q} should not reveal its answer in the question`,
      );
    }

    const practice = buildLessonExercises(lesson, guide);
    assert.equal(practice.length, 15, `${lesson.id} needs 15 practice challenges`);
    assert.equal(
      new Set(practice.map((exercise) => exercise.task)).size,
      15,
      `${lesson.id} needs distinct practice prompts`,
    );
    assert.equal(
      new Set(practice.map((exercise) => exercise.objective)).size,
      15,
      `${lesson.id} needs a unique objective for every challenge`,
    );
    for (const exercise of practice) {
      assert.ok(exercise.title.trim(), `${lesson.id} has an untitled challenge`);
      assert.ok(exercise.task.trim(), `${exercise.title} needs instructions`);
      assert.ok(exercise.starter.trim(), `${exercise.title} needs starter code`);
      assert.ok(exercise.hint.trim(), `${exercise.title} needs a hint`);
      assert.ok(
        exercise.hint.includes(exercise.objective),
        `${exercise.title} hint should address its objective`,
      );
      assert.ok(exercise.solution.trim(), `${exercise.title} needs a worked example`);
      if (exercise.referenceExample) {
        const hintedLine = exercise.hint.match(
          /Look at `([^`]+)` in the starter/,
        );
        assert.ok(hintedLine, `${exercise.title} needs a code-specific hint`);
        assert.ok(
          exercise.starter.includes(hintedLine[1]),
          `${exercise.title} hint should refer to a line in its starter`,
        );
        assert.match(
          exercise.hint,
          /then|and|so you can|compare/i,
          `${exercise.title} hint should give an actionable next step`,
        );
      }
    }

    const predictions = buildLessonPredictions(lesson);
    assert.ok(
      predictions.length >= 9 && predictions.length <= 10,
      `${lesson.id} needs 9 or 10 distinct output problems`,
    );
    assert.equal(
      new Set(predictions.map((problem) => problem.code)).size,
      predictions.length,
      `${lesson.id} needs distinct output snippets`,
    );
    if (!(lesson.predictProblems?.length >= 10)) {
      const sourceExamples = new Set(
        [
          lesson.example,
          ...lesson.sections.map((section) => section.code),
          ...lesson.exercises.flatMap((exercise) => [
            exercise.solution,
            exercise.starter,
          ]),
        ].filter((code) => code?.trim()),
      );
      assert.ok(
        predictions.every((problem) => sourceExamples.has(problem.code)),
        `${lesson.id} output problems should use standalone lesson or exercise snippets`,
      );
    }
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

test("course includes 585 coding tasks, 585 MCQs, and distinct output problems", () => {
  const challengeCount = allLessons.reduce(
    (total, lesson) =>
      total + buildLessonExercises(lesson, lessonGuides[lesson.number]).length,
    0,
  );
  const quizCount = allLessons.reduce(
    (total, lesson) =>
      total + buildLessonQuizzes(lesson, lessonGuides[lesson.number]).length,
    0,
  );
  const predictionCount = allLessons.reduce(
    (total, lesson) => total + buildLessonPredictions(lesson).length,
    0,
  );

  assert.equal(challengeCount, 585);
  assert.equal(quizCount, 585);
  assert.equal(predictionCount, 386);
});

test("course-wide MCQ questions and practice prompts are unique", () => {
  const questions = allLessons.flatMap((lesson) =>
    buildLessonQuizzes(lesson, lessonGuides[lesson.number]).map((quiz) =>
      quiz.q.trim().toLowerCase(),
    ),
  );
  const practiceTasks = allLessons.flatMap((lesson) =>
    buildLessonExercises(lesson, lessonGuides[lesson.number]).map((exercise) =>
      exercise.task.trim().toLowerCase(),
    ),
  );

  assert.equal(new Set(questions).size, questions.length);
  assert.equal(new Set(practiceTasks).size, practiceTasks.length);
});

test("challenge hints give objective-specific next steps", () => {
  const firstLesson = lessons.find((lesson) => lesson.number === "01");
  const firstPractice = buildLessonExercises(
    firstLesson,
    lessonGuides[firstLesson.number],
  );
  assert.equal(firstPractice.length, 15);
  assert.notEqual(firstPractice[5].objective, firstPractice[11].objective);
  assert.match(firstPractice[11].objective, /separate .*lines/i);
  assert.match(firstPractice[11].task, /end=" "/);
  assert.match(firstPractice[11].hint, /same line|separate lines/i);

  const slicing = allLessons.find((lesson) => lesson.number === "25");
  const slicingPractice = buildLessonExercises(
    slicing,
    lessonGuides[slicing.number],
  );
  assert.match(
    slicingPractice.find((exercise) => /start:stop:step/.test(exercise.objective))
      .hint,
    /start, stop, or step/i,
  );

  const apiLesson = allLessons.find((lesson) => lesson.number === "22");
  const apiPractice = buildLessonExercises(
    apiLesson,
    lessonGuides[apiLesson.number],
  );
  assert.match(
    apiPractice.find(
      (exercise) => /timeout/i.test(exercise.objective),
    ).hint,
    /timeout/i,
  );
  assert.match(
    apiPractice.find((exercise) => /timeout/i.test(exercise.objective)).hint,
    /Typical workflow with an HTTP client/,
  );

  const loops = allLessons.find((lesson) => lesson.number === "07");
  assert.match(
    buildLessonExercises(loops, lessonGuides[loops.number]).find((exercise) =>
      /loop/i.test(exercise.objective),
    ).hint,
    /iteration|loop boundary/i,
  );
  assert.match(
    buildLessonExercises(loops, lessonGuides[loops.number]).find((exercise) =>
      /break, continue/i.test(exercise.objective),
    ).hint,
    /break.*continue.*loop else/i,
  );
});
