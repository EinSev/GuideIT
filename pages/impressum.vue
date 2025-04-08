<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";

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
</script>

<template>
  <div class="flex flex-col h-screen mx-[5vw] sm:mx-[12vw] md:mx-[14vw] lg:mx-0">
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
    <div class="flex justify-center">
      <div class="flex flex-col">
        <h1 class="text-center text-heading">Impressum</h1>
        <p>Webseite dient als Entscheidungshilfe für die Wahl des Zweiges/der Spezialisierung an der HTL Rennweg.<br>
          Entstanden im Rahmen eines ITP-Projekts im Schuljahr 2024/25.</p>
        <p><span class="font-bold">Für den Inhalt verantwortlich:</span><br>Stefania Manastirska, Simone Prinz, Sophie
          Nemecek, Severin Rosner</p>
        <p><span class="font-bold">Kontakt:</span> guideit.htlrennweg@gmail.com</p>
        <p><span class="font-bold">Anschrift:</span> HTL Rennweg, Rennweg 89b, 1030 Wien</p>
      </div>
    </div>
  </div>
</template>
