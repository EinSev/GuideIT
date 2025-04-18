<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import NavDrawer from "~/components/NavDrawer.vue";

const config = useRuntimeConfig()
const title = ref("Mediendesign & Medienproduktionen | GuideIT");
const description = ref("Erfahre mehr über die Mediendesign & Medienproduktion-Spezialisierung an der HTL Rennweg. Lerne über Foto, Video, Gestaltung und mehr.");
const videoId = ref("ifkx0LSs6EY")

useSeoMeta({
  ogUrl: () => config.URL + "/medt/multi",
  ogType: "website",
  title,
  ogTitle: title.value,
  description,
  ogDescription: description.value,
  ogImageUrl: "/seo/multi.png",
  ogImageAlt: "Eine Illustration eines Videodrehes mit mehreren Personen.",
  ogVideoUrl: () => `https://www.youtube.com/embed/${videoId.value}`,
  ogVideoSecureUrl: () => `https://www.youtube.com/embed/${videoId.value}`,
  ogVideoAlt: "Ein Video über die Mediendesign & Medienproduktionen-Spezialisierung an der HTL Rennweg",
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
    class: 'border-l border-medt-mm-default w-1 py-3',
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
            class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-medt-mm-default !font-league-spartan !z-50 !shadow-medt-mm-200 !shadow-md"
            :pt="{ item: '!focus:bg-white !active:bg-white-default !bg-none', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-medt-default !z-50', itemLabel: '!text-black-default !text-lg group-hover:underline', itemLink: '!p-0 !py-1 !px-3' }" />
        </div>
        <NavDrawer />
      </template>
      <template #title><span class="text-medt-mm-default hyphens-auto leading-none">Mediendesign &
          Medienproduktionen</span></template>
      <template #video>
        <VideoIframe :embed-id="videoId" />
      </template>
      <template #content-1>Wenn du dich in der 3. Klasse für die Vertiefung
        <NuxtLink to="/medt" class="underline text-medt-default font-medium">Medientechnik</NuxtLink>
        ab der 4. Klasse entscheidest,
        hast du ebenfalls eine weitere wichtige Wahl zu tätigen: Deine spezielle Vertiefung in Web- &
        App-Entwicklung
        oder Mediendesign & Medienproduktionen. Solltest du dich für <b>Mediendesign & Medienproduktionen</b>
        interessieren, bist du hier genau richtig!
      </template>
      <template #content-2-header><span class="text-medt-mm-default ">Darum geht's!</span>
      </template>
      <template #content-2>In Mediendesign und Medienproduktionen lässt du deiner <b>Kreativität</b> freien Lauf.
        Die im
        Stamm-Unterricht erlernten theoretischen Grundlagen wendest du nun in größeren Projekten und Übungen an. Du
        tauchst in die Welt der <b>Foto- und Bildgestaltung</b> ein, produzierst <b>professionelle Videos</b> und
        kümmerst dich um
        <b>audiovisuelle Gestaltung</b>.
      </template>
      <template #content-2-illustration>
        <SvgoMedtMmSet class="w-[28rem] mt-10 lg:mt-0" :fontControlled="false" filled />
      </template>
      <template #content-3-illustration>
        <SvgoMedtMmIllustrate class="w-[20rem] mt-10" :fontControlled="false" filled />
      </template>
      <template #content-3>Auch die <b>Brandgestaltung und das Marketing von Multimedia-Produkten</b> fallen in
        diesen
        Bereich.
        Ein weiterer wichtiger Bestandteil ist die fachgemäße Handhabung der dazugehörigen Hardware. Der richtige
        <b>Umgang
          mit Kameras, Mikrofonen und Zubehör</b> aber auch der benötigten <b>Software wie Schnitt- und
          Fotobearbeitungsprogramme</b>
        sind wichtig, um aus deinen Ideen finale Endprodukte zu erstellen.
      </template>
      <template #content-4-header><span class="text-medt-mm-default">Mediendesign & Medienproduktionen in der Praxis
          erleben</span>
      </template>
      <template #content-4>Übungen aus dem Unterricht sind zum Beispiel die Gestaltung eines <b>Brandingbooks</b>,
        die
        <b>Aufnahme
          und Bearbeitung eines Songs</b> oder die Umsetzung einer ganzen <b>Videoproduktion</b> zu einem bestimmten
        Thema.

      </template>
    </NuxtLayout>
  </div>
</template>
