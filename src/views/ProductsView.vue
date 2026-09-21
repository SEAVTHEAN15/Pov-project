<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProductCard from "@/components/common/ProductCard.vue";
import { useProductStore } from "@/stores/product.store";
import type { CategoryType } from "@/types/Product";

const route = useRoute();
const productStore = useProductStore();

const selectedCategory = ref<string>("all");
const searchQuery = ref<string>("");

const categories: { id: CategoryType | "all"; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "eyes", label: "Eyes" },
  { id: "lips", label: "Lips" },
  { id: "cheeks", label: "Cheeks" },
  { id: "face", label: "Face" },
  { id: "others", label: "Others" },
];

// Sync searchQuery state with URL query parameters
const syncQueryFromRoute = () => {
  const queryParam = route.query.search as string;
  searchQuery.value = queryParam || "";
};

// Initial sync on component mount
onMounted(() => {
  syncQueryFromRoute();
});

// Reactively update search state whenever the URL route changes
watch(
  () => route.query.search,
  () => {
    syncQueryFromRoute();
  },
);

// Dynamically filter products directly from the Pinia store
const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      product.category === selectedCategory.value;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });
});
</script>

<template>
  <div class="products-view">
    <div class="products-banner">
      <!-- <img src="/public/images/products/product_banner.jpg" alt="" /> -->
      <!-- <h1>Our Products</h1>
      <p>Explore our wide range of cosmetics crafted for your daily look.</p> -->
    </div>

    <!-- Search & Filter Section -->
    <div class="controls-bar">
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['tab-btn', { active: selectedCategory === cat.id }]"
          @click="selectedCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
        />
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <p>No products match your search criteria.</p>
      <button
        class="reset-btn"
        @click="
          selectedCategory = 'all';
          searchQuery = '';
        "
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.products-view {
  padding: 0px 0px 50px 0px;
}

.products-banner {
  text-align: center;
  margin-bottom: 5rem;
  /* width: 100% ; */
  border-radius: 0px 0px 16px 16px;
  /* padding: 100px 0; */
  height: 380px;
  /* background-color: #ff6fa3; */
  background-image: url(/public/images/products/product_banner.jpg);
  background-position: center;
  background-size: cover;

  h1 {
    font-size: 2.2rem;
    color: #111;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
}

.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  border: 1px solid #e2e8f0;
  background-color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fdf2f7;
    border-color: #ff6fa3;
  }

  &.active {
    background-color: #ff6fa3;
    color: white;
    border-color: #ff6fa3;
  }
}

.search-box input {
  padding: 0.55rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  outline: none;
  width: 240px;
  font-size: 0.9rem;

  &:focus {
    border-color: #ff6fa3;
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  background-color: #fdf8fa;
  border-radius: 12px;

  p {
    color: #666;
    margin-bottom: 1rem;
  }
}

.reset-btn {
  background-color: #ff6fa3;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
}
</style>
