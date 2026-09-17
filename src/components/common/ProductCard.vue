<script setup lang="ts">
import type { Product } from "@/types/Product";
import { useCartStore } from "@/stores/cart.store";
import { useFavoriteStore } from "@/stores/favorite.store";

defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
</script>

<template>
  <div class="product-card">
    <div class="image-wrapper">
      <RouterLink :to="`/product/${product.id}`">
        <img :src="product.image" :alt="product.name" class="product-img" />
      </RouterLink>
      <button
        class="like-btn"
        :class="{ liked: favoriteStore.isFavorite(product.id) }"
        @click="favoriteStore.toggleFavorite(product)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          :fill="favoriteStore.isFavorite(product.id) ? '#ff5b93' : 'none'"
          :stroke="favoriteStore.isFavorite(product.id) ? '#ff5b93' : '#666'"
          stroke-width="2"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </button>
    </div>

    <div class="product-details">
      <RouterLink :to="`/product/${product.id}`" class="product-name-link">
        <h4 class="product-name">{{ product.name }}</h4>
      </RouterLink>
      <div class="product-footer">
        <span class="price">${{ Number(product.price).toFixed(2) }}</span>
        <button class="add-btn" @click="cartStore.addToCart(product)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #f0e4e8;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 15px #bcbaba;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.product-card:hover {
  transform: scale(1.03);
  opacity: 0.85;
}

.image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-color: #fdf2f7;
}

.product-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.like-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.product-details {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}
.product-name-link {
  text-decoration: none;
}
.product-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #222;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-weight: bold;
  font-size: 0.9rem;
  color: #111;
}

.add-btn {
  background-color: #ff6fa3;
  color: white;
  border: none;
  padding: 0.35rem 0.65rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #e04a7e;
}
</style>
