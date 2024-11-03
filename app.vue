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

