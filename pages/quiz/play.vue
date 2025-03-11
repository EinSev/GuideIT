<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const config = useRuntimeConfig()
const title = ref("Quiz | GuideIT");
const description = ref("Mache das Quiz und finde heraus, welche IT-Abteilung an der HTL Rennweg am besten zu dir passt.");

useSeoMeta({
  ogUrl: () => config.URL + "/quiz/play",
  ogType: "website",
  title,
  ogTitle: title.value,
  description,
  ogDescription: description.value,
  ogImageUrl: "/seo/quiz.png",
  ogImageAlt: "Eine Illustration einer Person, die an einem Schreibtisch mit einem Laptop sitzt. Zusätzlich ist eine Grafik mit Quizfragen im Hintergrund",
  colorScheme: "only light",
  twitterCard: "summary",
});

definePageMeta({
  middleware: 'restart-game',
})

const router = useRouter();

const currentStepId = useStorage("guideit-current-step-id", 1);
const currentQuestionId = useStorage("guideit-current-question-id", 1);
const storedAnswers = useStorage<Record<string, Answer[]>>("guideit-stored-answers", {});

const data = ref<Data | undefined>(undefined);
const steps = ref<StepSummary[] | undefined>(undefined);
const stepTitle = ref<string | undefined>(undefined);
const totalSteps = ref<number | undefined>(undefined);
const totalQuestionsInCurrentStep = ref<number | undefined>(undefined);
const question = ref<Question | undefined>(undefined);
const error = ref<string | undefined>(undefined);

const loadQuestion = async () => {
  try {
    const response = await fetch(`/api/questions/${currentStepId.value}/${currentQuestionId.value}`);
    if (!response.ok) navigateTo("/quiz");

    data.value = await response.json();

    steps.value = data.value?.steps.all;
    stepTitle.value = data.value?.steps.current.title;
    totalSteps.value = data.value?.steps.total;
    totalQuestionsInCurrentStep.value = data.value?.steps.current.totalQuestions;
    question.value = data.value?.question;

    if (question.value) {
      const key = `${currentStepId.value}-${currentQuestionId.value}`;
      question.value.answers = storedAnswers.value[key] ?? question.value.answers;
    }
    
    error.value = undefined;
  } catch (err: any) {
    error.value = err.message;
    data.value = undefined;
    stepTitle.value = undefined;
    totalSteps.value = undefined;
    totalQuestionsInCurrentStep.value = undefined;
    question.value = undefined;
  }
};

watchEffect(loadQuestion);

function saveAnswers(newAnswers: Answer[]) {
  const key = `${currentStepId.value}-${currentQuestionId.value}`;
  storedAnswers.value[key] = newAnswers;
}

function loadNext(list: Answer[]) {
  saveAnswers(list);
  if (currentQuestionId.value < (totalQuestionsInCurrentStep.value ?? 0)) {
    currentQuestionId.value++;
  } else {
    if (currentStepId.value < (totalSteps.value ?? 0)) {
      currentStepId.value++;
      currentQuestionId.value = 1;
    } else {
      router.push("/quiz/results");
    }
  }

  setLocalStorage();
}

async function loadPrevious(list: Answer[]) {
  saveAnswers(list);
  if (currentQuestionId.value > 1) {
    currentQuestionId.value--;
  } else {
    if (currentStepId.value > 1) {
      const totalQuestionsInPreviousStep = steps.value?.find((step) => step.id === currentStepId.value - 1)?.totalQuestions;
      currentStepId.value--;
      currentQuestionId.value = totalQuestionsInPreviousStep ?? 1;
    } else {
      router.push("/quiz");
    }
  }

  setLocalStorage();
}

async function setLocalStorage() {
  useStorage("guideit-current-step-id", currentStepId.value);
  useStorage("guideit-current-question-id", currentQuestionId.value);
}
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink to="/">
      <SvgoLogo class="w-28 ml-6 mt-6" :fontControlled="false" filled />
    </NuxtLink>
    <Stepper :value="currentStepId" linear class="font-league-spartan px-40">
      <StepList>
        <Step v-for="step in steps" :key="step.id" :value="step.id" :id="'step-' + step.id"
          class="h-14 overflow-hidden">
          <div
            :class="{ 'hidden': currentStepId !== step.id, 'h-20 whitespace-break-spaces max-w-32 text-left text-black-default flex items-center mx-1 break-words active:text-black-default border-guideit-default': true}">
            {{ step.title }}
          </div>
        </Step>
      </StepList>
      <StepPanels class="h-full">
        <StepPanel v-for="step in steps" :key="step.id" :value="step.id">
          <div class="flex flex-col h-48 bg-white-default text-black-default mt-5">
            <Question v-if="question" :question="question" @back="loadPrevious" @next="loadNext" />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<style>
.p-step-active .p-step-number {
  @apply text-black-default border-guideit-default bg-white-default;
}

.p-step-number {
  @apply pt-[0.2rem] bg-white-default text-black-default border-white-200;
}

.p-stepper-separator {
  @apply bg-white-200;
}

:root {
  --p-stepper-separator-active-background: #82b4b8;
}
</style>
