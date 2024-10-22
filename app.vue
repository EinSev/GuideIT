<script setup>
useHead({
  title: "GuideIT",
  meta: [{
    name: 'description',
    content: "Die Entscheidungshilfe der HTL Rennweg"
  }]
})
</script>

<template>
  <div class="flex h-screen flex-col font-league-spartan bg-background-default text-text-default">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

