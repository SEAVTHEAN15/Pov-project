<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useFavoriteStore } from "@/stores/favorite.store";
import { useCartStore } from "@/stores/cart.store";

const router = useRouter();
const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

// State for Admin Status
const userRole = ref("");
const isAdmin = computed(() => userRole.value === "admin");

// Active Tab State
const activeTab = ref("profile");

// User Profile Data
const user = ref({
  name: "User",
  email: "user@example.com",
  phone: "+855 12 345 678",
  joinedDate: "October 2025",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  address: "Phnom Penh, Cambodia",
});

// Admin Stats (Shown when isAdmin is true)
const adminStats = ref({
  totalRevenue: "$1,250.00",
  totalOrders: 42,
  pendingOrders: 5,
});

const isEditing = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Customer Live Counts linked to Pinia Stores with localStorage fallback
const wishlistCount = computed(() => {
  if (favoriteStore.favoriteItems && favoriteStore.favoriteItems.length > 0) {
    return favoriteStore.favoriteItems.length;
  }
  // Fallback check local storage if Pinia state is empty on load
  const raw =
    localStorage.getItem("wishlist") || localStorage.getItem("wishlist_items");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  }
  return 0;
});

const cartCount = computed(() => {
  if (cartStore.items && cartStore.items.length > 0) {
    return cartStore.items.reduce(
      (total: number, item: any) => total + (item.quantity || 1),
      0,
    );
  }
  // Fallback check local storage
  const raw =
    localStorage.getItem("cart") || localStorage.getItem("cart_items");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.reduce(
          (total: number, item: any) => total + (item.quantity || 1),
          0,
        );
      }
    } catch {
      return 0;
    }
  }
  return 0;
});

const recentOrders = ref<Array<any>>([]);

onMounted(() => {
  const token = localStorage.getItem("user_token");
  if (!token) {
    // router.push("/login");
    // return;
  }

  // Load User Role (Defaults to "user" instead of "admin")
  userRole.value = localStorage.getItem("user_role") || "user";

  // Load User Profile
  const savedUser = localStorage.getItem("user_profile");
  if (savedUser) {
    try {
      user.value = { ...user.value, ...JSON.parse(savedUser) };
    } catch (e) {
      console.error("Failed to parse user profile", e);
    }
  }

  // Load orders if regular user
  if (!isAdmin.value) {
    try {
      recentOrders.value = JSON.parse(
        localStorage.getItem("user_orders") || "[]",
      );
    } catch {
      recentOrders.value = [];
    }
  }
});

const triggerFileInput = () => fileInput.value?.click();

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) user.value.avatar = e.target.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
};

const handleSave = () => {
  localStorage.setItem("user_profile", JSON.stringify(user.value));
  isEditing.value = false;
};

const handleLogout = () => {
  localStorage.clear();
  router.push("/login");
};
</script>

