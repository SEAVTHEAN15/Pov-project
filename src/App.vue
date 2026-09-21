<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/Footer.vue";

const route = useRoute();

// Hides navbar and footer whenever the current route path starts with "/admin"
const isAdminRoute = computed(() => route.path.startsWith("/admin"));
</script>

<template>
  <div id="app-layout">
    <!-- Navbar only shows if it's NOT an admin route -->
    <Navbar v-if="!isAdminRoute" />

    <main class="main-content">
      <div class="page-container">
        <RouterView />
      </div>
    </main>

    <!-- Footer only shows if it's NOT an admin route -->
    <Footer v-if="!isAdminRoute" />
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
  /* padding: 0px 0px 40px 0px; */
}
</style>
