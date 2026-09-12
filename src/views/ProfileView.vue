<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Active Tab State
const activeTab = ref("profile");

// State for Profile Information
const user = ref({
  name: "Sreypov Yeoung",
  email: "sreypovyeoung@gmail.com",
  phone: "+855 12 345 678",
  joinedDate: "October 2025",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sreypov",
  address: "Phnom Penh, Cambodia",
});

const isEditing = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Live Counts for Navbar-connected features
const wishlistCount = ref(0);
const cartCount = ref(0);

// State for Orders
const recentOrders = ref<
  Array<{ id: string; date: string; total: string; status: string }>
>([]);

// Helper function to dynamically check multiple potential storage keys
const getStorageItemCount = (keys: string[]): number => {
  for (const key of keys) {
    const rawData = localStorage.getItem(key);
    if (rawData) {
      try {
        const parsed = JSON.parse(rawData);
        if (Array.isArray(parsed)) return parsed.length;
        if (typeof parsed === "number") return parsed;
        if (
          parsed &&
          typeof parsed === "object" &&
          Array.isArray(parsed.items)
        ) {
          return parsed.items.length;
        }
      } catch (e) {
        console.error(`Error parsing localStorage key: ${key}`, e);
      }
    }
  }
  return 0;
};

// Load saved data and count items safely from local storage
onMounted(() => {
  const token = localStorage.getItem("user_token");
  if (!token) {
    router.push("/login");
    return;
  }

  // Load User Profile
  const savedUser = localStorage.getItem("user_profile");
  if (savedUser) {
    try {
      user.value = { ...user.value, ...JSON.parse(savedUser) };
    } catch (e) {
      console.error("Failed to parse user profile", e);
    }
  } else {
    const savedEmail = localStorage.getItem("user_email");
    if (savedEmail) user.value.email = savedEmail;
  }

  // Sync Wishlist Count dynamically across potential storage keys
  wishlistCount.value = getStorageItemCount([
    "wishlist",
    "wishlist_items",
    "wishlistItems",
    "pinky_wishlist",
    "favorites",
  ]);

  // Sync Cart Count dynamically across potential storage keys
  cartCount.value = getStorageItemCount([
    "cart",
    "cart_items",
    "cartItems",
    "pinky_cart",
    "shopping_cart",
  ]);

  // Sync Orders
  try {
    const rawOrders = localStorage.getItem("user_orders") || "[]";
    recentOrders.value = JSON.parse(rawOrders);
  } catch {
    recentOrders.value = [];
  }
});

// Trigger file input for avatar update
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        user.value.avatar = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};

// Save changes
const handleSave = () => {
  localStorage.setItem("user_profile", JSON.stringify(user.value));
  localStorage.setItem("user_email", user.value.email);
  isEditing.value = false;
  alert("Profile updated successfully!");
};

// Logout
const handleLogout = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_email");
  router.push("/login");
};
</script>

