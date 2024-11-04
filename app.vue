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
  @apply min-h-screen bg-white-default font-league-spartan;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #fcfcfc;
}

::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb:hover {
  background: #888888;
}
</style>
