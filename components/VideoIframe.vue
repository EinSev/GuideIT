<script setup lang="ts">
    defineProps({
        embedId: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed/${embedId}`"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</template>
