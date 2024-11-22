<script setup lang="ts">

</script>

<template>
  <div class="mt-5 mx-5 md:mx-48 leading-8">
    <div class="flex justify-between lg:justify-center w-full mr-5 md:mr-10 lg:mr-0">
      <SvgoLogo class="w-32" :fontControlled="false"/>
      <slot name="nav"/>
    </div>
    <div class="mt-8">
      <h1 class="text-heading-small md:text-heading font-semibold">
        <slot name="title"/>
      </h1>
    </div>
    <div id="video" class="w-full px-[2vw] md:px-[14vw] lg:px-[20vw] xl:px-[20vw] mt-10">
      <slot name="video"/>
    </div>
    <div class="text-text md:text-text mt-8">
      <p>
        <slot name="content-1"/>
      </p>
    </div>
    <div class="mt-8 mb-2">
      <h2 class="text-sub-heading-small md:text-sub-heading font-medium">
        <slot name="content-2-header"/>
      </h2>
    </div>
    <div class="mt-2 text-text md:flex">
      <p class="md:w-1/2">
        <slot name="content-2"/>
      </p>
      <div class="md:-mt-20 flex md:w-1/2 justify-center md:justify-end">
        <slot name="content-2-illustration"/>
      </div>
    </div>
    <div class="mt-5 md:mt-2 text-text flex flex-col md:flex-row">
      <div class="md:-mt-14 order-2 md:order-1">
        <slot name="content-3-illustration"/>
      </div>
      <p class="md:ml-20 my-auto order-1 md:order-2">
        <slot name="content-3"/>
      </p>
    </div>
    <div class="mt-10 mb-2">
      <h2 class="text-sub-heading-small md:text-sub-heading font-medium">
        <slot name="content-4-header"/>
      </h2>
    </div>
    <div class="mt-2 text-text flex flex-col md:flex-row">
        <p>
          <slot name="content-4"/>
        </p>
      <div class="md:-mt-24 flex justify-center md:block">
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