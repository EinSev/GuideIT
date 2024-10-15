<script setup lang="ts">
import {SpeedInsights} from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights/>
  <div class="font-league-spartan">
    <slot/>
  </div>
</template>