<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart.store";
import { useFavoriteStore } from "@/stores/favorite.store";
import { useNotificationStore } from "@/stores/notification.store";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const notificationStore = useNotificationStore();

const searchQuery = ref("");
const isMenuOpen = ref(false);
const isProfileDropdownOpen = ref(false);
const isNotificationDropdownOpen = ref(false);

// Auth & User States
const isLoggedIn = ref(false);
const userRole = ref("");
const userProfile = ref({
  name: "User",
  email: "",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tim",
});

// Computed Check for Admin Role
const isAdmin = computed(() => userRole.value === "admin");

// Check Authentication Status and Sync Profile Data
const checkAuth = () => {
  const token = localStorage.getItem("user_token");
  isLoggedIn.value = !!token;
  userRole.value = localStorage.getItem("user_role") || "";

  if (isLoggedIn.value) {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        userProfile.value = { ...userProfile.value, ...parsed };
      } catch (e) {
        console.error("Failed to parse user profile:", e);
      }
    } else {
      const savedEmail = localStorage.getItem("user_email");
      if (savedEmail) userProfile.value.email = savedEmail;
    }
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  isProfileDropdownOpen.value = false;
  isNotificationDropdownOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    isProfileDropdownOpen.value = false;
    isNotificationDropdownOpen.value = false;
  }
};

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
  if (isProfileDropdownOpen.value) {
    isNotificationDropdownOpen.value = false;
  }
};

const toggleNotificationDropdown = () => {
  isNotificationDropdownOpen.value = !isNotificationDropdownOpen.value;
  if (isNotificationDropdownOpen.value) {
    isProfileDropdownOpen.value = false;
    notificationStore.markAllAsRead();
  }
};

const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    router.push({ path: "/products", query: { search: query } });
    closeMenu();
  }
};

// Handle Logout
const handleLogout = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_role");
  userRole.value = "";
  isLoggedIn.value = false;
  closeMenu();
  router.push("/login");
};

// Close Dropdowns on Outside Click
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".profile-wrapper")) {
    isProfileDropdownOpen.value = false;
  }
  if (!target.closest(".notification-wrapper")) {
    isNotificationDropdownOpen.value = false;
  }
};

