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

function uniqueBy(items, key) {
  const seen = new Set();
  return items.filter((item) => {
    const value = key(item);
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

const questionStems = [
  (topic) => `Which statement describes ${topic}?`,
  (topic) => `What rule should guide your work with ${topic}?`,
  (topic) => `When using ${topic}, which principle is correct?`,
  (topic) => `Which fact about ${topic} is accurate?`,
  (topic) => `What should a Python learner remember about ${topic}?`,
  (topic) => `Which approach is appropriate for ${topic}?`,
  (topic) => `How should you reason about ${topic}?`,
  (topic) => `Which observation best matches ${topic}?`,
  (topic) => `What is true when a program uses ${topic}?`,
  (topic) => `Which description of ${topic} is correct?`,
  (topic) => `What is the right takeaway about ${topic}?`,
  (topic) => `Which statement would help explain ${topic}?`,
  (topic) => `Which detail matters when applying ${topic}?`,
  (topic) => `What claim about ${topic} is supported?`,
  (topic) => `Which principle best applies to ${topic}?`,
];

const excludedWords = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "can",
  "for",
  "from",
  "into",
  "its",
  "more",
  "that",
  "the",
  "their",
  "then",
  "this",
  "through",
  "using",
  "when",
  "with",
  "concept",
  "loop",
  "loops",
  "python",
  "use",
]);

export function buildLessonQuizzes(lesson, guide) {
  const existing = lesson.quizzes || [];
  const questionCounts = new Map();
  for (const quiz of existing) {
    questionCounts.set(quiz.q, (questionCounts.get(quiz.q) || 0) + 1);
  }
  const authored = existing.filter(
    (quiz) => questionCounts.get(quiz.q) === 1,
  );
  const quizzes = uniqueBy(authored, (quiz) => quiz.q)
    .slice(0, 15);
  const concepts = uniqueBy(
    [
      ...(guide?.objectives || []).map((statement) => ({
        topic: lesson.title,
        statement,
      })),
      ...lesson.sections.map((section) => ({
        topic: `${lesson.title} — ${section.heading}`,
        statement: section.body.split(/(?<=[.!?])\s+/)[0],
      })),
      ...(guide?.mistakes || []).map((statement) => ({
        topic: lesson.title,
        statement,
      })),
      ...(lesson.facts || []).map((statement) => ({
        topic: lesson.title,
        statement,
      })),
      ...lesson.sections.flatMap((section) =>
        section.body
          .split(/(?<=[.!?])\s+/)
          .filter((statement) => statement.length > 30)
          .map((statement) => ({
            topic: `${lesson.title} — ${section.heading}`,
            statement,
          })),
      ),
      ...lesson.intro
        .split(/(?<=[.!?])\s+/)
        .filter((statement) => statement.length > 30)
        .map((statement) => ({
          topic: lesson.title,
          statement,
        })),
    ],
    (concept) => concept.statement.trim().toLowerCase(),
  );

  for (const [index, concept] of concepts.entries()) {
    if (quizzes.length >= 15) break;
    const stem = questionStems[index % questionStems.length];
    const q = stem(concept.topic);
    if (quizzes.some((quiz) => quiz.q === q)) continue;
    const answer = quizzes.length % 3;
    quizzes.push({
      q,
      options: sentenceOptions(concept.statement, answer),
      answer,
      why: concept.statement,
    });
  }

  if (quizzes.length !== 15) {
    throw new Error(
      `${lesson.title} needs 15 distinct knowledge-check questions; found ${quizzes.length}.`,
    );
  }
  return quizzes;
}

function relatedSection(lesson, text) {
  const words = (value) =>
    value
      .toLowerCase()
      .match(/[a-z_]{3,}/g)
      ?.filter((word) => !excludedWords.has(word) && !/^\d+$/.test(word))
      .map((word) => word.replace(/s$/, "")) ||
    [];
  const terms = new Set(words(text));
  const sections = lesson.sections.filter((section) => section.code?.trim());
  return sections.reduce((best, section) => {
    const headingScore = words(section.heading).reduce(
      (total, word) => total + Number(terms.has(word)),
      0,
    );
    const bodyScore = words(section.body).reduce(
      (total, word) => total + Number(terms.has(word)),
      0,
    );
    const score = headingScore * 3 + bodyScore;
    return score > best.score ? { section, score } : best;
  }, { section: sections[0], score: -1 }).section;
}

function objectiveHint(objective, section) {
  const starterLines = (section?.code || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const codeLines = starterLines.filter(
    (line) => !line.startsWith("#") && !/^(from\s|import\s)/.test(line),
  );
  const focus = objective.toLowerCase();
  const focusWords = `${objective} ${section?.heading || ""}`
    .toLowerCase()
    .match(/[a-z_]{3,}/g) || [];
  const codeLine = codeLines
    .map((line) => ({
      line,
      score: focusWords.reduce(
        (score, word) =>
          score +
          Number(
            !excludedWords.has(word) && line.toLowerCase().includes(word),
          ),
        0,
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)[0]?.line || codeLines[0];
  const focusLine = codeLine || starterLines[0] || "print(...)";
  const text = focus;
  let action =
    "Change one input value, run the program, and explain how the result demonstrates the objective.";

  if (/separate lines|newline|end=/.test(text)) {
    action =
      "Compare two print() calls with one print() call using end=\" \"; check whether the values appear on separate lines or the same line.";
  } else if (/\b(?:print|output|predict|prediction)\b|read.*top to bottom|statement order/.test(text)) {
    action =
      "Predict the output first, run the code, and compare the printed lines in order.";
  } else if (/slice|slicing|start:stop|negative bound|step|sequence bound/.test(text)) {
    action =
      "Change the start, stop, or step one at a time; write down the indexes included and compare them with the printed slice.";
  } else if (/break|continue|loop else/.test(text)) {
    action =
      "Trace the code with and without a match: check which iteration break stops, which one continue skips, and whether loop else runs.";
  } else if (/nested loops?/.test(text)) {
    action =
      "Trace one outer iteration at a time and list every inner-loop value before moving to the next outer iteration.";
  } else if (/\bwhile\b/.test(text)) {
    action =
      "Check the while condition before each pass and update the value it depends on inside the loop so the loop can stop.";
  } else if (/\b(?:while loop|loops?|repeat|repetition|iterations?|range)\b/.test(text)) {
    action =
      "Trace the first and last iteration, then change the loop boundary and compare how many times it runs.";
  } else if (/function|parameter|argument|return/.test(text)) {
    action =
      "Call the function with two different arguments and compare the returned values.";
  } else if (/copy|rotate|split|replace|list|sequence|collection|set|tuple|dictionary|dict/.test(text)) {
    action =
      "Try a one-item and a multi-item collection, then inspect how the operation changes or selects its values.";
  } else if (/timeout/.test(text)) {
    action =
      "Set a small timeout in the request example and confirm it is passed to the call before handling the response.";
  } else if (/http|request|response|status code|header|url|json/.test(text)) {
    action =
      "Change the sample status or response body, then check that your code handles a successful response and an error differently.";
  } else if (/slice|string|text|character/.test(text)) {
    action =
      "Try a different string and boundary indexes, then compare the selected text.";
  } else if (/error|exception|invalid|pitfall|avoid|validate/.test(text)) {
    action =
      "Try both a valid value and the invalid or boundary case, then check how each result is handled.";
  } else if (/csv|database|sqlite|json|file|read_text|write_text|path/.test(text)) {
    action =
      "Test the example with a small or empty data value, then print the result you need to verify.";
  } else if (/date|time/.test(text)) {
    action =
      "Change the sample date or interval, then print the result and check the boundary.";
  } else if (/variable|assign|name|value|update/.test(text)) {
    action =
      "Change the assigned value, run the code, and print the variable to confirm the update.";
  } else if (/number|calculat|operator|arithmetic|float|integer/.test(text)) {
    action =
      "Change one number at a time, run the calculation, and compare it with a hand-worked result.";
  }

  return `Objective: ${objective} Look at \`${focusLine}\` in the starter. ${action}`;
}

export function buildLessonExercises(lesson, guide) {
  const exercises = lesson.exercises.map((exercise) => ({
    ...exercise,
    objective: exercise.title,
    hint: `Objective: ${exercise.title}. ${exercise.hint}`,
  }));
  const candidates = [
    ...(guide?.objectives || []).map((objective) => ({
      objective,
      reference: objective,
      task: `Change one value in the worked example, run it, and explain how the result demonstrates this objective: ${objective}`,
    })),
    ...(guide?.mistakes || []).map((mistake) => ({
      objective: `Avoid this mistake: ${mistake}`,
      reference: mistake,
      task: `Create a small example that exposes this mistake, correct it, then run both versions to check the difference: ${mistake}`,
    })),
    ...lesson.sections.map((section) => {
      if (
        lesson.number === "01" &&
        section.heading === "Use print() to inspect a result"
      ) {
        return {
          objective: "Use print()'s default newline to separate output lines.",
          reference: section.heading,
          task: "Use two print() calls to display two values on separate lines. Then use end=\" \" to display two values on one line and compare the output.",
        };
      }
      return {
        objective: `Apply the concept: ${section.heading}`,
        reference: section.heading,
        task: `Write a new example about “${section.heading}” using different values from the lesson, then run it and explain the result.`,
      };
    }),
    ...lesson.sections.flatMap((section) =>
      section.body
        .split(/(?<=[.!?])\s+/)
        .filter((statement) => statement.length > 35)
        .slice(1)
        .map((statement) => ({
          objective: `Demonstrate this rule: ${statement}`,
          reference: `${section.heading} ${statement}`,
          task: `Write a short program that demonstrates this rule: ${statement} Use your own values, then run it to check the result.`,
        })),
    ),
    ...(lesson.facts || []).map((fact) => ({
      objective: `Demonstrate this fact: ${fact}`,
      reference: fact,
      task: `Write a short program that demonstrates this fact: ${fact} Use your own values, then run it to check the result.`,
    })),
  ];
  const uniqueCandidates = uniqueBy(
    candidates,
    (candidate) => candidate.objective.trim().toLowerCase(),
  );

  for (const candidate of uniqueCandidates) {
    if (exercises.length >= 15) break;
    const section = relatedSection(lesson, candidate.reference);
    const example = section?.code || lesson.example;
    exercises.push({
      title: `Practice ${lesson.number}.${String(exercises.length + 1).padStart(2, "0")}`,
      objective: candidate.objective,
      task: candidate.task,
      starter: example,
      hint: objectiveHint(candidate.objective, section),
      solution: example,
      referenceExample: true,
    });
  }

  if (exercises.length !== 15) {
    throw new Error(
      `${lesson.title} needs 15 hands-on practice challenges; found ${exercises.length}.`,
    );
  }
  return exercises;
}

export function buildLessonPredictions(lesson) {
  if (lesson.predictProblems?.length >= 10) return lesson.predictProblems;

  const examples = [
    lesson.example,
    ...lesson.sections.map((section) => section.code),
    ...lesson.exercises.flatMap((exercise) => [
      exercise.solution,
      exercise.starter,
    ]),
  ].filter((code, index, all) => code?.trim() && all.indexOf(code) === index);

  return examples.slice(0, 10).map((code, index) => ({
    title: `Predict the output ${index + 1}`,
    code,
    output: "",
    explanation:
      "Trace the statements from top to bottom. Load this program into the editor and run it to check your exact prediction.",
  }));
}
