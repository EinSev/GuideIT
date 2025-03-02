<script lang="ts" setup>
import { useStorage } from '@vueuse/core';

definePageMeta({
  middleware: 'is-quiz-played',
})

const storedAnswers = useStorage<Record<string, Answer[]>>("guideit-stored-answers", {});
const currentStepId = useStorage("guideit-current-step-id", 1);
const currentQuestionId = useStorage("guideit-current-question-id", 1);

const result = evaluateResults();

function evaluateResults() {
  const scores: Record<string, number> = {};

  for (let key in storedAnswers.value) {
    const answers = storedAnswers.value[key];
    const length = answers.length;
    answers.forEach((answer: Answer, index: number) => {
      const points = length - index;
      const categories = answer.value.split('-');

      const pointsPerCategory = points / categories.length;

      categories.forEach((category) => {
        scores[category] = (scores[category] || 0) + pointsPerCategory;
      });
    });
    
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([category, score]) => ({ category, score }));
}

function reset() {
  storedAnswers.value = {};
  currentQuestionId.value = 1;
  currentStepId.value = 1;
  navigateTo("/quiz");
}

</script>

<template>
  <div class="flex flex-col justify-center items-center mt-20">
    Ergebnis
    <ul>
      <li v-for="item in result" :key="item.category">
        {{ item.category }}: {{ item.score }}
      </li>
    </ul>
    <button @click="reset">Reset</button>
  </div>
</template>
