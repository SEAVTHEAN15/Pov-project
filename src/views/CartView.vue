<script setup lang="ts">
import { useCartStore } from "@/stores/cart.store";
import { RouterLink, useRouter } from "vue-router";

// ភ្ជាប់ទៅ Pinia Cart Store & Router
const cartStore = useCartStore();
const router = useRouter();

const handleCheckout = () => {
  const isAuthenticated = !!localStorage.getItem("user_token");

  if (!isAuthenticated) {
    // ប្រសិនបើមិនទាន់ Login ត្រូវបញ្ជូនទៅ Login Page
    alert("Please login before purchasing!");
    router.push({ path: "/login", query: { redirect: "/cart" } });
  } else {
    // ប្រសិនបើ Login រួចហើយ ឱ្យទៅកាន់ទំព័រ Payment
    router.push("/payment");
  }
};
</script>

<template>
  <div class="cart-view">
    <h2>Shopping Cart</h2>

    <!-- បង្ហាញនៅពេលគ្មានទំនិញក្នុងកន្ត្រក -->
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>There are no items in your cart yet!</p>
      <RouterLink to="/products" class="shop-btn"
        >Go to product page</RouterLink
      >
    </div>

    <!-- បង្ហាញបញ្ជីទំនិញ និងសេចក្តីសង្ខេបនៃការទូទាត់ -->
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

          <!-- ប៊ូតុងកើន/បន្ថយចំនួន -->
          <div class="quantity-controls">
            <button @click="cartStore.updateQuantity(item.product.id, -1)">
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

          <!-- ប៊ូតុងលុបទំនិញ -->
          <button
            class="remove-btn"
            @click="cartStore.removeFromCart(item.product.id)"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- ប្រអប់គណនាតម្លៃសរុប (Cart Summary) -->
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

        <!-- ប៊ូតុង បន្តទៅការទូទាត់ -->
        <button class="checkout-btn" @click="handleCheckout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 1000px;
  margin: 0 auto;
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
  }

  .item-price {
    color: #777;
    font-size: 0.85rem;
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

    &:hover {
      background: #eee;
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

@media (max-width: 768px) {
  .cart-container {
    grid-template-columns: 1fr;
  }
}
</style>
