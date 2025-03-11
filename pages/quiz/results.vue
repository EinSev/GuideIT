<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import type { MenuItem } from "primevue/menuitem";
import JSConfetti from "js-confetti";
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
const currentStepId = useStorage("guideit-current-step-id", 1);
const currentQuestionId = useStorage("guideit-current-question-id", 1);

const jsConfetti = new JSConfetti();

const result = ref(evaluateResults());

function getResult(index: number) {
  let link = "";
  let text = "";
  let category = "";
  let color = "";

  switch(result.value[index].category) {
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

  if (index === 0) {
    jsConfetti.addConfetti({confettiColors: [color]});
  }

  return { link, text, category };
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

function reset() {
  console.log('Resetting Quiz');
  storedAnswers.value = {};
  currentQuestionId.value = 1;
  currentStepId.value = 1;
  navigateTo("/quiz");
}

/*
<div class="flex flex-col justify-center items-center mt-20">
    
    <button @click="reset">Reset</button>
  </div>
*/
</script>

<template>
  <div>
    <div class="flex flex-col h-screen">
      <div id="nav" class="flex flex-col justify-center items-center mt-5">
        <div class="flex justify-end lg:justify-center w-full mr-5 md:mr-10 lg:mr-0">
          <div class="hidden lg:flex">
            <Menubar :model="items"
              class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-guideit-default !font-league-spartan !z-50 !shadow-guideit-200 !shadow-md"
              :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-none', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-medt-default !z-50', itemLabel: '!text-black-default !text-lg group-hover:underline', itemLink: '!p-0 !py-1 !px-3' }" />
          </div>
          <NavDrawer />
        </div>
      </div>
      <div id="content">
        <h1 id="heading"
          class="mt-8 lg:mt-12 text-heading-small text-center lg:text-heading font-semibold text-guideit-default">
          Dein Ergebnis!
        </h1>
        <div class="px-20 mt-8 text-xl leading-9 flex">
          <div class="w-2/3 leading-10">
            <p>Wir haben berechnet und berechnet und sind zu einem Ergebnis gekommen: <br> Anhand deiner Angaben würden
              wir dir den Zweig <NuxtLink :to="getResult(0).link" class="font-bold hover:underline"
                :class="getResult(0).category === 'nwt' ? 'text-nwt-default' : getResult(0).category === 'webt' ? 'text-medt-wt-default' : 'text-medt-mm-default'">
                {{ getResult(0).text }}</NuxtLink> empfehlen. <br> Am
              zweitbesten passt laut unseren Berechnungen der
              Zweig <NuxtLink :to="getResult(1).link" class="font-bold hover:underline"
                :class="getResult(1).category === 'nwt' ? 'text-nwt-default' : getResult(1).category === 'webt' ? 'text-medt-wt-default' : 'text-medt-mm-default'">
                {{ getResult(1).text }}</NuxtLink> zu dir!</p>
            <p class="mt-10">Informiere dich aber gerne nochmal über alle Zweige und erfahre mehr <br> duch unsere
              interaktive Videoreihe!</p>
            <div class="flex mt-16">
              <button @click="reset" class="pt-2.5 pb-1 bg-guideit-50 px-5 text-lg rounded-lg border-2 border-guideit-400
                hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
                Zur Startseite
            </button>
            </div>
          </div>
          <SvgoQuizResultsWebt v-if="getResult(0).category === 'webt'" class="w-[23rem]" :fontControlled="false" filled />
          <SvgoQuizResultsMulti v-if="getResult(0).category === 'multi'" class="w-[23rem]" :fontControlled="false" filled />
          <SvgoQuizResultsNwt v-if="getResult(0).category === 'nwt'" class="w-[23rem]" :fontControlled="false" filled />
        </div>
      </div>
      <div class="flex mt-auto text-black-300 justify-between px-2 items-end">
        <NuxtLink to="/impressum" class="text-black-600 ml-2 mb-1">Impressum</NuxtLink>
        <NuxtLink to="https://www.htlrennweg.at" rel="noopener noreferrer" class="w-20 lg:w-32" target="_blank"
          external><img src="/assets/img/htl3r_logo_slogan_transparent.png" alt="Logo der HTL Rennweg" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
