<script setup lang="ts">

const props = defineProps<{
  question: Question;
  score: number;
}>();

const emit = defineEmits(["next", "back"]);

const score = ref(50);

watch(() => props.score, (value) => {
  score.value = value;
});

const headingClass = computed(() => {
  const length = props.question.question.length;
  if (length < 20) return "text-3xl lg:text-6xl";
  if (length < 50) return "text-2xl lg:text-5xl";
  return "text-xl lg:text-4xl";
});

function isActive(id: number) {
  switch (id) {
    case 1:
      return score.value >= 0 && score.value < 16.5;
    case 2:
      return score.value >= 16.5 && score.value < 49.5;
    case 3:
      return score.value >= 49.5 && score.value < 82.5 && score.value !== 50;
    case 4:
      return score.value >= 82.5 && score.value <= 100;
    default:
      return false;
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-10 lg:mt-20">
    <div class="h-20">
      <h1 class="text-center font-semibold" :class="headingClass">{{ question.question }}</h1>
    </div>
    <div class="w-full flex flex-col mt-20 lg:mt-20">
      <div class="flex justify-between text-text-small lg:text-text">
        <span v-for="answer in question.answers"
          :class="isActive(answer.id) ? 'text-black-default font-semibold' : 'text-black-400 font-normal'">{{
            answer.answer }}</span>
      </div>
      <Slider v-model="score" class="w-full py-1 rounded-md" />
    </div>
    <div class="flex justify-between w-full lg:w-1/2 mt-52 lg:mt-48">
      <button @click="$emit('back', score, true)"
        class="bg-guideit-50 hover:bg-guideit-200 text-guideit-800 border-2 border-guideit-400 rounded-lg pl-1 pr-2 py-1 lg:py-1.5 flex gap-x-2 items-center select-none">
        <Icon name="material-symbols:arrow-back" size="20" />
        <span>Zurück</span>
      </button>
      <Message v-if="score === 50">Du musst den Regler bewegen!</Message>
      <button @click="$emit('next', score, true)" :disabled="score === 50"
        class="text-guideit-100 border-2 border-guideit-100 bg-guideit-800 hover:bg-guideit-950 rounded-lg pr-1 pl-2 py-1 lg:py-1.5 flex gap-x-2 items-center select-none">
        <span>Weiter</span>
        <Icon name="material-symbols:arrow-forward" size="20" />
      </button>
    </div>
  </div>
</template>

<style>
.p-slider-range {
  @apply bg-guideit-default rounded-md;
}

.p-slider-handle {
  @apply !bg-white-200 !border-white-200;
}

.p-slider-handle::before {
  @apply !bg-guideit-default !border-white-200;
}

.p-slider {
  @apply !bg-white-200 !border-white-200 rounded-full;
}
</style>
