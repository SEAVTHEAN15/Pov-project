<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFavoriteStore } from "@/stores/favorite.store";
import { useCartStore } from "@/stores/cart.store";
import { useProductStore } from "@/stores/product.store";
import type { Product } from "@/types/Product";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const props = defineProps<{ id?: string }>();

const productId = computed(() => props.id || (route.params.id as string));

const product = computed<Product | undefined>(() => {
  const currentId = String(productId.value || "")
    .trim()
    .toLowerCase();

  return productStore.products.find(
    (p) => String(p.id).trim().toLowerCase() === currentId,
  );
});

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/products");
  }
};

const quantity = ref(1);
const activeTab = ref<"details" | "ingredients" | "howToUse">("details");
const activeShadeIndex = ref(0);
const showLoginModal = ref(false); // Controls the login required modal popup

// Dynamic shade options computed directly from the product object
const productShades = computed(() => {
  const p = product.value as any;
  if (p && Array.isArray(p.shades) && p.shades.length > 0) {
    return p.shades;
  }
  return [];
});

const favoriteStore = useFavoriteStore();
const cartStore = useCartStore();

const increaseQty = () => quantity.value++;
const decreaseQty = () => {
  if (quantity.value > 1) quantity.value--;
};

const handleAddToCart = () => {
  if (product.value) {
    const selectedShade = productShades.value[activeShadeIndex.value] || null;

    const productWithShade: Omit<Product, "price"> & {
      price: number;
      selectedShade: typeof selectedShade;
    } = {
      ...product.value,
      price: Number(product.value.price),
      selectedShade,
    };

    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(productWithShade as any);
    }
  }
};

// Check authentication before running Buy Now
const handleBuyNow = () => {
  const isAuthenticated = !!localStorage.getItem("user_token");

  if (!isAuthenticated) {
    showLoginModal.value = true;
  } else {
    executeBuyNow();
  }
};

const executeBuyNow = () => {
  if (product.value) {
    const selectedShade = productShades.value[activeShadeIndex.value] || null;

    const productWithShade: Omit<Product, "price"> & {
      price: number;
      selectedShade: typeof selectedShade;
    } = {
      ...product.value,
      price: Number(product.value.price),
      selectedShade,
    };

    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(productWithShade as any);
    }
    router.push("/payment");
  }
};

const goToLogin = () => {
  showLoginModal.value = false;
  // Passes the current dynamic product route so login redirects back here instead of home
  router.push({ path: "/login", query: { redirect: route.fullPath } });
};

