<script setup lang="ts">
const visible = ref<boolean>(false);
</script>

<template>
  <div class="lg:hidden">
    <Drawer v-model:visible="visible" position="right"
            class="!bg-white-default !text-black-default !w-72 !font-league-spartan"
            :pt="{header: '!pl-0 !pb-0'}">
      <template #closeicon><i class="pi pi-angle-left !text-4xl !text-black-default"/></template>
      <div>
        <ul role="list" aria-label="Navigation"
            class="flex flex-col justify-end text-sub-heading-small text-end text-guideit-800">
          <li class="mb-2">
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li class="mb-2">
            <NuxtLink to="/quiz">Quiz</NuxtLink>
          </li>
          <li class="mb-2 text-nwt-default border-t-2 border-nwt-300 pt-2">
            <NuxtLink to="/nwt">Netzwerktechnik</NuxtLink>
          </li>
          <li class="mb-1 text-medt-default border-t-2 border-medt-300 pt-2 ">
            <NuxtLink to="/medt">Medientechnik</NuxtLink>
          </li>
          <li class="mb-1 text-text font-light text-wrap">
            <NuxtLink to="/medt/multi">Mediendesign & Medienproduktionen</NuxtLink>
          </li>
          <li class="text-text font-light">
            <NuxtLink to="/medt/web">Web- & App-Entwicklung</NuxtLink>
          </li>
        </ul>
      </div>
    </Drawer>
    <button @click="visible = true" aria-label="Sidebar öffnen" :aria-expanded="visible"><span
        class="pi pi-bars !text-3xl"></span></button>
  </div>
</template>
