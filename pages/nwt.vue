<script setup lang="ts">
import type {MenuItem} from "primevue/menuitem";

const config = useRuntimeConfig()
const title = ref("Netzwerktechnik | GuideIT");
const description = ref("Erfahre mehr über die Netzwerktechnik-Ausbildung an der HTL Rennweg. Lerne über Routing, Switching, Cyber Security und mehr.");

useSeoMeta({
  ogUrl: () => config.URL + "/nwt",
  ogType: "website",
  title,
  ogTitle: title.value,
  description,
  ogDescription: description.value,
  ogImageUrl: "/seo/nwt.png",
  ogImageAlt: "Eine Illustration einer Person, die an einem Serverschrank arbeitet.",
  ogVideoUrl: () => "https://www.youtube.com/watch?v=DU2NpKI-tFg",
  ogVideoSecureUrl: () => "https://www.youtube.com/watch?v=DU2NpKI-tFg",
  ogVideoAlt: "Ein Video über die Netzwerktechnik-Abteilung an der HTL Rennweg",
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
    class: 'border-l border-nwt-default w-1 py-3',
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
            class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-nwt-default !font-league-spartan !z-50 !shadow-nwt-200 !shadow-md"
            :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-none', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-nwt-default !z-50', itemLabel: '!text-black-default !text-lg group-hover:underline', itemLink: '!p-0 !py-1 !px-3'}" />
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
                <li class="mb-1 text-nwt-default border-t-2 border-nwt-300 pt-2 ">
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
      <template #title><span class="text-nwt-default ">Netzwerktechnik</span></template>
      <template #video>
        <VideoIframe embedId="DU2NpKI-tFg?si=ebO1NimGy-lIbQwD"/>
      </template>
          <template #content-1>In der dritten Klasse kannst du dich für die Vertiefung Netzwerktechnik für die kommenden
            Jahre entscheiden. In der Netzwerktechnik gibt es keine weiteren Spezialisierungen — die ganze Klasse lernt
            dieselben Inhalte. Netzwerktechnik gliedert sich in die Fächer <b>NWTK, NWTOS</b> und
            <b>NWT-Infrastruktur</b>
            auf.
          </template>
          <template #content-2-header><span class="text-nwt-default ">Themenbereiche</span>
          </template>
          <template #content-2-more-text>
            <div class="text-text lg:mb-20">
              Im Fach NWTK dreht sich alles um die Grundlagen von Netzwerken:
              <ul class="list-disc ml-5">
                <li>
                  Welche <b>Routingprotokolle</b> sind im Internet relevant?
                </li>
                <li>
                  Welche davon werden in Unternehmen unterschiedlicher Größe verwendet?
                </li>
                <li>
                  Welche <b>Faktoren</b> sind entscheidend, worin unterscheiden sie sich und für welche
                  <b>Anwendungsfälle</b>
                  sind sie
                  geeignet?
                </li>
              </ul>
              Ebenso wird <b>Switching</b> im Detail behandelt: Worin unterscheiden sich Switching und Routing? Welche
              Protokolle
              gibt es dafür und wie lassen sich Performance-Problemen erkennen und lösen?
              Du baust auf deinem Wissen der ersten drei Jahre auf und tauchst noch tiefer in die Materie ein.
            </div>
          </template>
          <template #content-2-more-text-illustration>
            <div class="flex justify-center lg:hidden my-4">
              <SvgoNwtServer class="w-[28rem]" :fontControlled="false" filled />
            </div>
          </template>
          <template #content-2>
            Neu hinzu kommt die Geschichte des Internets: Was waren die Voraussetzungen für unseren heutigen Stand der
            Technik? Welche Pioniere und Entdecker haben bahnbrechende Erfindungen entwickelt?<br>
            Außerdem lernst du die verschiedenen Technologien des Mobilfunks und der Telefonie kennen. Nicht wegzudenken
            ist
            das Thema <b>Cyber Security</b>: Du erlangst Wissen über Verschlüsselungstechniken, VPNs, Firewalls,
            Antivirussoftware
            und Traffic Analysen.
          </template>
          <template #content-2-illustration>
            <SvgoNwtServer class="w-[28rem] max-lg:hidden" :fontControlled="false" filled />
            <SvgoNwtSecure class="w-[22rem] lg:hidden -mb-5" :fontControlled="false" filled />
          </template>
          <template #content-3-illustration>
            <SvgoNwtSecure class="w-[22rem] max-lg:hidden" :fontControlled="false" filled />
          </template>
          <template #content-3>In NWTOS erlernst du die Basics von <b>Windows</b> und <b>Unix</b>-basierten
            Betriebssysteme
            sowie das
            Windows Active Directory, und die Benutzer- und Datenverwaltung. Diese Themen kennst du vielleicht schon aus
            BS,
            doch in der Vertiefung bearbeitest du sie nun in Gruppen. Die Verantwortung für die Erarbeitung der
            einzelnen
            Teile („Module“) eines Themas („Bausteins“) – von der Durchführung bis zur Dokumentation – liegt bei dir
            selbst.
            In NWT-Infrastruktur lernst du noch über die <b>physische</b> und <b>virtuelle</b> Verwaltung von
            <b>Servern</b>.
          </template>
          <template #content-4-header>
            <div class="-mt-8"><span class="text-nwt-default">Zusätzliche Fächer</span></div>
          </template>
          <template #content-4>
            Allgemein hast du in der Abteilung Netzwerktechnik — wie in der Medientechnik — weiterhin bereits bekannte
            Fächer wie <b>INSY</b> (Informationssysteme) und <b>SEW</b> (Softwareentwicklung). In SEW lernst du die
            Programmiersprache Python, mit der du Datenanalysen, -auswertung
            und Verschlüsselungen programmiert. Java bleibt ebenfalls ein fester Bestandteil deiner Ausbildung.
            In <b>ITP</b> wendest du dein erlerntes Wissen dann in eigenen kleinen Projekten mit der Hilfe von
            Projektmanagementmethoden wie Wasserfall und Scrum an.
          </template>
          <template #content-4-illustration>
            <SvgoNwtTeam class="w-[28rem]" :fontControlled="false" filled />
          </template>
    </NuxtLayout>
  </div>
</template>
