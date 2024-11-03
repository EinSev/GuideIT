<script setup lang="ts">
import {SpeedInsights} from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights/>
  <div class="font-league-spartan bg-white-default text-black-default h-full">
    <slot/>
  </div>
</template>
