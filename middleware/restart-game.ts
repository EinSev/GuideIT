import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware((to, from) => {
  const storedAnswers = useStorage<Record<string, Answer[]>>(
    "guideit-stored-answers",
    {}
  );
  const currentStepId = useStorage("guideit-current-step-id", 1);
  const currentQuestionId = useStorage("guideit-current-question-id", 1);

  if (from.path === "/quiz" && to.path === "/quiz/play") {
    storedAnswers.value = {};
    currentStepId.value = 1;
    currentQuestionId.value = 1;
  }
});