<template>
  <div class="profile-page">
    <div class="container">
      <!-- Breadcrumb / Header -->
      <div class="page-header">
        <h2>My Account</h2>
        <p>Manage your account settings, orders, and preferences.</p>
      </div>

      <div class="profile-layout">
        <!-- Sidebar Navigation -->
        <aside class="profile-sidebar">
          <div class="user-brief">
            <div class="avatar-wrapper">
              <img :src="user.avatar" :alt="user.name" class="avatar" />
              <button
                class="change-avatar-btn"
                @click="triggerFileInput"
                title="Change Picture"
              >
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
          </div>

          <nav class="tab-menu">
            <button
              :class="['tab-btn', { active: activeTab === 'profile' }]"
              @click="activeTab = 'profile'"
            >
              <span>👤</span> Personal Details
            </button>
            <button
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
          <!-- Metric Stat Cards -->
          <div class="stats-row">
            <!-- Wishlist Card -->
            <div class="stat-card clickable" @click="router.push('/wishlist')">
              <div class="icon-header">
                <svg
                  class="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  />
                </svg>
              </div>
              <span class="stat-num">{{ wishlistCount }}</span>
              <span class="stat-label">Wishlist Items</span>
            </div>

            <!-- Cart Card -->
            <div class="stat-card clickable" @click="router.push('/cart')">
              <div class="icon-header">
                <svg
                  class="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span class="stat-num">{{ cartCount }}</span>
              <span class="stat-label">Cart Items</span>
            </div>

            <!-- Orders Card -->
            <div class="stat-card clickable" @click="activeTab = 'orders'">
              <div class="icon-header">
                <span class="emoji-icon">📦</span>
              </div>
              <span class="stat-num">{{ recentOrders.length }}</span>
              <span class="stat-label">Total Orders</span>
            </div>
          </div>

          <!-- TAB 1: Profile Details & Edit Form -->
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

            <!-- Display Mode -->
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

            <!-- Edit Mode -->
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

          <!-- TAB 2: Recent Orders -->
          <div v-if="activeTab === 'orders'" class="content-card">
            <div class="card-header">
              <h3>My Orders</h3>
            </div>
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in recentOrders" :key="order.id">
                  <td>
                    <strong>{{ order.id }}</strong>
                  </td>
                  <td>{{ order.date }}</td>
                  <td>{{ order.total }}</td>
                  <td>
                    <span :class="['status-badge', order.status.toLowerCase()]">
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- TAB 3: Saved Address -->
          <div v-if="activeTab === 'address'" class="content-card">
            <div class="card-header">
              <h3>Saved Shipping Address</h3>
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

.page-header {
  margin-bottom: 2rem;
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
}

/* Layout Grid */
.profile-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

/* Sidebar Styling */
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
  display: inline-block;
  margin-bottom: 0.75rem;
}

.avatar {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #fff0f5;
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
  font-size: 0.85rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.change-avatar-btn:hover {
  background-color: #fff0f5;
}

.hidden-input {
  display: none;
}

.user-brief h4 {
  margin: 0;
  font-size: 1.1rem;
  color: #111;
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
  transition: all 0.2s;
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
  border-radius: 0;
  padding-top: 1rem;
}

/* Main Content Area */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  box-shadow: 0px 4px 12px #eabfcd25;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.stat-card.clickable {
  cursor: pointer;
}

.stat-card.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 16px #eabfcd45;
}

.icon-header {
  margin-bottom: 0.25rem;
}

.nav-icon {
  width: 22px;
  height: 22px;
  stroke: #f26597;
}

.emoji-icon {
  font-size: 1.3rem;
}

.stat-num {
  font-size: 1.6rem;
  font-weight: 700;
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
  box-shadow: 0px 4px 15px #eabfcd30;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.card-header h3 {
  margin: 0;
  font-size: 1.15rem;
  color: #111;
}

.action-btn.edit {
  background-color: #f26597;
  color: white;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

.action-btn.edit:hover {
  background-color: #e04a7e;
}

/* Details List */
.profile-details {
  display: flex;
  flex-direction: column;
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
  font-size: 0.95rem;
}

/* Form Editing */
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

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}

.form-group input:focus {
  border-color: #f26597;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.save-btn {
  flex: 1;
  background-color: #f26597;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #e04a7e;
}

.cancel-btn {
  flex: 1;
  background-color: transparent;
  color: #666;
  border: 1px solid #ccc;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #f5f5f5;
}

/* Orders Table */
.orders-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

.orders-table th,
.orders-table td {
  padding: 0.85rem 0.5rem;
  border-bottom: 1px solid #f0e4e8;
}

.status-badge {
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.delivered {
  background: #e6fffa;
  color: #047857;
}

.status-badge.processing {
  background: #fffbe6;
  color: #d97706;
}

.status-badge.shipped {
  background: #eff6ff;
  color: #1d4ed8;
}

.address-box p {
  margin: 0.5rem 0;
  color: #444;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
}
</style>
