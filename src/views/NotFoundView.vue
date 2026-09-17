<!-- src/views/NotFoundView.vue -->
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
  >
    <h1 class="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-2">
      404
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
      Oops! The page you are looking for does not exist.
    </p>
    <RouterLink
      to="/"
      class="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
    >
      Back to Home
    </RouterLink>
  </div>
</template>
