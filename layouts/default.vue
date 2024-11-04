<script setup lang="ts">
import {SpeedInsights} from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights/>
  <div>
    <slot/>
  </div>
</template>