onMounted(() => {
  checkAuth();
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Reactively check auth state whenever route changes
watch(() => route.path, checkAuth);
</script>

<template>
  <header class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <RouterLink to="/" class="logo" @click="closeMenu">
        <div class="logo-circle">
          <img src="/images/products/logo.png" class="logo-img" alt="Logo" />
        </div>
      </RouterLink>

      <!-- Mobile Hamburger Button -->
      <button
        class="hamburger"
        @click="toggleMenu"
        aria-label="Toggle Navigation Menu"
      >
        <span :class="['bar', { open: isMenuOpen }]"></span>
        <span :class="['bar', { open: isMenuOpen }]"></span>
        <span :class="['bar', { open: isMenuOpen }]"></span>
      </button>

      <!-- Navigation Links -->
      <nav :class="['nav-links', { active: isMenuOpen }]">
        <RouterLink to="/" class="nav-item" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/products" class="nav-item" @click="closeMenu"
          >Products</RouterLink
        >
        <RouterLink to="/services" class="nav-item" @click="closeMenu"
          >Services</RouterLink
        >
        <RouterLink to="/contact" class="nav-item" @click="closeMenu"
          >Contact</RouterLink
        >
        <RouterLink to="/about" class="nav-item" @click="closeMenu"
          >About Us</RouterLink
        >
      </nav>

      <!-- Right Actions (Search & Icons) -->
      <div class="nav-actions">
        <form class="search-box" @submit.prevent="handleSearch">
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
          />
        </form>

        <div class="icons-group">
          <!-- Favorite / Wishlist Button -->
          <RouterLink
            to="/favorites"
            class="icon-btn fav-btn"
            aria-label="Favorites"
            @click="closeMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
            <span v-if="favoriteStore.totalCount > 0" class="badge">
              {{ favoriteStore.totalCount }}
            </span>
          </RouterLink>

          <!-- Cart Button -->
          <RouterLink
            to="/cart"
            class="icon-btn cart-btn"
            aria-label="Shopping Cart"
            @click="closeMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              ></path>
            </svg>
            <span v-if="cartStore.totalCount > 0" class="badge">
              {{ cartStore.totalCount }}
            </span>
          </RouterLink>

          <!-- Notification Bell Button Wrapper -->
          <div class="notification-wrapper">
            <button
              class="icon-btn notif-btn"
              aria-label="Notifications"
              @click.stop="toggleNotificationDropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span v-if="notificationStore.unreadCount > 0" class="badge">
                {{ notificationStore.unreadCount }}
              </span>
            </button>

            <!-- Notification Dropdown -->
            <div
              v-if="isNotificationDropdownOpen"
              class="notification-dropdown"
            >
              <div class="notif-header">
                <h4>Notifications</h4>
                <button
                  v-if="notificationStore.notifications.length > 0"
                  class="clear-all-btn"
                  @click.stop="notificationStore.clearAllNotifications"
                >
                  Clear All
                </button>
              </div>

              <div
                v-if="notificationStore.notifications.length === 0"
                class="empty-notifications"
              >
                No purchase activity yet.
              </div>

              <div v-else class="notif-list">
                <div
                  v-for="item in notificationStore.notifications"
                  :key="item.id"
                  class="notif-item"
                >
                  <div class="notif-content">
                    <div class="notif-title">{{ item.title }}</div>
                    <div class="notif-msg">{{ item.message }}</div>
                    <div class="notif-time">{{ item.date }}</div>
                  </div>

                  <button
                    class="delete-btn"
                    title="Delete notification"
                    @click.stop="notificationStore.removeNotification(item.id)"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Dropdown Menu -->
          <div class="profile-wrapper">
            <button
              class="icon-btn profile-trigger"
              aria-label="User Profile"
              @click.stop="toggleProfileDropdown"
            >
              <img
                v-if="isLoggedIn"
                :src="userProfile.avatar"
                :alt="userProfile.name"
                class="avatar-img"
              />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                />
              </svg>
            </button>

            <!-- Dropdown Card -->
            <div v-if="isProfileDropdownOpen" class="profile-dropdown">
              <template v-if="isLoggedIn">
                <div class="user-info">
                  <span class="user-name">{{ userProfile.name }}</span>
                  <span class="user-email" v-if="userProfile.email">{{
                    userProfile.email
                  }}</span>
                </div>
                <hr class="divider" />

                <RouterLink
                  v-if="isAdmin"
                  to="/admin/dashboard"
                  class="dropdown-item admin-link"
                  @click="closeMenu"
                >
                  ⚙️ Admin Dashboard
                </RouterLink>

                <RouterLink
                  to="/profile"
                  class="dropdown-item"
                  @click="closeMenu"
                >
                  My Profile
                </RouterLink>
                <button class="dropdown-item logout-link" @click="handleLogout">
                  Logout
                </button>
              </template>

              <template v-else>
                <RouterLink
                  to="/login"
                  class="dropdown-item"
                  @click="closeMenu"
                >
                  Login
                </RouterLink>
                <RouterLink
                  to="/register"
                  class="dropdown-item"
                  @click="closeMenu"
                >
                  Sign Up
                </RouterLink>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #f0e4e8;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.nav-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
}

.logo-circle {
  width: 70px;
  height: 70px;
}

.logo-circle .logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-item {
  text-decoration: none;
  color: #111111;
  font-size: 0.95rem;
  font-weight: 700;
  transition: color 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-exact-active {
  color: #ff5b93;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 15px;
  height: 15px;
  color: #888888;
}

.search-box input {
  padding: 0.45rem 1rem 0.45rem 2.2rem;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  outline: none;
  font-size: 0.85rem;
  width: 190px;
  color: #333;
  transition: border-color 0.2s;
}

.search-box input::placeholder {
  color: #aaa;
}

.search-box input:focus {
  border-color: #ff5b93;
  /* width: 200px; */
}

.icons-group {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.icon-btn {
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
  padding: 2px;
  transition: opacity 0.2s;
}

.icon-btn:hover {
  opacity: 0.7;
}

.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ff5b93;
}

.fav-btn .badge,
.cart-btn .badge,
.notif-btn .badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: #ff5b93;
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;
  min-width: 15px;
  text-align: center;
}

.notification-wrapper {
  position: relative;
  display: inline-block;
}

.notification-dropdown {
  position: absolute;
  right: 0;
  top: 130%;
  background-color: #ffffff;
  border: 1px solid #f0e4e8;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  width: 280px;
  z-index: 110;
  overflow: hidden;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0e4e8;
}

.notif-header h4 {
  margin: 0;
  font-size: 0.9rem;
  color: #111;
  font-weight: 700;
}

.clear-all-btn {
  background: none;
  border: none;
  color: #ff5b93;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.clear-all-btn:hover {
  text-decoration: underline;
}

.empty-notifications {
  padding: 1rem;
  font-size: 0.85rem;
  color: #888;
  text-align: center;
}

.notif-list {
  max-height: 250px;
  overflow-y: auto;
}

.notif-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f9f9f9;
  text-align: left;
  gap: 0.5rem;
}

.notif-item:last-child {
  border-bottom: none;
}

.notif-content {
  flex: 1;
}

.notif-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 2px;
}

.notif-msg {
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 4px;
}

.notif-time {
  font-size: 0.7rem;
  color: #aaa;
}

.delete-btn {
  background: none;
  border: none;
  color: #aaa;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 4px;
  transition: all 0.2s;
}

.delete-btn:hover {
  color: #ff4d4f;
  background-color: #fff1f0;
}

.profile-wrapper {
  position: relative;
  display: inline-block;
}

.profile-dropdown {
  position: absolute;
  right: 0;
  top: 130%;
  background-color: #ffffff;
  border: 1px solid #f0e4e8;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 170px;
  text-align: left;
  z-index: 110;
}

.user-info {
  display: flex;
  flex-direction: column;
  padding-bottom: 0.25rem;
}

.user-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: #111;
}

.user-email {
  font-size: 0.75rem;
  color: #777;
  word-break: break-all;
}

.divider {
  border: none;
  border-top: 1px solid #f0e4e8;
  margin: 0.2rem 0;
}

.dropdown-item {
  color: #111111;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
  padding: 6px 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s;
}

.dropdown-item:hover {
  color: #ff5b93;
}

.dropdown-item.admin-link {
  color: #ff5b93;
  font-weight: 700;
}

.dropdown-item.admin-link:hover {
  color: #e04a7e;
}

.logout-link {
  color: #e04a7e;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger .bar {
  width: 22px;
  height: 2px;
  background-color: #333;
  transition: transform 0.2s ease;
}

@media (max-width: 850px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    border-bottom: 1px solid #f0e4e8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .nav-links.active {
    display: flex;
  }

  .search-box input {
    width: 120px;
  }

  .search-box input:focus {
    width: 140px;
  }
}
</style>