const closeModal = () => {
  showLoginModal.value = false;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && showLoginModal.value) {
    closeModal();
  }
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <div v-if="product" class="product-detail-container">
    <button class="back-btn" @click="goBack" aria-label="Go back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
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
      <span>Back</span>
    </button>

    <div class="product-detail-wrapper">
      <!-- Left: Image Section & Badges -->
      <div class="image-section">
        <div class="image-frame">
          <img :src="product.image" :alt="product.name" class="main-image" />
          <button
            class="fav-toggle-floating"
            @click="favoriteStore.toggleFavorite(product)"
            :title="
              favoriteStore.isFavorite(product.id)
                ? 'Remove'
                : 'Add to Wishlist'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              :fill="favoriteStore.isFavorite(product.id) ? '#ff5b93' : 'none'"
              :stroke="
                favoriteStore.isFavorite(product.id) ? '#ff5b93' : '#666'
              "
              stroke-width="2"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Right: Detailed Product Info -->
      <div class="info-section">
        <div class="brand-badge">3CE STYLENANDA</div>
        <h1 class="product-title">{{ product.name }}</h1>

        <!-- Rating & Stock Header -->
        <div class="meta-row">
          <div class="rating-badge">
            <span class="stars">★★★★★</span>
            <span class="rating-score">4.9</span>
            <span class="review-count">(128 reviews)</span>
          </div>
          <span
            :class="[
              'stock-status',
              (product as any).isClearStock ? 'clearance' : 'in-stock',
            ]"
          >
            ●
            {{ (product as any).isClearStock ? "Clearance Stock" : "In Stock" }}
          </span>
        </div>

        <div class="price-row">
          <span class="price-tag">${{ Number(product.price).toFixed(2) }}</span>
          <span class="vat-info">Taxes included</span>
        </div>

        <p class="product-description">
          {{
            product.description ||
            "Enhance your features with a soft, natural contour palette designed to sculpt and define effortlessly."
          }}
        </p>

        <!-- Dynamic Shade Selector -->
        <div class="shade-selection" v-if="productShades.length > 0">
          <label class="section-label">
            Shade:
            <span>{{
              productShades[activeShadeIndex]?.name
                ? `#${productShades[activeShadeIndex].id} ${productShades[activeShadeIndex].name}`
                : ""
            }}</span>
          </label>
          <div class="shade-options">
            <button
              v-for="(shade, idx) in productShades"
              :key="idx"
              class="shade-btn"
              :class="{ active: activeShadeIndex === Number(idx) }"
              @click="activeShadeIndex = Number(idx)"
            >
              <span
                class="shade-color"
                :style="{ backgroundColor: shade.colorCode || '#c49a75' }"
              ></span>
              #{{ shade.id }} {{ shade.name }}
            </button>
          </div>
        </div>

        <!-- Quantity Controls -->
        <div class="quantity-section">
          <label class="section-label">Quantity</label>
          <div class="qty-controls">
            <button class="qty-btn" @click="decreaseQty">-</button>
            <span class="qty-value">{{ quantity }}</span>
            <button class="qty-btn" @click="increaseQty">+</button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="actions-group">
          <button class="add-cart-btn" @click="handleAddToCart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              ></path>
            </svg>
            Add to Cart
          </button>
          <button class="buy-now-btn" @click="handleBuyNow">Buy Now</button>
        </div>

        <!-- Trust Features -->
        <div class="trust-badges">
          <div class="trust-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span>Free Shipping Over $30</span>
          </div>
          <div class="trust-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>100% Authentic Product</span>
          </div>
        </div>

        <!-- Accordion/Tab Information -->
        <div class="tab-section">
          <div class="tab-headers">
            <button
              :class="{ active: activeTab === 'details' }"
              @click="activeTab = 'details'"
            >
              Details
            </button>
            <button
              :class="{ active: activeTab === 'howToUse' }"
              @click="activeTab = 'howToUse'"
            >
              How to Use
            </button>
            <button
              :class="{ active: activeTab === 'ingredients' }"
              @click="activeTab = 'ingredients'"
            >
              Ingredients
            </button>
          </div>
          <div class="tab-content">
            <p v-if="activeTab === 'details'">
              {{
                product.description ||
                "Provides seamless blending with ultrafine powder particles. Dual shade spectrum allows for natural contouring and multi-dimensional highlighting."
              }}
            </p>
            <p v-if="activeTab === 'howToUse'">
              Apply moderate amount gently along the hairline, jawline, and
              sides of the nose bridge using a contour brush.
            </p>
            <p v-if="activeTab === 'ingredients'">
              Talc, Mica, Synthetic Fluorphlogopite, Titanium Dioxide, Magnesium
              Myristate, Silica, Dimethicone, Triethoxycaprylylsilane.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Required Modal Popup -->
    <Transition name="fade">
      <div
        v-if="showLoginModal"
        class="modal-backdrop"
        @click.self="closeModal"
      >
        <div class="modal-card" role="dialog" aria-modal="true">
          <div class="modal-icon">🔒</div>
          <h3>Login Required</h3>
          <p>
            Please log in to your account before proceeding with your purchase.
          </p>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeModal">Cancel</button>
            <button class="btn-primary" @click="goToLogin">Go to Login</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <div v-else class="not-found">
    <h2>Product not found</h2>
  </div>
</template>

