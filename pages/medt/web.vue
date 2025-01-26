<script setup lang="ts">
import type {MenuItem} from "primevue/menuitem";

useHead({
  title: "Web- und App-Entwicklung | GuideIT",
  description: "Web- und App-Entwicklung",
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
    class: 'border-l border-medt-wt-default w-1 py-3',
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
                   class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-medt-wt-default !font-league-spartan !z-50 !shadow-medt-wt-200 !shadow-md"
                   :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-none', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-medt-default !z-50', itemLabel: '!text-black-default !text-lg group-hover:underline', itemLink: '!p-0 !py-1 !px-3'}"/>
        </div>
        <NavDrawer/>
      </template>
      <template #title><span class="text-medt-wt-default leading-none">Web- & App-Entwicklung</span></template>
      <template #video>
        <div
            class="w-full aspect-video bg-medt-wt-200 border-2 rounded border-medt-wt-default flex items-center justify-center"><span
            class="text-black-default text-lg md:text-xl">Video ist noch nicht verfügbar!</span></div>
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
      </template>
      <template #content-1>Wenn du dich in der 3. Klasse für die Vertiefung
        <NuxtLink to="/medt" class="underline text-medt-default font-medium">Medientechnik</NuxtLink>
        ab der 4. Klasse entscheidest, hast du ebenfalls eine weitere wichtige Wahl zu tätigen: Deine spezielle
        Vertiefung in Web- und App-Entwicklung oder Mediendesign und Medienproduktionen. Solltest du dich für <b>Web-
          und
          App-Entwicklung</b> interessieren, bist du hier genau richtig!
      </template>
      <template #content-2-header><span class="text-medt-wt-default ">Darum geht's!</span>
      </template>
      <template #content-2>In Web- und App-Entwicklung dreht sich fast alles um das Entwickeln von Webseiten, genauer
        gesagt das <b>Backend von Webseiten</b>. Während modulbasiertem Arbeiten erlernst du wie du mit <b>PHP</b>
        Antworten lieferst,
        Daten aus deiner Datenbank zurücklieferst bis hin zur <b>Template Engine</b> Twig mit der du einfach eine
        Website nach
        dem MVC-Ansatz erstellen kannst.
      </template>
      <template #content-2-illustration>
        <SvgoMedtWebPairProgramming class="w-[30rem] mt-10 lg:mt-2" :fontControlled="false" filled/>
      </template>
      <template #content-3-illustration>
        <SvgoMedtWebVr class="w-[14rem] lg:w-[18rem] lg:mt-16" :fontControlled="false" filled/>
      </template>
      <template #content-3> Keine Sorge, wenn du noch nicht weißt, was das ist, genau das wirst du ebenfalls in dieser
        Vertiefung erlernen. Ebenso erweiterst du dein Wissen von <b>Content-Management-Systemen</b> wie Wordpress und
        Typo3,
        die dir helfen ganz einfach eine Webseite zu erstellen. Nach dem Erlernen der Grundlagen wirst du ebenso das
        <b>PHP-Framework Symfony</b> kennenlernen, das dir einiges vereinfachen wird. Im Unterrichtsfach <b>APP</b>
        befasst du dich in
        sogenannten „Workshops“ mit aktuellen Themen wie <b>KI, JavaScript-Frameworks und VR/AR</b>.
      </template>
      <template #content-4-header><span class="text-medt-wt-default">Zusätzliche Fächer</span>
      </template>
      <template #content-4>Übungen aus dem Unterricht sind zum Beispiel das Aufsetzen einer <b>Wordpress-Seite</b>, das
        Erstellen einer eigenen kleinen <b>Templating Engine</b> oder die Umsetzung eines Prototyps mit
        Datenbankanbindung und
        <b>CRUD-Funktionen</b> (create, read, update, delete).
      </template>
    </NuxtLayout>
  </div>
</template>
