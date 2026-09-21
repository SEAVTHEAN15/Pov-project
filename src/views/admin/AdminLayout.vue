<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Dynamically display title based on current route metadata or name
const pageTitle = computed(() => {
  switch (route.name) {
    case "admin-products":
      return "Product Management";
    case "admin-orders":
      return "Order Management";
    default:
      return "Dashboard Overview";
  }
});

const handleLogout = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_role");
  router.push("/admin/login");
};
</script>

<template>
  <div class="admin-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-brand">
        <h2>Pinky Admin</h2>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-item">
          <span class="icon"
            ><i class="fa-solid fa-square-poll-vertical"></i
          ></span>
          Overview
        </router-link>
        <router-link to="/admin/products" class="nav-item">
          <span class="icon"><i class="fa-solid fa-box-open"></i></span>
          Products
        </router-link>
        <router-link to="/admin/orders" class="nav-item">
          <span class="icon"><i class="fa-solid fa-cubes"></i></span> Orders
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/" class="nav-item exit-btn">
          <span class="icon"><i class="fa-solid fa-arrow-left"></i></span> Back
          to Store
        </router-link>
        <button @click="handleLogout" class="logout-btn">
          <span class="icon"
            ><i class="fa-solid fa-arrow-right-from-bracket"></i
          ></span>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main">
      <header class="top-header">
        <h1>{{ pageTitle }}</h1>
        <div class="admin-profile">
          <div class="avatar">A</div>
          <span class="admin-name">Administrator</span>
        </div>
      </header>

      <div class="content-body">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #1e1e2d;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-brand {
  padding: 1.5rem;
  border-bottom: 1px solid #2d2d3f;
}

.sidebar-brand h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff5b93;
  margin: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.5rem;
  color: #a2a3b7;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #ffffff;
  background-color: #2b2b40;
  border-left: 4px solid #ff5b93;
}

.sidebar-footer {
  padding: 1rem 0;
  border-top: 1px solid #2d2d3f;
}

.exit-btn {
  color: #a2a3b7;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.5rem;
  background: transparent;
  border: none;
  color: #ff6b6b;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: rgba(255, 107, 107, 0.1);
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.top-header {
  background: #ffffff;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.top-header h1 {
  font-size: 1.35rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ff5b93;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.admin-name {
  font-weight: 500;
  color: #334155;
}

.content-body {
  padding: 2rem;
  flex: 1;
}

@media (max-width: 768px) {
  .admin-wrapper {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
</style>
