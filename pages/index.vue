<script setup lang="ts">

const items = ref([
  {
    label: 'Start',
    class: 'group',
    command: () => {navigateTo('/')}
  },
  {
    label: 'Quiz',
    class: 'group',
    command: () => {navigateTo('/quiz')}

  },
  {
    label: '',
    class: 'border-l border-primary-500 w-1 cursor-default hover:cursor-default',
  },
  {
    label: 'Netwerktechnik',
    class: 'group',
    command: () => {navigateTo('/nwt')}
  },
  {
    label: 'Medientechnik',
    items: [
      {
        label: 'Allgemein',
        class: 'group',
        command: () => {navigateTo('/medt')}
      },
      {
        label: 'Multimediale Produktionen',
        class: 'group',
        command: () => {navigateTo('/medt/multi')}
      },
      {
        label: 'Webtechnologien',
        class: 'group',
        command: () => {navigateTo('/medt/webt')}
      }]
  }
]);
</script>

<template>
  <div class="relative">
    <SvgoPathNwt class="h-[28rem] absolute left-[22rem] top-[11.5rem]" :filled="true" :fontControlled="false"/>
    <SvgoPathMedt class="h-[28rem] absolute right-[22rem] top-[11.5rem]" :filled="true" :fontControlled="false"/>
    <div class="flex flex-col justify-center items-center mt-5">
      <Menubar :model="items"
               class="!rounded-3xl !bg-white-default !py-1 !px-2 !border-primary !drop-shadow !font-league-spartan z-10"
               :pt="{ item: '!focus:bg-white-default !active:bg-white-default !bg-white-default', itemContent: '!focus:bg-white-default !active:bg-white-default !bg-white-default', submenu: '!focus:bg-white-default !active:bg-white-default !bg-white-default !group-hover:underline !border-medt-default', itemLabel: '!text-black-default group-hover:underline'}"/>
      <div class="relative z-0">
        <SvgoLogo class="w-96 mt-10 " :fontControlled="false"/>
        <span class="absolute left-[4.5rem] -bottom-4">Entscheidung leichtgemacht</span>
      </div>
      <div id="video" class="bg-black-100 w-[38rem] h-[21rem] mt-16 z-20"></div>
      <div class="flex flex-row justify-between w-full mt-10 px-[24rem]">
        <div class="bg-nwt-200 border-2 border-nwt drop-shadow-xl py-2 px-4 rounded-xl w-1/3">
          <h2 class="text-nwt-800 text-2xl text-center">NWT</h2>
          <p class="text-base">Aufbauend auf den bereits erworbenen Grundlagen der Netzwerktechnik erwarten dich ab der 4. Klasse viele spannende neue Themen.</p>
          <button
              class="mt-4 bg-nwt-50 px-7 py-2 rounded-lg border-2 border-nwt-default hover:bg-nwt-default hover:border-nwt-800 hover:text-nwt-100 text-nwt-800">
            <NuxtLink to="/nwt">Erfahre mehr darüber</NuxtLink>
          </button>

        </div>
        <div class="bg-medt-200 border-2 border-medt drop-shadow py-2 px-4 rounded-xl w-1/3">
          <h2 class="text-medt-800 text-2xl text-center">MEDT</h2>
          <p>Für die Vertiefung Medientechnik kannst du in der 3. Klasse wählen, in welchem Bereich du dich ab der 4. Klasse spezialisieren willst.</p>
          <div class="flex justify-center">
            <button
                class="mt-4 bg-medt-50 px-7 py-2 rounded-lg border-2 border-medt-default hover:bg-medt-default hover:border-medt-800 hover:text-medt-100 text-medt-800">
              <NuxtLink to="/medt">Erfahre mehr darüber</NuxtLink>
            </button>
          </div>
        </div>
      </div>
      <div id="quiz" class="w-full px-[24rem] mt-16">
        <div class="border-2 border-primary bg-primary-100 px-4 py-2 rounded-xl">
          <h2 class="text-primary-800 text-xl text-center">Das Quiz</h2>
          <p class="text-center">Finde jetzt heraus, welche Fachrichtung am besten zu dir passt!</p>
          <div class="flex justify-center mb-2">
            <button
                class="mt-4 bg-primary-50 px-7 py-2 rounded-lg border-2 border-primary-default hover:bg-primary hover:border-primary-400 hover:text-primary-50 text-primary-800">
              <NuxtLink to="/quiz">Mache das Quiz</NuxtLink>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-6 text-black-300">
      <span class="">Ein ITP-Projekt der <NuxtLink to="https://www.htlrennweg.at" rel="noopener noreferrer" class="hover:text-black-default" target="_blank" external>HTL Rennweg</NuxtLink></span>
    </div>
  </div>
</template>

<style scoped>

</style>
