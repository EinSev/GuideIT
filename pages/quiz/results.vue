<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import type { MenuItem } from "primevue/menuitem";
import { SvgoQuizResultsWebt } from '#components';

definePageMeta({
  middleware: 'is-quiz-played',
})

const config = useRuntimeConfig()
const title = ref("Quiz Ergebnis | GuideIT");
const description = ref("Mache das Quiz und finde heraus, welche IT-Abteilung an der HTL Rennweg am besten zu dir passt.");

useSeoMeta({
  ogUrl: () => config.URL + "/quiz/results",
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

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    class: 'group',
    command: () => {
      navigateTo('/')
    }
  },
  {
    label: 'Quiz',
    class: 'group',
    command: () => {
      navigateTo('/quiz')
    }

  },
  {
    separator: true,
    class: 'border-l border-guideit-default w-1 py-3',
  },
  {
    label: 'Netzwerktechnik',
    class: 'group',
    command: () => {
      navigateTo('/nwt')
    }
  },
  {
    label: 'Medientechnik',
    items: [
      {
        label: 'Medientechnik',
        class: 'group',
        command: () => {
          navigateTo('/medt')
        }
      },
      {
        label: 'Mediendesign & Medienproduktionen',
        class: 'group',
        command: () => {
          navigateTo('/medt/multi')
        }
      },
      {
        label: 'Web- & App-Entwicklung',
        class: 'group',
        command: () => {
          navigateTo('/medt/web')
        }
      }]
  }
]);

const storedAnswers = useStorage<Record<string, Answer[]>>("guideit-stored-answers", {});
const storedIntermediateAnswers = useStorage<Record<string, number>>("guideit-stored-intermediate-answers", {});
const currentStepId = useStorage("guideit-current-step-id", 1);
const currentQuestionId = useStorage("guideit-current-question-id", 1);

const result = ref(evaluateResults());
const showPopup = ref(evaluateIntermediateQuestions().over50 >= 2);

function getResultByIndex(index: number) {
  let link = "";
  let text = "";
  let category = "";
  let color = "";

  switch (result.value[index].category) {
    case "nwt":
      link = "/nwt";
      text = "Netzwerktechnik";
      category = "nwt";
      color = '#355070';
      break;
    case "webt":
      link = "/medt/web";
      text = "Web- & App-Entwicklung";
      category = "webt";
      color = "#b56576";
      break;
    case "multi":
      link = "/medt/multi";
      text = "Mediendesign & Medienproduktionen";
      category = "multi";
      color = "#e56b6f";
      break;
  }

  return { link, text, category, color };
}

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

  const temp = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([category, score]) => ({ category, score }));

  console.log('Secret Results: ', temp);

  return temp;
}

function evaluateIntermediateQuestions() {
  const intermediateScores = storedIntermediateAnswers.value;
  const results = [];
  let over50 = 0;

  for (let key in intermediateScores) {
    const score = intermediateScores[key];
    results.push({ category: key, score });
    if (score > 50) {
      over50++;
    }
  }

  console.log('Intermediate Results: ', results);

  return { results, over50 };
}

async function reset() {
  storedAnswers.value = {};
  storedIntermediateAnswers.value = {};
  currentQuestionId.value = 1;
  currentStepId.value = 1;
  await navigateTo("/");
}
</script>

