<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFavoriteStore } from "@/stores/favorite.store";
import { useCartStore } from "@/stores/cart.store";
import type { Product } from "@/types/Product";
import { dummyProducts } from "@/data/products";

const route = useRoute();
const router = useRouter();
const props = defineProps<{ id?: string }>();

// 1. ចាប់យក ID ចេញពី Router Params ឬ Props
const productId = computed(() => props.id || (route.params.id as string));

// 2. ស្វែងរក Product ដោយឆែក Case-Insensitive & Trim
const product = computed<Product | undefined>(() => {
  const currentId = String(productId.value || "")
    .trim()
    .toLowerCase();

  return dummyProducts.find(
    (p) => String(p.id).trim().toLowerCase() === currentId,
  );
});

// Function navigate back to previous page or fallback to products
const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/products");
  }
};

const quantity = ref(1);
const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

const increaseQty = () => quantity.value++;
const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--;
};

const handleAddToCart = () => {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(product.value);
    }
  }
};

// 3. បង្កើត Function សម្រាប់ Buy Now នាំទៅ Payment Page ភ្លាមៗ
const handleBuyNow = () => {
  if (product.value) {
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(product.value);
    }
    router.push("/payment");
  }
};
</script>

<template>
  <div v-if="product" class="product-detail-container">
    <!-- Back Arrow Button -->
    <button class="back-btn" @click="goBack" aria-label="Go back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>

    <div class="product-detail-wrapper">
      <div class="image-section">
        <img :src="product.image" :alt="product.name" class="main-image" />
      </div>

      <div class="info-section">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <div class="price-tag">${{ product.price.toFixed(2) }}</div>
        <div class="groups">
          <div class="quantity-wrapper">
            <label class="qty-label">Quantity</label>
            <div class="qty-controls">
              <button class="qty-btn" @click="decreaseQty">-</button>
              <span class="qty-value">{{ quantity }}</span>
              <button class="qty-btn" @click="increaseQty">+</button>
            </div>
          </div>
          <div class="fav-cart">
            <button
              class="fav-toggle-btn"
              @click="favoriteStore.toggleFavorite(product)"
              :title="favoriteStore.isFavorite(product.id) ? 'Remove' : 'Add'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                :fill="
                  favoriteStore.isFavorite(product.id) ? '#ff5b93' : 'none'
                "
                :stroke="
                  favoriteStore.isFavorite(product.id) ? '#ff5b93' : '#333'
                "
                stroke-width="2"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path>
              </svg>
            </button>
            <button
              class="fav-toggle-btn"
              @click="handleAddToCart"
              title="Add to Cart"
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
            </button>
          </div>
        </div>

        <div class="actions-group">
          <button class="buy-now-btn" @click="handleBuyNow">Buy Now</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <h2>Product not found</h2>
  </div>
</template>

<style scoped>
.product-detail-container {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 3rem 1.5rem;
  border: 1px solid #94929250;
  box-shadow: 0px 0px 15px #eabfcd97;
  border-radius: 20px;
}

/* Back Button Styles */
.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: none;
  color: #333;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.back-btn:hover {
  background-color: #fff0f5;
  color: #f26597;
  transform: translateX(-3px);
}

.fav-cart {
  display: flex;
  gap: 10px;
}

.groups {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-detail-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  max-width: 100%;
  max-height: 420px;
  object-fit: contain;
}

.product-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.75rem;
}

.product-description {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.price-tag {
  font-size: 1.6rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.75rem;
}

.qty-label {
  display: block;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #111;
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.qty-btn {
  background: transparent;
  border: none;
  width: 45px;
  height: 45px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}

.qty-btn:hover {
  background-color: #e5e5e5;
}

.qty-value {
  padding: 0 1.25rem;
  font-weight: 600;
  font-size: 1rem;
}

.actions-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.buy-now-btn {
  flex-grow: 1;
  background-color: #f26597;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.buy-now-btn:hover {
  background-color: #e04a7e;
}

.fav-toggle-btn {
  width: 45px;
  height: 45px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.fav-toggle-btn:hover {
  border-color: #ff5b93;
  background-color: #fff8fa;
}

@media (max-width: 768px) {
  .product-detail-container {
    padding-top: 4rem;
  }

  .back-btn {
    top: 15px;
    left: 15px;
  }

  .product-detail-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
