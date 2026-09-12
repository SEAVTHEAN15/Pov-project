<script setup lang="ts">
defineProps<{
  title: string;
  bannerImage: string;
}>();
</script>

<template>
  <div class="hero-banner" :style="{ backgroundImage: `url(${bannerImage})` }">
    <div class="overlay-content">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<style scoped>
.hero-banner {
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
}
.overlay-content {
  position: absolute;
  bottom: 20px;
  left: 30px;
}
.overlay-content h1 {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #222;
  text-transform: uppercase;
}
</style>
