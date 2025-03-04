<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const route = useRoute();
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
      console.log("loadQuestion", key, storedAnswers.value[key]);      
      question.value.answers = storedAnswers.value[key] ?? question.value.answers;
    }
    
    error.value = undefined;
    await nextTick();
    updateSeparators();
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
  console.log("saveAnswers", newAnswers);
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

function setLocalStorage() {
  useStorage("guideit-current-step-id", currentStepId.value);
  useStorage("guideit-current-question-id", currentQuestionId.value);
}

function updateSeparators() {
  let isActive = false;
  const steps = document.querySelectorAll('.p-step');
  
 for (let index = 0; index < steps.length; index++) {
    const step = steps[index];
    
    isActive = step.classList.contains('p-step-active');
    if (isActive) {      
      return;
    }
  
    const numberCircle = step.querySelector('.p-step-number');
    numberCircle?.classList.add('before-active');
  
    const seperator = step.querySelector('.p-stepper-separator');
    seperator?.classList.add('before-active');
  }
}
</script>

<template>
  <div>
    <Stepper :value="currentStepId" linear class="font-league-spartan px-32">
      <StepList>
        <Step v-for="step in steps" :key="step.id" :value="step.id" :id="'step-' + step.id">
          <div
            :class="{ 'hidden': currentStepId !== step.id, 'h-20 whitespace-break-spaces max-w-32 text-left text-black-default flex items-center mx-1 break-words active:text-black-default border-guideit-default': true}">
            {{ step.title }}
          </div>
        </Step>
      </StepList>
      <StepPanels class="h-full">
        <StepPanel v-for="step in steps" :key="step.id" v-slot="{ activateCallback }" :value="step.id">
          <div class="flex flex-col h-48 bg-white-default text-black-default break">
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

.p-stepper-separator.before-active {
  @apply !bg-guideit-default;
}

.p-step-number.before-active {
  @apply !border-guideit-default;
}
</style>
