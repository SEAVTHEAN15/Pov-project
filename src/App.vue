<script setup lang="ts">
import Navbar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <div id="app-layout">
    <Navbar />

    <main class="main-content">
      <div class="page-container">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.page-container {
  max-width: 1300px;
  margin: 0 auto;
  /* padding: 2rem 1.5rem; */
  padding: 0px 0px 40px 0px;
}
</style>