<style scoped>
.product-detail-container {
  position: relative;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f3f3;
}

/* Back Button */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #666;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background-color: #fff0f5;
  color: #ee5b88;
}

.product-detail-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

/* Image Section */
.image-section {
  position: sticky;
  top: 2rem;
}

.image-frame {
  position: relative;
  background-color: #fafafa;
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f0f0f0;
}

.main-image {
  max-width: 100%;
  max-height: 420px;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.fav-toggle-floating {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.fav-toggle-floating:hover {
  transform: scale(1.08);
}

/* Info Section */
.brand-badge {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ee5b88;
  margin-bottom: 0.4rem;
}

.product-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  line-height: 1.25;
}

/* Meta Row (Rating & Stock) */
.meta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.rating-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
}

.stars {
  color: #ffb800;
}

.rating-score {
  font-weight: 700;
  color: #222;
}

.review-count {
  color: #888;
}

.stock-status {
  font-size: 0.82rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.in-stock {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.clearance {
  background-color: #fee2e2;
  color: #ef4444;
}

/* Price */
.price-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 1.25rem;
}

.price-tag {
  font-size: 1.8rem;
  font-weight: 800;
  color: #222;
}

.vat-info {
  font-size: 0.8rem;
  color: #999;
}

.product-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.75rem;
}

.section-label {
  display: block;
  font-weight: 700;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.6rem;
}

.section-label span {
  font-weight: 500;
  color: #666;
}

/* Shade Options */
.shade-selection {
  margin-bottom: 1.5rem;
}

.shade-options {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.shade-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shade-btn.active {
  border-color: #ee5b88;
  background-color: #fff0f5;
  font-weight: 600;
}

.shade-color {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Quantity Controls */
.quantity-section {
  margin-bottom: 1.75rem;
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  background: #f9f9f9;
  border: none;
  width: 38px;
  height: 38px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.qty-btn:hover {
  background-color: #eeeeee;
}

.qty-value {
  padding: 0 1.2rem;
  font-weight: 700;
  font-size: 0.95rem;
}

/* Action Buttons */
.actions-group {
  display: flex;
  gap: 12px;
  margin-bottom: 2rem;
}

.add-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #ffffff;
  color: #ee5b88;
  border: 2px solid #ee5b88;
  padding: 0.9rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-cart-btn:hover {
  background-color: #fff0f5;
}

.buy-now-btn {
  flex: 1;
  background-color: #ee5b88;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.buy-now-btn:hover {
  background-color: #d84875;
}

/* Trust Badges */
.trust-badges {
  display: flex;
  gap: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f0f0f0;
  margin-bottom: 2rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #666;
}

.trust-item svg {
  width: 18px;
  height: 18px;
  color: #ee5b88;
}

/* Tabs */
.tab-section {
  border-top: 1px solid #f0f0f0;
  padding-top: 1.5rem;
}

.tab-headers {
  display: flex;
  gap: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 1rem;
}

.tab-headers button {
  background: none;
  border: none;
  padding-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  position: relative;
}

.tab-headers button.active {
  color: #ee5b88;
}

.tab-headers button.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ee5b88;
}

.tab-content p {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.6;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.modal-card .modal-icon {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.modal-card h3 {
  font-size: 1.25rem;
  color: #222;
  margin-bottom: 0.5rem;
}

.modal-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.modal-actions button {
  flex: 1;
  padding: 0.65rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.modal-actions .btn-secondary {
  background-color: #f0f0f0;
  color: #555;
}

.modal-actions .btn-secondary:hover {
  background-color: #e2e2e2;
}

.modal-actions .btn-primary {
  background-color: #ff6fa3;
  color: white;
}

.modal-actions .btn-primary:hover {
  background-color: #e04a7e;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.not-found {
  text-align: center;
  padding: 4rem;
  color: #888;
}

@media (max-width: 900px) {
  .product-detail-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .image-section {
    position: static;
  }
}
</style>
