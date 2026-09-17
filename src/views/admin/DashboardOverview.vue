<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product.store";

const router = useRouter();
const productStore = useProductStore();

// Selected timeframe state
const selectedTimeframe = ref("Last 9 months");

// Dynamic Analytics computed from real product store
const stats = computed(() => ({
  totalRevenue: 1250.0,
  revenueGrowth: "12.5%",
  totalOrders: 42,
  ordersGrowth: "8.2%",
  productsListed: productStore.products.length,
  productsGrowth: "4.6%",
  pendingOrders: 5,
}));

// Bar Chart Data (Jan - Sep)
const salesChart = ref([
  { month: "Jan", amount: 42 },
  { month: "Feb", amount: 62 },
  { month: "Mar", amount: 50 },
  { month: "Apr", amount: 76 },
  { month: "May", amount: 68 },
  { month: "Jun", amount: 90 },
  { month: "Jul", amount: 82 },
  { month: "Aug", amount: 108 },
  { month: "Sep", amount: 118 },
]);

// Top Products derived directly from Pinia store
const topProducts = computed(() => {
  return productStore.products.slice(0, 4).map((p, idx) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    sold: 35 - idx * 5,
    image: p.image,
  }));
});

// Recent Orders List
const recentOrders = ref([
  {
    id: "#ORD-001",
    initial: "S",
    customer: "Serey",
    product: "Pink Glow Lipstick",
    amount: 25.0,
    status: "Completed",
  },
  {
    id: "#ORD-002",
    initial: "D",
    customer: "Dara",
    product: "Rose Blush",
    amount: 18.5,
    status: "Pending",
  },
  {
    id: "#ORD-003",
    initial: "S",
    customer: "Sokha",
    product: "Velvet Foundation",
    amount: 32.0,
    status: "Completed",
  },
  {
    id: "#ORD-004",
    initial: "L",
    customer: "Lina",
    product: "Soft Pink Eyeshadow",
    amount: 28.0,
    status: "Processing",
  },
  {
    id: "#ORD-005",
    initial: "M",
    customer: "Malis",
    product: "Glossy Lip Gloss",
    amount: 15.0,
    status: "Pending",
  },
]);
</script>