<template>
  <div class="profile-page">
    <div class="container">
      <div class="page-header">
        <h2>My Account</h2>
        <p>Manage your account settings, preferences, and system access.</p>
      </div>

      <div class="profile-layout">
        <!-- Sidebar Navigation -->
        <aside class="profile-sidebar">
          <div class="user-brief">
            <div class="avatar-wrapper">
              <img :src="user.avatar" :alt="user.name" class="avatar" />
              <button class="change-avatar-btn" @click="triggerFileInput">
                📷
              </button>
              <input
                type="file"
                ref="fileInput"
                class="hidden-input"
                accept="image/*"
                @change="handleAvatarChange"
              />
            </div>

            <h4>{{ user.name }}</h4>
            <span class="user-email">{{ user.email }}</span>

            <!-- Admin Role Badge -->
            <span v-if="isAdmin" class="role-badge">ADMINISTRATOR</span>
          </div>

          <nav class="tab-menu">
            <button
              :class="['tab-btn', { active: activeTab === 'profile' }]"
              @click="activeTab = 'profile'"
            >
              <span>👤</span> Personal Details
            </button>
            <button
              v-if="!isAdmin"
              :class="['tab-btn', { active: activeTab === 'orders' }]"
              @click="activeTab = 'orders'"
            >
              <span>📦</span> My Orders
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'address' }]"
              @click="activeTab = 'address'"
            >
              <span>📍</span> Saved Address
            </button>
            <button class="tab-btn logout" @click="handleLogout">
              <span>🚪</span> Log Out
            </button>
          </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="profile-content">
          <!-- Admin Banner Access -->
          <div v-if="isAdmin" class="admin-banner">
            <div class="admin-banner-info">
              <span class="admin-icon">⚙️</span>
              <div>
                <h4>Administrator Access Enabled</h4>
                <p>
                  You have system-wide management permissions for products,
                  orders, and users.
                </p>
              </div>
            </div>
            <button class="admin-btn" @click="router.push('/admin/dashboard')">
              Go to Admin Dashboard →
            </button>
          </div>

          <!-- ADMIN STATS (Shown if Admin) -->
          <div v-if="isAdmin" class="stats-row">
            <div
              class="stat-card clickable"
              @click="router.push('/admin/dashboard')"
            >
              <span class="stat-num">{{ adminStats.totalRevenue }}</span>
              <span class="stat-label">Total Revenue</span>
            </div>
            <div
              class="stat-card clickable"
              @click="router.push('/admin/dashboard')"
            >
              <span class="stat-num">{{ adminStats.totalOrders }}</span>
              <span class="stat-label">Total Orders</span>
            </div>
            <div
              class="stat-card clickable"
              @click="router.push('/admin/dashboard')"
            >
              <span class="stat-num highlight-pink">{{
                adminStats.pendingOrders
              }}</span>
              <span class="stat-label">Pending Orders</span>
            </div>
          </div>

          <!-- CUSTOMER STATS (Shown if Regular User) -->
          <div v-else class="stats-row">
            <div class="stat-card clickable" @click="router.push('/favorites')">
              <span class="stat-num">{{ wishlistCount }}</span>
              <span class="stat-label">Wishlist Items</span>
            </div>
            <div class="stat-card clickable" @click="router.push('/cart')">
              <span class="stat-num">{{ cartCount }}</span>
              <span class="stat-label">Cart Items</span>
            </div>
            <div class="stat-card clickable" @click="activeTab = 'orders'">
              <span class="stat-num">{{ recentOrders.length }}</span>
              <span class="stat-label">Total Orders</span>
            </div>
          </div>

          <!-- TAB: Personal Details -->
          <div v-if="activeTab === 'profile'" class="content-card">
            <div class="card-header">
              <h3>Personal Information</h3>
              <button
                v-if="!isEditing"
                class="action-btn edit"
                @click="isEditing = true"
              >
                Edit Profile
              </button>
            </div>

            <div v-if="!isEditing" class="profile-details">
              <div class="detail-item">
                <span class="label">Full Name</span>
                <span class="value">{{ user.name }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Email Address</span>
                <span class="value">{{ user.email }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Phone Number</span>
                <span class="value">{{ user.phone }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Default Location</span>
                <span class="value">{{ user.address }}</span>
              </div>
            </div>

            <form v-else @submit.prevent="handleSave" class="edit-form">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" v-model="user.name" required />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" v-model="user.email" required />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="text" v-model="user.phone" required />
              </div>

              <div class="form-actions">
                <button type="submit" class="save-btn">Save Changes</button>
                <button
                  type="button"
                  class="cancel-btn"
                  @click="isEditing = false"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- TAB: My Orders -->
          <div v-if="activeTab === 'orders'" class="content-card">
            <div class="card-header">
              <h3>My Orders</h3>
            </div>
            <div v-if="recentOrders.length === 0" class="empty-state">
              <p>You haven't placed any orders yet.</p>
            </div>
            <div v-else class="orders-list">
              <p>Total Orders Placed: {{ recentOrders.length }}</p>
            </div>
          </div>

          <!-- TAB: Address -->
          <div v-if="activeTab === 'address'" class="content-card">
            <div class="card-header">
              <h3>Saved Address</h3>
            </div>
            <div class="address-box">
              <p><strong>Recipient:</strong> {{ user.name }}</p>
              <p><strong>Phone:</strong> {{ user.phone }}</p>
              <p><strong>Address:</strong> {{ user.address }}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding: 3rem 1.5rem;
  background-color: #fcf8fa;
  min-height: 85vh;
}

.container {
  max-width: 1050px;
  margin: 0 auto;
}

.page-header h2 {
  font-size: 1.8rem;
  margin: 0;
  color: #111;
}

.page-header p {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  margin-bottom: 2rem;
}

.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.profile-sidebar {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.75rem 1.25rem;
  border: 1px solid #94929230;
  box-shadow: 0px 4px 15px #eabfcd40;
  height: fit-content;
}

.user-brief {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #f2659720;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 0.75rem;
}

.avatar {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f26597;
}

.change-avatar-btn {
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden-input {
  display: none;
}

.role-badge {
  margin-top: 0.5rem;
  background-color: #1e293b;
  color: #38bdf8;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  letter-spacing: 0.05em;
}

.user-brief h4 {
  margin: 0;
  font-size: 1.1rem;
}

.user-email {
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.2rem;
}

.tab-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
  cursor: pointer;
  text-align: left;
}

.tab-btn:hover,
.tab-btn.active {
  background-color: #fff0f5;
  color: #f26597;
}

.tab-btn.logout {
  color: #e04a7e;
  margin-top: 1rem;
  border-top: 1px solid #f2659720;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.admin-banner {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #ffffff;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.admin-banner-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-icon {
  font-size: 1.8rem;
}

.admin-banner-info h4 {
  margin: 0;
  font-size: 1rem;
  color: #38bdf8;
}

.admin-banner-info p {
  margin: 0.2rem 0 0 0;
  font-size: 0.82rem;
  color: #94a3b8;
}

.admin-btn {
  background-color: #f26597;
  color: #ffffff;
  border: none;
  padding: 0.65rem 1.1rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  background: white;
  border-radius: 14px;
  padding: 1.25rem;
  border: 1px solid #94929230;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-card.clickable {
  cursor: pointer;
}

.stat-num {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a202c;
}

.stat-num.highlight-pink {
  color: #f26597;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.2rem;
}

.content-card {
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid #94929230;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.action-btn.edit {
  background-color: #f26597;
  color: white;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.85rem 0;
  border-bottom: 1px solid #f9f9f9;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  font-weight: 600;
  color: #222;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.save-btn {
  flex: 1;
  background-color: #f26597;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 700;
}

.cancel-btn {
  flex: 1;
  background: transparent;
  border: 1px solid #ccc;
  padding: 0.75rem;
  border-radius: 8px;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
}
</style>
