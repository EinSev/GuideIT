<script setup lang="ts">
import type {MenuItem} from "primevue/menuitem";
import NavDrawer from "~/components/NavDrawer.vue";

const config = useRuntimeConfig()
const title = ref("GuideIT");
const description = ref("Erfahre mehr über die IT-Abteilungen und Vertiefungen der HTL Rennweg. Finde heraus, welche Fachrichtung am besten zu dir passt.");
//const videoId = ref("");

useSeoMeta({
  ogUrl: () => config.URL as string,
  ogType: "website",
  title,
  ogTitle: title.value,
  description,
  ogDescription: description.value,
  //ogVideoUrl: () => "http://www.youtube.com/watch/?v=" + videoId.value,
  //ogVideoSecureUrl: () => "https://www.youtube.com/watch/?v=" + videoId.value,
  //ogVideoAlt: "Ein Video über die Web- und App-Entwicklung-Spezialisierung an der HTL Rennweg",
  colorScheme: "only light",
  twitterCard: "player",
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
    class: 'border-l border-guideit-500 w-1 py-3',
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
</script>

<template>
  <div>
    <div class="flex flex-col justify-center items-center mt-5">
      <div class="flex justify-end lg:justify-center w-full mr-5 md:mr-10 lg:mr-0">
        <div class="hidden lg:flex">
          <Menubar :model="items"
                   class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-guideit-default !font-league-spartan !z-50 !shadow-guideit-200 !shadow-md"
                   :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-none', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-medt-default !z-50', itemLabel: '!text-black-default !text-lg group-hover:underline', itemLink: '!p-0 !py-1 !px-3'}"/>
        </div>
        <NavDrawer/>
      </div>
      <div>
        <SvgoLogoWithSlogan class="w-72 md:w-96 lg:w-80 xl:w-96 mt-5 md:mt-10 !-z-20" :fontControlled="false" filled/>
      </div>
      <div id="video" class="w-full px-[10vw] md:px-[14vw] lg:px-[20vw] xl:px-[30vw] mt-10 md:mt-10">
        <div class="w-full aspect-video bg-black-100 rounded flex items-center justify-center"><span class="text-black-default text-lg md:text-xl">Video ist bald verfügbar</span></div>
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
          class="flex flex-col sm:flex-row justify-center md:justify-between w-full mt-10 px-[10vw] md:px-[14vw] lg:px-[12vw] xl:px-[24vw] gap-x-5 gap-y-8">
        <div
            class="bg-nwt-200 border-2 border-nwt-default shadow-nwt-300 shadow-md py-4 px-4 rounded-xl w-full md:w-1/2 lg:w-1/3 xl:w-2/5 flex flex-col justify-center">
          <h2 class="text-nwt-800 text-sub-heading text-center overflow-hidden overflow-ellipsis">NETZWERKTECHNIK</h2>
          <p class="text-text">In der Netzwerktechnik lernst du, wie du LANs, VLANs und WANs planst und
            konfigurierst...</p>
          <div class="flex justify-center mt-auto">
            <button
                class="mt-4 bg-nwt-50 px-7 py-2 text-text rounded-lg border-2 border-nwt-default hover:bg-nwt-default hover:border-nwt-800 hover:text-nwt-100 text-nwt-800">
              <NuxtLink to="/nwt">Mehr dazu</NuxtLink>
            </button>
          </div>

        </div>
        <div
            class="bg-medt-200 border-2 border-medt-default shadow-medt-300 shadow-md py-4 px-4 rounded-xl md:w-1/2 lg:w-1/3 xl:w-2/5 w-full flex flex-col justify-center">
          <h2 class="text-medt-800 text-sub-heading text-center">MEDIENTECHNIK</h2>
          <p class="text-text">In der Medientechnik lernst du die Produktion verschiedenster Medien, die Bearbeitung von...</p>
          <div class="flex justify-center mt-auto">
            <button
                class="mt-4 bg-medt-50 px-7 py-2 text-text rounded-lg border-2 border-medt-default hover:bg-medt-default hover:border-medt-800 hover:text-medt-100 text-medt-800">
              <NuxtLink to="/medt">Mehr dazu</NuxtLink>
            </button>
          </div>
        </div>
      </div>
      <div id="quiz"
           class="w-full px-[10vw] md:px-[14vw] lg:px-[12vw] xl:px-[24vw] mt-11 sm:mt-10 flex flex-col justify-center">
        <div class="border-2 border-guideit-default bg-guideit-100 px-4 py-2 rounded-xl shadow-guideit-200 shadow-md">
          <h2 class="text-guideit-800 text-sub-heading text-center">DAS QUIZ</h2>
          <p class="text-center text-text">Finde jetzt heraus, welche Fachrichtung am besten zu dir passt!</p>
          <div class="flex justify-center mb-2">
            <button
                class="mt-4 bg-guideit-50 px-7 py-2 text-text rounded-lg border-2 border-guideit-400 hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
              <NuxtLink to="/quiz">Quiz starten!</NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex text-black-300 mt-5 justify-between px-2 items-end">
      <NuxtLink to="/impressum" class="text-black-600 ml-2 mb-1">Impressum</NuxtLink>
      <NuxtLink to="https://www.htlrennweg.at" rel="noopener noreferrer"
                class="w-20 lg:w-32" target="_blank"
                external><img src="/assets/img/htl3r_logo_slogan_transparent.png" alt="Logo der HTL Rennweg"/>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