<template>
  <div class="dashboard-wrapper">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div>
        <h2>Dashboard</h2>
        <p>Welcome back! Here's what's happening with your store.</p>
      </div>
      <button class="add-product-btn" @click="router.push('/admin/products')">
        <span>+</span> Add Product
      </button>
    </div>

    <!-- Stat Cards Section -->
    <div class="stats-grid">
      <!-- Total Revenue -->
      <div class="stat-card">
        <div class="card-top">
          <div class="icon-box pink">$</div>
          <span class="badge badge-green">↑ {{ stats.revenueGrowth }}</span>
        </div>
        <span class="stat-label">Total Revenue</span>
        <h3 class="stat-value">${{ stats.totalRevenue.toFixed(2) }}</h3>
        <span class="stat-sub">Compared to last month</span>
      </div>

      <!-- Total Orders -->
      <div class="stat-card">
        <div class="card-top">
          <div class="icon-box purple">🛍️</div>
          <span class="badge badge-green">↑ {{ stats.ordersGrowth }}</span>
        </div>
        <span class="stat-label">Total Orders</span>
        <h3 class="stat-value">{{ stats.totalOrders }}</h3>
        <span class="stat-sub">Orders this month</span>
      </div>

      <!-- Products Listed -->
      <div class="stat-card">
        <div class="card-top">
          <div class="icon-box green">♡</div>
          <span class="badge badge-green">↑ {{ stats.productsGrowth }}</span>
        </div>
        <span class="stat-label">Products Listed</span>
        <h3 class="stat-value">{{ stats.productsListed }}</h3>
        <span class="stat-sub">Active products</span>
      </div>

      <!-- Pending Orders -->
      <div class="stat-card">
        <div class="card-top">
          <div class="icon-box yellow">!</div>
          <span class="badge badge-yellow">Attention</span>
        </div>
        <span class="stat-label">Pending Orders</span>
        <h3 class="stat-value text-pink">{{ stats.pendingOrders }}</h3>
        <span class="stat-sub">Need your attention</span>
      </div>
    </div>

    <!-- Middle Section: Sales Overview & Top Products -->
    <div class="middle-grid">
      <!-- Sales Overview Chart -->
      <div class="card chart-card">
        <div class="card-header">
          <div>
            <h3>Sales Overview</h3>
            <p>Your sales performance this year</p>
          </div>
          <select v-model="selectedTimeframe" class="time-select">
            <option>Last 9 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>

        <div class="chart-container">
          <!-- Y-Axis Labels -->
          <div class="y-axis">
            <span>$120</span>
            <span>$90</span>
            <span>$60</span>
            <span>$30</span>
            <span>$0</span>
          </div>

          <!-- Bar Chart Columns -->
          <div class="bars-wrapper">
            <div v-for="bar in salesChart" :key="bar.month" class="bar-column">
              <div
                class="bar"
                :style="{ height: (bar.amount / 120) * 100 + '%' }"
              ></div>
              <span class="x-label">{{ bar.month }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products Panel -->
      <div class="card top-products-card">
        <div class="card-header">
          <div>
            <h3>Top Products</h3>
            <p>Best selling products</p>
          </div>
          <button class="text-link" @click="router.push('/admin/products')">
            View All
          </button>
        </div>

        <ul class="top-list">
          <li
            v-for="(prod, idx) in topProducts"
            :key="prod.id"
            class="top-item"
          >
            <span class="rank-num">{{ idx + 1 }}</span>
            <div class="prod-thumb-bg">
              <img :src="prod.image" :alt="prod.name" />
            </div>
            <div class="prod-details">
              <h4>{{ prod.name }}</h4>
              <p class="category-tag">{{ prod.category }}</p>
            </div>
            <div class="prod-sales-num">
              <strong>{{ prod.sold }}</strong>
              <small>sold</small>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Section: Recent Orders Table -->
    <div class="card recent-orders-card">
      <div class="card-header">
        <div>
          <h3>Recent Orders</h3>
          <p>Latest customer orders</p>
        </div>
        <button class="text-link" @click="router.push('/admin/orders')">
          View All Orders
        </button>
      </div>

      <table class="orders-table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>PRODUCT</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.id">
            <td class="order-id">{{ order.id }}</td>
            <td>
              <div class="customer-cell">
                <span class="avatar-circle">{{ order.initial }}</span>
                <span>{{ order.customer }}</span>
              </div>
            </td>
            <td class="product-cell">{{ order.product }}</td>
            <td class="amount-cell">${{ order.amount.toFixed(2) }}</td>
            <td>
              <span :class="['status-pill', order.status.toLowerCase()]">
                {{ order.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  color: #334155;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.dashboard-header p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0.2rem 0 0 0;
}

.add-product-btn {
  background-color: #f4588e;
  color: #ffffff;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition:
    transform 0.1s ease,
    background-color 0.2s ease;
}

.add-product-btn:hover {
  background-color: #e0447b;
}

/* Stat Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.icon-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.icon-box.pink {
  background-color: #fde8ef;
  color: #f4588e;
}
.icon-box.purple {
  background-color: #f3e8ff;
  color: #a855f7;
}
.icon-box.green {
  background-color: #e6f4ea;
  color: #34a853;
}
.icon-box.yellow {
  background-color: #fef3c7;
  color: #d97706;
}

.badge {
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
}

.badge-green {
  background-color: #e6f7ed;
  color: #10b981;
}
.badge-yellow {
  background-color: #fef3c7;
  color: #d97706;
}

.stat-label {
  font-size: 0.8rem;
  color: #64748b;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0.2rem 0;
}

.stat-value.text-pink {
  color: #f4588e;
}

.stat-sub {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* Base Cards */
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.card-header p {
  font-size: 0.82rem;
  color: #94a3b8;
  margin: 0.2rem 0 0 0;
}

.text-link {
  background: none;
  border: none;
  color: #f4588e;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}

/* Middle Layout */
.middle-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.25rem;
}

.time-select {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  color: #475569;
  background-color: #ffffff;
  outline: none;
}

/* Bar Chart */
.chart-container {
  display: flex;
  gap: 1rem;
  height: 220px;
  padding-top: 1rem;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.72rem;
  color: #94a3b8;
  padding-bottom: 1.5rem;
}

.bars-wrapper {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px dashed #e2e8f0;
  padding-bottom: 0.2rem;
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  gap: 0.5rem;
  flex: 1;
}

.bar {
  width: 32px;
  background-color: #ff6b9d;
  border-radius: 6px 6px 0 0;
  transition: height 0.3s ease;
}

.x-label {
  font-size: 0.72rem;
  color: #94a3b8;
}

/* Top Products Panel */
.top-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.top-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.rank-num {
  font-size: 0.82rem;
  color: #94a3b8;
  width: 12px;
}

.prod-thumb-bg {
  width: 42px;
  height: 42px;
  background-color: #fde8ef;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.prod-thumb-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prod-details {
  flex: 1;
}

.prod-details h4 {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.category-tag {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0.1rem 0 0 0;
  text-transform: capitalize;
}

.prod-sales-num {
  text-align: right;
  display: flex;
  flex-direction: column;
}

.prod-sales-num strong {
  font-size: 0.9rem;
  color: #0f172a;
}

.prod-sales-num small {
  font-size: 0.7rem;
  color: #94a3b8;
}

/* Table Section */
.orders-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.orders-table th {
  font-size: 0.72rem;
  color: #94a3b8;
  letter-spacing: 0.05em;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.orders-table td {
  padding: 0.9rem 0.5rem;
  border-bottom: 1px solid #f8fafc;
  font-size: 0.88rem;
}

.order-id {
  font-weight: 700;
  color: #0f172a;
}

.customer-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  color: #334155;
}

.avatar-circle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #fde8ef;
  color: #f4588e;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-cell {
  color: #64748b;
}

.amount-cell {
  font-weight: 700;
  color: #0f172a;
}

/* Status Pills */
.status-pill {
  padding: 0.25rem 0.7rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-block;
  text-transform: capitalize;
}

.status-pill.completed {
  background-color: #dcfce7;
  color: #15803d;
}
.status-pill.pending {
  background-color: #fef3c7;
  color: #d97706;
}
.status-pill.processing {
  background-color: #f3e8ff;
  color: #7e22ce;
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .middle-grid {
    grid-template-columns: 1fr;
  }
}
</style>
