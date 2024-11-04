<script setup>
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
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
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

</style>
