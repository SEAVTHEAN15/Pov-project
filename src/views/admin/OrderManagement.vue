<script setup lang="ts">
import { ref, computed } from "vue";

export interface Order {
  id: string;
  customerName: string;
  itemsSummary: string;
  total: number;
  paymentMethod: "KHQR" | "Card" | "COD";
  status: "Pending" | "Completed" | "Cancelled";
  date: string;
}

const searchQuery = ref("");
const statusFilter = ref<string>("All");

const orders = ref<Order[]>([
  {
    id: "ORD-9281",
    customerName: "Sokha Chan",
    itemsSummary: "1x Classic Silk Dress",
    total: 49.99,
    paymentMethod: "KHQR",
    status: "Completed",
    date: "2026-03-30",
  },
  {
    id: "ORD-9282",
    customerName: "Bopha Rath",
    itemsSummary: "2x Casual Denim Jacket",
    total: 130.0,
    paymentMethod: "Card",
    status: "Pending",
    date: "2026-03-31",
  },
  {
    id: "ORD-9283",
    customerName: "Dara Heng",
    itemsSummary: "1x Rose Blush",
    total: 18.5,
    paymentMethod: "COD",
    status: "Cancelled",
    date: "2026-04-01",
  },
]);

// Computed filtered orders based on search and status
const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customerName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "All" || order.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});
</script>

<template>
  <div class="management-container">
    <div class="header-actions">
      <h2>Order Management</h2>

      <!-- Search & Filter Bar -->
      <div class="filter-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by ID or customer..."
          class="search-input"
        />
        <select v-model="statusFilter" class="filter-select">
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Method</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td class="order-id">{{ order.id }}</td>
            <td class="date-cell">{{ order.date }}</td>
            <td>{{ order.customerName }}</td>
            <td class="summary-cell">{{ order.itemsSummary }}</td>
            <td class="price">${{ order.total.toFixed(2) }}</td>
            <td>
              <span class="method-tag">{{ order.paymentMethod }}</span>
            </td>
            <td>
              <span
                :class="[
                  'status-badge',
                  order.status === 'Completed'
                    ? 'completed'
                    : order.status === 'Pending'
                      ? 'pending'
                      : 'cancelled',
                ]"
              >
                {{ order.status }}
              </span>
            </td>
            <td>
              <select v-model="order.status" class="status-select">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="8" class="empty-state">No matching orders found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.management-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-actions h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.filter-bar {
  display: flex;
  gap: 0.75rem;
}

.search-input,
.filter-select {
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  outline: none;
  font-size: 0.875rem;
}

.search-input {
  width: 220px;
}

.table-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eef2f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.data-table th {
  background-color: #fafafa;
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.order-id {
  font-weight: 700;
  color: #ff5b93;
}

.date-cell {
  font-size: 0.85rem;
  color: #64748b;
}

.summary-cell {
  font-size: 0.9rem;
  color: #444;
}

.price {
  font-weight: 600;
}

.method-tag {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.completed {
  background-color: #e6f9f0;
  color: #10b981;
}

.pending {
  background-color: #fef3c7;
  color: #d97706;
}

.cancelled {
  background-color: #fee2e2;
  color: #ef4444;
}

.status-select {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 0.85rem;
  background-color: #fff;
}

.empty-state {
  text-align: center;
  color: #94a3b8;
  padding: 2rem 1rem;
}
</style>
