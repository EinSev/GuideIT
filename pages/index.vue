<script setup lang="ts">
import {Menubar} from "primevue";
import type {MenuItem} from "primevue/menuitem";

const visible = ref(false);

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
    label: '',
    class: 'border-l border-guideit-500 w-1 cursor-default hover:cursor-default',
  },
  {
    label: 'Netwerktechnik',
    class: 'group',
    command: () => {
      navigateTo('/nwt')
    }
  },
  {
    label: 'Medientechnik',
    items: [
      {
        label: 'Allgemein',
        class: 'group',
        command: () => {
          navigateTo('/medt')
        }
      },
      {
        label: 'Multimediale Produktionen',
        class: 'group',
        command: () => {
          navigateTo('/medt/multi')
        }
      },
      {
        label: 'Webtechnologien',
        class: 'group',
        command: () => {
          navigateTo('/medt/webt')
        }
      }]
  }
]);
</script>

<template>
  <div>
    <div class="flex flex-col justify-center items-center mt-5 relative">
      <div class="flex justify-end lg:justify-center w-full mr-5 md:mr-10 lg:mr-0">
        <div class="hidden lg:block">
          <Menubar :model="items"
                   class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-primary !drop-shadow !font-league-spartan !z-50 "
                   :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-white-default', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-medt-default !z-50', itemLabel: '!text-black-default group-hover:underline'}"/>
        </div>
        <div class="lg:hidden">
          <Drawer v-model:visible="visible" position="right"
                  class="!bg-white-default !text-black-default !w-56 !font-league-spartan"
                  :pt="{header: '!pl-0 !pb-0'}">
            <template #closeicon><i class="pi pi-angle-left !text-4xl !text-black-default"/></template>
            <div>
              <ul class="flex flex-col justify-end text-2xl text-end text-black-default">
                <li class="mb-2">
                  <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li class="mb-2">
                  <NuxtLink to="/quiz">Quiz</NuxtLink>
                </li>
                <li class="mb-2 text-nwt-default border-t-2 border-nwt-300 pt-2">
                  <NuxtLink to="/nwt">Netzwerktechnik</NuxtLink>
                </li>
                <li class="mb-1 text-medt-default border-t-2 border-medt-300 pt-2 ">
                  <NuxtLink to="/medt">Medientechnik</NuxtLink>
                </li>
                <li class="mb-1 text-xl text-nowrap whitespace-nowrap font-light">
                  <NuxtLink to="/medt/multi">Multimediale Produktion</NuxtLink>
                </li>
                <li class="text-xl font-light">
                  <NuxtLink to="/medt/webt">Webtechnologien</NuxtLink>
                </li>
              </ul>
            </div>
          </Drawer>
          <button @click="visible = true" aria-label="Open menu" aria-expanded="visible"><span
              class="pi pi-bars !text-3xl"></span></button>
        </div>
      </div>
      <div>
        <SvgoLogoWithSlogan class="w-72 md:w-96 lg:w-80 mt-5 md:mt-10 !-z-20" :fontControlled="false" filled/>
      </div>
      <div id="video" class="w-full px-[10vw] md:px-[14vw] lg:px-[20vw] xl:px-[30vw] mt-10 md:mt-14">
        <video class="w-full aspect-video bg-black-100" src=""></video>
        <!--
        <video
            class="w-full aspect-video bg-black-100"
            controls
            preload="metadata"
            poster="/path/to/poster.jpg"
        >
          <source src="/path/to/video.mp4" type="video/mp4">
          <p>Your browser doesn't support HTML video. Here's a <a href="/path/to/video.mp4">link to the video</a>
            instead.</p>
        </video>
        -->
      </div>
      <div
          class="flex flex-col sm:flex-row justify-center md:justify-between w-full mt-10 px-[10vw] md:px-[14vw] lg:px-[12vw] xl:px-[24vw] gap-x-5 lg:gap-x-0 gap-y-8">
        <div
            class="bg-nwt-200 border-2 border-nwt drop-shadow-xl py-4 px-4 rounded-xl w-full md:w-1/2 lg:w-1/3 flex flex-col justify-center">
          <h2 class="text-nwt-800 text-2xl text-center">NETZWERKTECHNIK</h2>
          <p class="text-base">In der Netzwerktechnik lernst du, wie du LANs, VLANs und WANs planst und
            konfigurierst...</p>
          <div class="flex justify-center mt-auto">
            <button
                class="mt-4 bg-nwt-50 px-7 py-2 rounded-lg border-2 border-nwt-default hover:bg-nwt-default hover:border-nwt-800 hover:text-nwt-100 text-nwt-800">
              <NuxtLink to="/nwt">Mehr dazu</NuxtLink>
            </button>
          </div>

        </div>
        <div
            class="bg-medt-200 border-2 border-medt drop-shadow-xl py-4 px-4 rounded-xl md:w-1/2 lg:w-1/3 w-full flex flex-col justify-center">
          <h2 class="text-medt-800 text-2xl text-center">MEDIENTECHNIK</h2>
          <p>In der Medientechnik lernst du die Produktion verschiedenster Medien, die Bearbeitung von...</p>
          <div class="flex justify-center mt-auto">
            <button
                class="mt-4 bg-medt-50 px-7 py-2 rounded-lg border-2 border-medt-default hover:bg-medt-default hover:border-medt-800 hover:text-medt-100 text-medt-800">
              <NuxtLink to="/medt">Mehr dazu</NuxtLink>
            </button>
          </div>
        </div>
      </div>
      <div id="quiz"
           class="w-full px-[10vw] md:px-[14vw] lg:px-[12vw] xl:px-[24vw] mt-16 sm:mt-10 flex flex-col justify-center">
        <div class="border-2 border-guideit-default bg-guideit-100 px-4 py-2 rounded-xl drop-shadow-xl">
          <h2 class="text-guideit-800 text-xl text-center">DAS QUIZ</h2>
          <p class="text-center">Finde jetzt heraus, welche Fachrichtung am besten zu dir passt!</p>
          <div class="flex justify-center mb-2">
            <button
                class="mt-4 bg-guideit-50 px-7 py-2 rounded-lg border-2 border-guideit-400 hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
              <NuxtLink to="/quiz">Quiz starten!</NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex text-black-300 mt-5 justify-between px-2 items-end">
      <NuxtLink to="/impressum" class="text-black-600">Impressum</NuxtLink>
      <NuxtLink to="https://www.htlrennweg.at" rel="noopener noreferrer"
                class="w-20" target="_blank"
                external><img src="/assets/img/htl3r_logo_slogan_transparent.png" alt="Logo der HTL Rennweg"/>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
