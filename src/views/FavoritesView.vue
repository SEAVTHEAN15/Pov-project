<script setup lang="ts">
import { useFavoriteStore } from "@/stores/favorite.store";
import { useCartStore } from "@/stores/cart.store";

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

// Move item from Favorites to Cart
const moveToCart = (product: any) => {
  cartStore.addToCart(product);
  favoriteStore.toggleFavorite(product);
};
</script>

<template>
  <div class="favorites-container">
    <div class="header-section">
      <h1 class="page-title">My Wishlist</h1>
      <span class="item-count">{{ favoriteStore.totalCount }} Items</span>
    </div>

    <!-- Empty State -->
    <div v-if="favoriteStore.favoriteItems.length === 0" class="empty-state">
      <div class="heart-icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </div>
      <h2>Your wishlist is empty</h2>
      <p>
        Explore our makeup collection and save your favorite items for later!
      </p>
      <RouterLink to="/products" class="shop-btn">Continue Shopping</RouterLink>
    </div>

    <!-- Favorites Grid -->
    <div v-else class="products-grid">
      <div
        v-for="product in favoriteStore.favoriteItems"
        :key="product.id"
        class="product-card"
      >
        <button
          class="remove-btn"
          @click="favoriteStore.toggleFavorite(product)"
          title="Remove from favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="image-wrapper">
          <img :src="product.image || '/placeholder.png'" :alt="product.name" />
        </div>

        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">${{ product.price }}</p>

          <div class="card-actions">
            <button class="add-cart-btn" @click="moveToCart(product)">
              Move to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;
}

.header-section {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #fce8ef;
  padding-bottom: 1rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111;
}

.item-count {
  color: #666;
  font-size: 0.95rem;
}

/* Empty State Styling */
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  background: #fff0f5;
  border-radius: 16px;
  margin-top: 1rem;
}

.heart-icon-wrapper {
  color: #ff5b93;
  margin-bottom: 1rem;
}

.empty-state h2 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.shop-btn {
  display: inline-block;
  background-color: #ff5b93;
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;
}

.shop-btn:hover {
  background-color: #e0487d;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
}

.product-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f0e4e8;
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(255, 91, 147, 0.12);
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  color: #666;
  transition:
    color 0.2s,
    background 0.2s;
}

.remove-btn:hover {
  color: #ff5b93;
  background: #fff;
}

.image-wrapper {
  width: 100%;
  height: 200px;
  background-color: #fcfcfc;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff5b93;
  margin-bottom: 1rem;
}

.card-actions {
  margin-top: auto;
}

.add-cart-btn {
  width: 100%;
  background-color: #111;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-cart-btn:hover {
  background-color: #ff5b93;
}
</style>
