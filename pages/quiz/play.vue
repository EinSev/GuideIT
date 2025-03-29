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

const router = useRouter();

const currentStepId = useStorage("guideit-current-step-id", 1);
const currentQuestionId = useStorage("guideit-current-question-id", 1);
const storedAnswers = useStorage<Record<string, Answer[]>>("guideit-stored-answers", {});
const storedIntermediateAnswers = useStorage<Record<string, number>>("guideit-stored-intermediate-answers", {});

const data = ref<Data | undefined>(undefined);
const steps = ref<StepSummary[] | undefined>(undefined);
const stepTitle = ref<string | undefined>(undefined);
const totalSteps = ref<number | undefined>(undefined);
const totalQuestionsInCurrentStep = ref<number | undefined>(undefined);
const question = ref<Question | undefined>(undefined);
const score = ref<number>(50);
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
      if (question.value.is_intermediate) {
        score.value = storedIntermediateAnswers.value[key] ?? 50;
      } else {
        question.value.answers = storedAnswers.value[key] ?? question.value.answers;

      }
    }
    
    error.value = undefined;
  } catch (err: any) {
    error.value = err.message;
    data.value = undefined;
    steps.value = undefined;
    score.value = 50;
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

function saveScore(newScore: number) {
  const key = `${currentStepId.value}-${currentQuestionId.value}`;
  storedIntermediateAnswers.value[key] = newScore;
}

function loadNext(listOrScore: Answer[] | number, is_intermediate: boolean = false) {
  if (is_intermediate) {
    saveScore(listOrScore as number);
  } else { 
    saveAnswers(listOrScore as Answer[]);
  }
  
  if (currentQuestionId.value < (totalQuestionsInCurrentStep.value ?? 0)) {
    currentQuestionId.value++;
  } else {
    if (currentStepId.value < (totalSteps.value ?? 0)) {
      currentQuestionId.value = 1;
      currentStepId.value++;
    } else {
      router.push("/quiz/results");
    }
  }

  updateLocalStoreIds();
}

async function loadPrevious(listOrScore: Answer[] | number, is_intermediate: boolean = false) {
  if (is_intermediate) {
    saveScore(listOrScore as number);
  } else {
    saveAnswers(listOrScore as Answer[]);
  }

  if(currentQuestionId.value === 1 && currentStepId.value === 1) {
    router.push("/quiz");
    return;
  }

  if (currentQuestionId.value === 1) {
    const totalQuestionsInPreviousStep = steps.value?.find((step) => step.id === currentStepId.value - 1)?.totalQuestions;
    currentStepId.value--;
    currentQuestionId.value = totalQuestionsInPreviousStep ?? 1;
  } else {
    currentQuestionId.value--;
  }

  updateLocalStoreIds();
}

async function updateLocalStoreIds() {
  currentStepId.value = currentStepId.value;
  currentQuestionId.value = currentQuestionId.value;
}
</script>

<template>
  <div class="flex flex-col">
    <NuxtLink to="/">
      <SvgoLogo class="w-28 ml-6 mt-6" :fontControlled="false" filled />
    </NuxtLink>
    <Stepper :value="currentStepId" linear class="font-league-spartan px-5 lg:px-40">
      <StepList>
        <Step v-for="step in steps" :key="step.id" :value="step.id" :id="'step-' + step.id" class="h-14 overflow-hidden"
          :pt="{title: 'max-lg:hidden'}">
          <div :class="{ 'hidden': currentStepId !== step.id}"
            class="h-20 font-league-spartan whitespace-break-spaces max-w-32 text-left text-black-default flex items-center mx-1 break-words active:text-black-default border-guideit-default">
            {{ step.title }}
          </div>
        </Step>
      </StepList>
      <StepPanels class="h-full" :pt="{root: 'p-0'}">
        <StepPanel v-for="step in steps" :key="step.id" :value="step.id" class="h-full">
          <div class="flex flex-col h-48 bg-white-default text-black-default lg:mt-5">
            <span v-if="question && !question.is_intermediate" class="text-center mb-0.5 text-xs md:text-sm lg:hidden">{{ stepTitle }}</span>
            <Question v-if="question && !question.is_intermediate" :question="question" @back="loadPrevious"
              @next="loadNext" />
            <IntermediateQuestion v-else-if="question" :question="question" :score="score" @back="loadPrevious"
              @next="loadNext" />
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
