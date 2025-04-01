import { useStorage } from "@vueuse/core";

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const storedAnswers = useStorage<Record<string, Answer[]>>(
      "guideit-stored-answers",
      {}
    );

    if (Object.keys(storedAnswers.value).length === 0) {
      return navigateTo("/quiz");
    }
  }
  return;
});
