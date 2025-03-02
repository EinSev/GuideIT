<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const currentStepId = ref(Number(route.params.stepid));
const currentQuestionId = ref(Number(route.params.questionid));

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

function loadNext() {
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
}

async function loadPrevious() {
  if (currentQuestionId.value > 1) {
    currentQuestionId.value--;
  } else {
    if (currentStepId.value > 1) {
      currentStepId.value--;
      currentQuestionId.value = totalQuestionsInCurrentStep.value ?? 0;
    } else {
      router.push("/quiz");
    }
  }
}

</script>

<template>
  <div>
    <Stepper :value="currentStepId" linear class="font-league-spartan px-32">
      <StepList>
        <Step v-for="step in steps" :key="step.id" :value="step.id">
          <div
            :class="{ 'hidden': currentStepId !== step.id, 'h-20 whitespace-break-spaces max-w-32 text-left text-black-default flex items-center mx-1 break-words active:text-black-default': true}">
            {{ step.title }}
          </div>
        </Step>
      </StepList>
      <StepPanels>
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
</style>
