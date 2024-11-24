<script setup>
import {SpeedInsights} from '@vercel/speed-insights/vue';

useHead({
  title: "GuideIT",
  htmlAttrs: {
    lang: 'de'
  },
  meta: [{
    name: 'description',
    content: "Die Entscheidungshilfe der HTL Rennweg"
  }]
})
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-x-hidden bg-white-default text-black-default">
    <SpeedInsights/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <ScrollTop :pt="{root: '!bg-black-default !text-white-default !border-black-default !px-2 !py-1'}"/>
  </div>
</template>

<style>

body {
  @apply min-h-screen bg-white-default text-black-default font-league-spartan;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-black-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-black-400 rounded-2xl;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-black-500;
}

::-moz-selection {
  @apply bg-guideit-default;
}

::selection {
  @apply bg-guideit-default;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
