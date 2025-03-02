import file from "../../../data/questions.json";

export default defineEventHandler((event) => {
  const stepId = Number(event.context.params?.stepid);
  const questionId = Number(event.context.params?.questionid);

  const questionsData = file;

  const steps = questionsData.steps.map((s: Step) => ({ id: s.id, title: s.title }));
  const totalSteps = questionsData.steps.length;

  const step = questionsData.steps.find((s: Step) => s.id === stepId);
  if (!step) {
    console.error(`Schritt ${stepId} nicht gefunden`);
    throw createError({
      statusCode: 404,
      message: `Schritt ${stepId} nicht gefunden`,
    });
  }

  const question = step.questions.find((q: Question) => q.id === questionId);
  if (!question) {
    console.error(`Frage ${questionId} nicht gefunden in Schritt ${stepId}`);
    throw createError({
      statusCode: 404,
      message: `Frage ${questionId} nicht gefunden`,
    });
  }

return {
    steps: {
        all: steps,
        current: {
            id: stepId,
            title: step.title,
            totalQuestions: step.questions.length,
        },
        total: totalSteps,
    },
    question,
};
});
