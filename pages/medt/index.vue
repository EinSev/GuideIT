<script setup lang="ts">
import type {MenuItem} from "primevue/menuitem";

const config = useRuntimeConfig()
const title = ref("Medientechnik | GuideIT");
const description = ref("Erfahre mehr über die Medientechnik-Vertiefung an der HTL Rennweg. Lerne über Web- und App-Entwicklung, Mediendesign & Medienproduktionen und mehr.");

useSeoMeta({
  ogUrl: () => config.URL + "/medt",
  ogType: "website",
  title,
  ogTitle: title.value,
  description,
  ogDescription: description.value,
  ogImageUrl: "/seo/medt.png",
  ogImageAlt: "Eine Illustration einer Person, die an einem Computer arbeitet.",
  ogVideoUrl: () => "https://youtu.be/ikWTwNKjJ7U",
  ogVideoSecureUrl: () => "https://youtu.be/ikWTwNKjJ7U",
  ogVideoAlt: "Ein Video über die Medientechnik-Vertiefung an der HTL Rennweg",
  colorScheme: "only light",
  twitterCard: "player",
});

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
    separator: true,
    class: 'border-l border-medt-default w-1 py-3',
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
    <NuxtLayout name="department">
      <template #nav>
        <div class="hidden lg:flex">
          <Menubar :model="items"
            class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-medt-default !font-league-spartan !z-50 !shadow-medt-200 !shadow-md"
            :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-none', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-medt-default !z-50', itemLabel: '!text-black-default !text-lg group-hover:underline', itemLink: '!p-0 !py-1 !px-3'}" />
        </div>
        <div class="lg:hidden">
          <Drawer v-model:visible="visible" position="right"
            class="!bg-white-default !text-black-default !w-72 !font-league-spartan" :pt="{header: '!pl-0 !pb-0'}">
            <template #closeicon><i class="pi pi-angle-left !text-4xl !text-black-default" /></template>
            <div>
              <ul class="flex flex-col justify-end text-sub-heading-small text-end text-guideit-800">
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
                <li class="mb-1 text-text whitespace-nowrap font-light text-wrap">
                  <NuxtLink to="/medt/multi">Mediendesign & Medienproduktionen</NuxtLink>
                </li>
                <li class="text-text font-light">
                  <NuxtLink to="/medt/web">Web- & App-Entwicklung</NuxtLink>
                </li>
              </ul>
            </div>
          </Drawer>
          <button @click="visible = true" aria-label="Open menu"><span class="pi pi-bars !text-3xl"></span></button>
        </div>
      </template>
      <template #title><span class="text-medt-default ">Medientechnik</span></template>
      <template #video>
        <VideoIframe embed-id="ikWTwNKjJ7U?si=muJV4TI05Uqu3frU" />
      </template>
      <template #content-1>In der dritten Klasse kannst du dich für die <b>Vertiefung Medientechnik</b> für die 4.-5.
        Klasse
        entscheiden. In der Medientechnik hast du einerseits gemeinsamen Stamm-Unterricht, aber auch gleich eine
        spezielle Vertiefung in einem Bereich, der dich interessiert und für den du dich ebenfalls in der dritten Klasse
        schon entscheiden musst. Zur Wahl stehen dafür
        <NuxtLink to="/medt/web" class="underline text-medt-default font-medium">Web- & App-Entwicklung</NuxtLink>
        und
        <NuxtLink to="/medt/multi" class="underline text-medt-default font-medium">Mediendesign &
          Medienproduktionen.
        </NuxtLink>
        Im Stamm- Unterricht erlernen alle die <b>Grundlagen dieser Vertiefungen</b> und zusätzlich etwas über <b>das
          Gestalten
          und Programmieren von virtuellen Welten</b> und über <b>Grafik & Gestaltung</b>.
      </template>
      <template #content-2-header><span class="text-medt-default ">Themenbereiche</span>
      </template>
      <template #content-2>Im Themenbereich virtuelle Welten dreht sich alles um das 3D-Modellieren, animieren und die
        Einbindung der erstellten Modelle in Spielen, während in Grafik & Gestaltung auf das visuelle Aufbereiten von
        Daten bis hin zum Designen von Logos und Websitemockups eingegangen wird.
      </template>
      <template #content-2-illustration>
        <SvgoMedtStudio class="w-[28rem]" :fontControlled="false" filled />
      </template>
      <template #content-3-illustration>
        <SvgoMedtProgramming class="w-[22rem]" :fontControlled="false" filled />
      </template>
      <template #content-3>In den Grundlagen von
        <NuxtLink to="/medt/web" class="underline text-medt-default font-medium">Web- & App-Entwicklung</NuxtLink>
        erweiterst du dein Wissen in PHP, entwickelst Webseiten mit Template Engines wie Twig und machst deine ersten
        Schritte in Content Management Systemen wie Wordpress.
        <NuxtLink to="/medt/multi" class="underline text-medt-default font-medium">Mediendesign &
          Medienproduktionen
        </NuxtLink>
        umfasst die Theorie zu
        Audio und Video/Foto und die Handhabung der dazugehörigen Hardware.
      </template>
      <template #content-4-header><span class="text-medt-default">Zusätzliche Fächer</span>
      </template>
      <template #content-4>Allgemein hast du in der Abteilung Medientechnik auch weiterhin bereits bekannte
        Fächer wie <b>INSY</b> (Informationssysteme) und <b>SEW</b> (Softwareentwicklung). SEW orientiert sich dann
        jedoch in Richtung Web und konzentriert
        sich auf das Frontendframework Vue.js und Springboot für die Entwicklung eines Backends. In <b>ITP</b>
        (Informationstechnische Projekte) wendest du dein erlerntes Wissen dann in
        eigenen kleinen Projekten mit der Hilfe von Projektmanagementmethoden wie Wasserfall und Scrum an.
      </template>
      <template #content-4-illustration>
        <SvgoMedtTeam class="w-[28rem]" :fontControlled="false" filled />
      </template>
    </NuxtLayout>
  </div>
</template>
