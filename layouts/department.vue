<script setup lang="ts">

</script>

<template>
  <div class="mt-5 mx-[5vw] sm:mx-[12vw] md:mx-[14vw] leading-8">
    <div class="flex justify-between lg:justify-center w-full">
      <NuxtLink to="/" class="lg:hidden">
        <SvgoLogo class="w-32" :fontControlled="false"/>
      </NuxtLink>
      <slot name="nav"/>
    </div>
    <div class="mt-8 lg:mt-12">
      <h1 class="text-heading-small lg:text-heading lg:text-center font-semibold">
        <slot name="title"/>
      </h1>
    </div>
    <div id="video" class="w-full px-[2vw] md:px-[5vw] lg:px-[10vw] xl:px-[16vw] mt-10">
      <slot name="video"/>
    </div>
    <div class="text-text mt-10">
      <p>
        <slot name="content-1"/>
      </p>
    </div>
    <div class="mt-16 lg:mt-20 mb-2">
      <h2 class="text-sub-heading font-medium">
        <slot name="content-2-header"/>
      </h2>
    </div>
    <slot name="content-2-more-text"/>
    <slot name="content-2-more-text-illustration"/>
    <div class="mt-2 text-text lg:flex">
      <p class="lg:w-1/2">
        <slot name="content-2"/>
      </p>
      <div class="lg:-mt-20 flex lg:w-1/2 justify-center lg:justify-end">
        <slot name="content-2-illustration"/>
      </div>
    </div>
    <div class="mt-12 lg:mt-20 text-text flex flex-col lg:flex-row">
      <div class="mt-10 xl:-mt-14 order-2 lg:order-1 flex justify-center">
        <slot name="content-3-illustration"/>
      </div>
      <p class="lg:ml-20 my-auto order-1 lg:order-2">
        <slot name="content-3"/>
      </p>
    </div>
    <div class="mt-16 lg:mt-24 mb-2">
      <h2 class="text-sub-heading font-medium">
        <slot name="content-4-header"/>
      </h2>
    </div>
    <div class="mt-2 text-text flex flex-col lg:flex-row">
      <p>
        <slot name="content-4"/>
      </p>
      <div class="mt-10 xl:-mt-20 flex justify-center lg:block">
        <slot name="content-4-illustration"/>
      </div>
    </div>
    <div id="quiz"
         class="w-full mt-12 sm:mt-20 flex flex-col justify-center">
      <div class="border-2 border-guideit-default bg-guideit-100 px-4 py-2 rounded-xl shadow-guideit-200 shadow-md">
        <h2 class="text-guideit-800 text-sub-heading text-center mt-1.5 mb-2">DAS QUIZ</h2>
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
