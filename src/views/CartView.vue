<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useCartStore } from "@/stores/cart.store";
import { RouterLink, useRouter, useRoute } from "vue-router"; // 1. Import useRoute

const cartStore = useCartStore();
const router = useRouter();
const route = useRoute(); // 2. Initialize route

const showLoginModal = ref(false);

const handleCheckout = () => {
  const isAuthenticated = !!localStorage.getItem("user_token");

  if (!isAuthenticated) {
    showLoginModal.value = true;
  } else {
    router.push("/payment");
  }
};

const goToLogin = () => {
  showLoginModal.value = false;
  // 3. Use route.fullPath so it remembers the exact current page (cart, product page, etc.)
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
  <div class="cart-view">
    <h2>Shopping Cart</h2>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>There are no items in your cart yet!</p>
      <RouterLink to="/products" class="shop-btn"
        >Go to product page</RouterLink
      >
    </div>

    <div v-else class="cart-container">
      <div class="cart-items">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="cart-item"
        >
          <img
            :src="item.product.image"
            :alt="item.product.name"
            class="item-img"
          />

          <div class="item-details">
            <h4>{{ item.product.name }}</h4>
            <p class="item-price">${{ item.product.price.toFixed(2) }}</p>
          </div>

          <div class="quantity-controls">
            <button
              @click="cartStore.updateQuantity(item.product.id, -1)"
              :disabled="item.quantity <= 1"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.updateQuantity(item.product.id, 1)">
              +
            </button>
          </div>

          <div class="item-total">
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </div>

          <button
            class="remove-btn"
            aria-label="Remove item"
            @click="cartStore.removeFromCart(item.product.id)"
          >
            ✕
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Summary</h3>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ (cartStore.subtotal || 0).toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery:</span>
          <span>Free</span>
        </div>
        <hr />
        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ (cartStore.subtotal || 0).toFixed(2) }}</span>
        </div>

        <button class="checkout-btn" @click="handleCheckout">Checkout</button>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="showLoginModal"
        class="modal-backdrop"
        @click.self="closeModal"
      >
        <div class="modal-card" role="dialog" aria-modal="true">
          <div class="modal-icon">🔒</div>
          <h3>Login Required</h3>
          <p>Please log in to your account before proceeding to checkout.</p>
          <div class="modal-actions">
            <button class="btn-secondary" @click="closeModal">Cancel</button>
            <button class="btn-primary" @click="goToLogin">Go to Login</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #f0e4e8;

  p {
    margin-bottom: 1rem;
    color: #666;
  }
}

.shop-btn,
.checkout-btn {
  background-color: #ff6fa3;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn:hover,
.shop-btn:hover {
  background-color: #e04a7e;
}

.cart-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #f0e4e8;
}

.item-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;

  h4 {
    font-size: 0.95rem;
    color: #222;
    margin: 0 0 0.25rem;
  }

  .item-price {
    color: #777;
    font-size: 0.85rem;
    margin: 0;
  }
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 28px;
    height: 28px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    border-radius: 50%;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover:not(:disabled) {
      background: #eee;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}

.item-total {
  font-weight: bold;
  min-width: 70px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    color: #ff4d4d;
  }
}

.cart-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #f0e4e8;
  height: fit-content;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #555;

  &.total {
    font-weight: bold;
    font-size: 1.1rem;
    color: #111;
    margin-top: 0.75rem;
  }
}

.checkout-btn {
  width: 100%;
  margin-top: 1rem;
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

  .modal-icon {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.25rem;
    color: #222;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;

  button {
    flex: 1;
    padding: 0.65rem 1rem;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
  }

  .btn-secondary {
    background-color: #f0f0f0;
    color: #555;

    &:hover {
      background-color: #e2e2e2;
    }
  }

  .btn-primary {
    background-color: #ff6fa3;
    color: white;

    &:hover {
      background-color: #e04a7e;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .cart-container {
    grid-template-columns: 1fr;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    gap: 0.75rem;
  }

  .item-img {
    width: 60px;
    height: 60px;
  }

  .quantity-controls {
    grid-column: 2;
  }

  .item-total {
    grid-column: 3;
    text-align: right;
  }

  .remove-btn {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
  }
}
</style>
