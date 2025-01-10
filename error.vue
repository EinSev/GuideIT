<script setup lang="ts">
import type {NuxtError} from '#app'

defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="mx-[5vw] lg:mx-[2vw] h-screen relative">
    <SvgoErrorFullScreenMobile class="hidden max-lg:block w-full absolute pointer-events-none" :fontControlled="false" filled/>
    <SvgoErrorFullScreen class="max-lg:hidden w-full absolute pointer-events-none" :fontControlled="false" filled/>

    <div class="flex w-full mt-5">
      <NuxtLink to="/" class="">
        <SvgoLogo class="w-32" :fontControlled="false"/>
      </NuxtLink>
    </div>
    <div class="mt-14 lg:mt-20 lg:ml-10 flex flex-col gap-y-5">
      <h1 class="text-guideit-default text-6xl lg:text-9xl font-bold">OOPS!</h1>
      <h2 class="font-medium text-2xl lg:text-3xl">
        {{ error?.statusCode === 404 ? 'Seite konnte nicht gefunden werden' : error?.statusMessage }} <span class="whitespace-nowrap">:(</span></h2>
      <h3 class="text-lg sm:text-xl lg:text-text lg:max-w-[35vw]">
        {{
          error?.statusCode === 404 ? 'Vielleicht wurde die falsche URL eingegeben oder die Seite existiert nicht.' : error?.cause
        }}</h3>
      <div class="lg:mt-6 lg:ml-20 max-lg:flex max-lg:justify-center">
        <NuxtLink to="/"
                  class="mt-4 bg-guideit-50 px-7 py-2 lg:py-3 text-text rounded-lg border-2 border-guideit-400 hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
          Gehe zurück zur Startseite
        </NuxtLink>
      </div>
    </div>
    <Svgo404 class="max-lg:w-full mt-16 lg:h-[50vh] xl:h-[60vh] lg:absolute lg:right-16 lg:bottom-10 z-20" :fontControlled="false" filled/>
  </div>
</template>
