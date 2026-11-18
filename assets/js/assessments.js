function sentenceOptions(statement, answer) {
  const accurateStatement = statement[0].toLowerCase() + statement.slice(1);
  const options = [
    statement,
    `It is not true that ${accurateStatement}`,
    `The opposite is correct: ${accurateStatement}`,
  ];
  const correct = options.shift();
  options.splice(answer, 0, correct);
  return options;
}

export function buildLessonQuizzes(lesson) {
  if (lesson.quizzes.length >= 10) return lesson.quizzes;

  const statements = [
    ...lesson.sections.flatMap((section) =>
      section.body
        .split(/(?<=[.!?])\s+/)
        .filter((statement) => statement.length > 30)
        .map((statement) => ({ heading: section.heading, statement })),
    ),
    ...lesson.intro
      .split(/(?<=[.!?])\s+/)
      .filter((statement) => statement.length > 30)
      .map((statement) => ({ heading: lesson.title, statement })),
  ].slice(0, 7);

  const generated = statements.map(({ heading, statement }, index) => {
    const answer = index % 3;
    return {
      q: `Which statement best explains "${heading}"?`,
      options: sentenceOptions(statement, answer),
      answer,
      why: statement,
    };
  });

  return [...lesson.quizzes, ...generated].slice(0, 10);
}

export function buildLessonPredictions(lesson) {
  if (lesson.predictProblems?.length >= 10) return lesson.predictProblems;

  const examples = [
    lesson.example,
    ...lesson.sections.map((section) => section.code),
    ...lesson.exercises.map((exercise) => exercise.solution),
  ].filter((code, index, all) => code?.trim() && all.indexOf(code) === index);
  const problems = examples.slice(0, 10).map((code, index) => ({
    title: `Predict the output ${index + 1}`,
    code,
    output: "",
    explanation:
      "Trace the statements from top to bottom. Load this program into the editor and run it to check your exact prediction.",
  }));
  const seen = new Set(problems.map((problem) => problem.code));

  for (let index = 0; problems.length < 10; index += 1) {
    const first = examples[index % examples.length];
    const second = examples[(index + 1) % examples.length];
    const code = `${first}\n\n${second}`;
    if (seen.has(code)) continue;
    seen.add(code);
    problems.push({
      title: `Combined output challenge ${problems.length + 1}`,
      code,
      output: "",
      explanation:
        "Trace both code examples in order, accounting for any names that are reassigned. Load the program into the editor and run it to check your prediction.",
    });
  }

  return problems;
}