<template>
  <div>
    <div class="flex flex-col h-screen mx-[5vw] sm:mx-[12vw] md:mx-0">
      <div id="nav" class="flex justify-between lg:justify-center w-full mt-5">
        <NuxtLink to="/" class="lg:hidden">
          <SvgoLogo class="w-32" :fontControlled="false" />
        </NuxtLink>
        <div>
          <div class="hidden lg:flex">
            <Menubar :model="items"
              class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-guideit-default !font-league-spartan !z-50 !shadow-guideit-200 !shadow-md"
              :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-none', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-guideit-default !z-50', itemLabel: '!text-black-default !text-lg group-hover:underline', itemLink: '!p-0 !py-1 !px-3' }" />
          </div>
          <NavDrawer />
        </div>
      </div>
      <div id="content">
        <h1 id="heading"
          class="mt-4 lg:mt-12 text-heading-small text-center lg:text-heading font-semibold text-guideit-default">
          Dein Ergebnis!
        </h1>
        <div class="lg:px-20 mt-2 lg:mt-8 text-lg lg:text-xl leading-9 flex flex-col lg:flex-row">
          <div class="lg:w-2/3 leading-8 lg:leading-10">
            <p>
              Wir haben berechnet und berechnet und sind zu einem Ergebnis gekommen: <br> Anhand deiner Angaben würden
              wir dir den Zweig
              <NuxtLink :to="getResultByIndex(0).link" class="font-bold hover:underline"
                :class="getResultByIndex(0).category === 'nwt' ? 'text-nwt-default' : getResultByIndex(0).category === 'webt' ? 'text-medt-wt-default' : 'text-medt-mm-default'">
                {{ getResultByIndex(0).text }}</NuxtLink> empfehlen. <br> Am
              zweitbesten passt laut unseren Berechnungen der
              Zweig <NuxtLink :to="getResultByIndex(1).link" class="font-bold hover:underline"
                :class="getResultByIndex(1).category === 'nwt' ? 'text-nwt-default' : getResultByIndex(1).category === 'webt' ? 'text-medt-wt-default' : 'text-medt-mm-default'">
                {{ getResultByIndex(1).text }}</NuxtLink> zu dir!
            </p>
            <p class="mt-5 lg:mt-10">Informiere dich aber gerne nochmal über alle Zweige und erfahre mehr <br> duch
              unsere
              interaktive Videoreihe!</p>
            <div class="flex mt-4 lg:mt-8">
              <button @click="reset" class="pt-2.5 pb-1 bg-guideit-50 px-5 text-lg rounded-lg border-2 border-guideit-400
                hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
                Zur Startseite
              </button>
            </div>
          </div>

          <div class="flex max-lg:justify-center">
            <SvgoQuizResultsWebt v-if="getResultByIndex(0).category === 'webt'" class="w-[18rem] lg:w-[23rem]"
              :fontControlled="false" filled />
            <SvgoQuizResultsMulti v-if="getResultByIndex(0).category === 'multi'" class="w-[18rem] lg:w-[23rem]"
              :fontControlled="false" filled />
            <SvgoQuizResultsNwt v-if="getResultByIndex(0).category === 'nwt'" class="w-[18rem] lg:w-[23rem]"
              :fontControlled="false" filled />
          </div>
        </div>
      </div>
      <div class="flex mt-auto text-black-300 justify-between px-2 items-end">
        <NuxtLink to="/impressum" class="text-black-600 ml-2 mb-1">Impressum</NuxtLink>
        <NuxtLink to="https://www.htlrennweg.at" rel="noopener noreferrer" class="w-20 lg:w-32" target="_blank"
          external><img src="/assets/img/htl3r_logo_slogan_transparent.png" alt="Logo der HTL Rennweg" />
        </NuxtLink>
      </div>
    </div>
    <div id="dialogs">
      <Dialog v-model:visible="showPopup" modal :block-scroll="true" :auto-z-index="true" :draggable="false"
        close-on-escape dismissable-mask :show-header="false" :show-footer="false"
        class="z-50 flex flex-col !rounded-3xl font-nunito w-4/5 lg:w-2/4 !border-4 !border-guideit-default" :pt="{
          root: '!bg-black-50 !text-black-default', content: '!p-0'
        }" @hide="showPopup = false">
        <div class="lg:mt-5 flex justify-end lg:mr-5">
          <button class="text-black-700 hover:text-black-default" @click="showPopup = false">
            <Icon name="material-symbols:close-small-outline-rounded" size="40" />
          </button>
        </div>
        <div class="px-4 lg:px-20">
          <h2 class="text-2xl text-guideit-default mb-2 font-semibold">Wichtiger Hinweis!</h2>
          <p class="text-text-small lg:text-text font-league-spartan leading-7 lg:leading-10">
            Wir haben bemerkt, dass du bei den Zwischenfragen oft in Richtung Ja tendiert hast. Wir wollen dich daher
            noch
            einmal daran erinnern, dass deine Wahl deine ganz eigene Entscheidung ist! Überlege wie wichtig dir die
            Meinungen von anderen Personen ist und informiere dich bei Ungewissheit bei deinen Lehrkräften!
          </p>
          <div class="flex justify-end mt-4 mb-8">
            <span class="text-text-small lg:text-text">- dein GuideIT-Team</span>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>
