<script setup lang="ts">

</script>

<template>
  <div class="mt-5 md:mx-48 leading-8">
    <div class="flex justify-end lg:justify-center w-full mr-5 md:mr-10 lg:mr-0">
      <slot name="nav"/>
    </div>
    <div class="mt-8">
      <slot name="title"/>
    </div>
    <div id="video" class="w-full px-[10vw] md:px-[14vw] lg:px-[20vw] xl:px-[20vw] mt-10">
      <slot name="video"/>
    </div>
    <div class="text-text mt-8">
      <p>
        <slot name="content-1"/>
      </p>
    </div>
    <div class="mt-8 mb-2">
      <slot name="content-2-header"/>
    </div>
    <div class="mt-2 text-text flex">
      <p class="w-1/2">
        <slot name="content-2"/>
      </p>
      <div class="-mt-20 flex w-1/2 justify-end">
        <slot name="content-2-illustration"/>
      </div>
    </div>
    <div class="mt-2 text-text flex">
      <div class="-mt-14">
        <slot name="content-3-illustration"/>
      </div>
      <p class="ml-20 my-auto">
        <slot name="content-3"/>
      </p>
    </div>
    <div class="mt-10 mb-2">
      <slot name="content-4-header"/>
    </div>
    <div class="mt-2 text-text flex">
      <div>
        <p class="">
          <slot name="content-4"/>
        </p>
      </div>
      <div class="-mt-24">
        <slot name="content-4-illustration"/>
      </div>
    </div>
    <div id="quiz"
         class="w-full mt-11 sm:mt-10 flex flex-col justify-center">
      <div class="border-2 border-guideit-default bg-guideit-100 px-4 py-2 rounded-xl shadow-guideit-200 shadow-md">
        <h2 class="text-guideit-800 text-sub-heading text-center">DAS QUIZ</h2>
        <p class="text-center text-text">Finde jetzt heraus, welche Fachrichtung am besten zu dir passt!</p>
        <div class="flex justify-center mb-2">
          <button
              class="mt-4 bg-guideit-50 px-7 py-2 text-text rounded-lg border-2 border-guideit-400 hover:bg-guideit-default hover:border-guideit-400 hover:text-guideit-50 text-guideit-800">
            <NuxtLink to="/quiz">Quiz starten!</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="flex text-black-300 mt-5 justify-between px-2 items-end">
    <NuxtLink to="/impressum" class="text-black-600 ml-2 mb-1">Impressum</NuxtLink>
    <NuxtLink to="https://www.htlrennweg.at" rel="noopener noreferrer"
              class="w-20 lg:w-32" target="_blank"
              external><img src="/assets/img/htl3r_logo_slogan_transparent.png" alt="Logo der HTL Rennweg"/>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>