<script setup lang="ts">
import type {MenuItem} from "primevue/menuitem";
import { useStorage } from '@vueuse/core';

const config = useRuntimeConfig()
const title = ref("Quiz | GuideIT");
const description = ref("Mache das Quiz und finde heraus, welche IT-Abteilung an der HTL Rennweg am besten zu dir passt.");

useSeoMeta({
  ogUrl: () => config.URL + "/quiz",
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

function reset() {
  console.log('Resetting Quiz');
  storedAnswers.value = {};
  storedIntermediateAnswers.value = {};
  currentQuestionId.value = 1;
  currentStepId.value = 1;
  navigateTo("/quiz/play");
}
</script>

<template>
  <div class="flex flex-col h-screen mx-[5vw] sm:mx-[12vw] md:mx-0">
    <div class="flex justify-between lg:justify-center w-full mt-5">
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
    <div id="content relative">
      <h1 id="heading"
        class="mt-5 lg:mt-12 text-heading-small text-center lg:text-heading font-semibold text-guideit-default">
        Mach das Quiz!
      </h1>
      <div class="lg:px-20 mt-2 lg:mt-8 text-text leading-9 flex flex-col w-full lg:flex-row">
        <div>
          <p>
            Netzwerktechnik? Mediendesign und Medienproduktion? Oder Web- & App-Entwicklung? Mach das GuideIT-Quiz
            und
            finde es heraus
          </p>
          <p class="mt-5">
            <b>Achtung:</b> Das Quiz gibt dir nur eine Orientierung für deine Entscheidung und soll
            dich
            unterstützen - denn niemand außer du selbst kann diese Entscheidung treffen!
          </p>
          <div class="flex max-lg:ml-8 mt-5 lg:justify-center lg:mt-16">
            <button @click="reset" class="pt-0.5 lg:pt-2.5 lg:pb-1 bg-guideit-50 px-8 lg:px-16 text-text lg:text-sub-heading rounded-lg border-[3px] border-guideit-400
                hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
              Loslegen!
            </button>
          </div>
        </div>
        <SvgoQuiz class="w-full lg:w-[70rem] mt-10 lg:-mt-20" :fontControlled="false" filled />
      </div>
    </div>
    <div class="flex mt-auto text-black-300 justify-between px-2 items-end">
      <NuxtLink to="/impressum" class="text-black-600 ml-2 mb-1">Impressum</NuxtLink>
      <NuxtLink to="https://www.htlrennweg.at" rel="noopener noreferrer" class="w-20 lg:w-32" target="_blank" external>
        <img src="/assets/img/htl3r_logo_slogan_transparent.png" alt="Logo der HTL Rennweg" />
      </NuxtLink>
    </div>
  </div>
</template>
