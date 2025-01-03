<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="mx-[2vw] relative h-screen overflow-hidden">
    <SvgoErrorFullScreen class="w-full absolute pointer-events-none" :fontControlled="false" filled/>
    <Svgo404 class="h-[60vh] absolute right-16 bottom-10" :fontControlled="false" filled/>

    <div class="flex w-full mt-5">
      <NuxtLink to="/" class="">
        <SvgoLogo class="w-32" :fontControlled="false"/>
      </NuxtLink>
    </div>
    <div class="mt-20 ml-10 flex flex-col gap-y-5">
      <h1 class="text-guideit-default text-9xl font-bold">OOPS!</h1>
      <h2 class="font-medium text-3xl">
        {{ error?.statusCode === 404 ? 'Seite konnte nicht gefunden werden :(' : error?.statusMessage }}</h2>
      <h3 class="text-xl max-w-[35vw]">
        {{
          error?.statusCode === 404 ? 'Vielleicht wurde die falsche URL eingegeben oder die Seite existiert nicht.' : error?.cause
        }}</h3>
      <div class="mt-6 flex ml-20">
        <NuxtLink to="/"
                  class="mt-4 bg-guideit-50 px-7 py-2 text-text rounded-lg border-2 border-guideit-400 hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
          Gehe zurück zur Startseite
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
