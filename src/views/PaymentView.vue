<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart.store";
import { useNotificationStore } from "@/stores/notification.store";

const router = useRouter();
const cartStore = useCartStore();
const notificationStore = useNotificationStore();

const selectedPayment = ref<"khqr" | "card" | "cod">("khqr");
const isProcessing = ref(false);
const showSuccessModal = ref(false); // Controls the custom success modal

// គណនាតម្លៃសរុប (ករណី store គ្មាន totalAmount getter)
const grandTotal = computed(() => {
  if ("totalAmount" in cartStore) {
    return (cartStore as any).totalAmount;
  }
  return cartStore.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
});

// សម្អាត Cart (ករណី store គ្មាន clearCart action)
const clearCartItems = () => {
  if (typeof cartStore.clearCart === "function") {
    cartStore.clearCart();
  } else {
    cartStore.items = [];
  }
};

const handlePayment = () => {
  isProcessing.value = true;

  // បញ្ជូន Simulate Payment Process
  setTimeout(() => {
    // 1. បង្កើត Order details សង្ខេប
    const total = grandTotal.value.toFixed(2);
    const itemSummary = cartStore.items
      .map((item) => `${item.quantity}x ${item.product.name}`)
      .join(", ");

    // 2. SAVE ORDER TO LOCALSTORAGE FOR PROFILE PAGE
    const existingOrders = JSON.parse(
      localStorage.getItem("user_orders") || "[]",
    );
    const newOrder = {
      id: "ORD-" + Date.now(),
      date: new Date().toLocaleDateString(),
      items: [...cartStore.items],
      total: grandTotal.value,
      paymentMethod: selectedPayment.value,
      status: "Completed",
    };
    existingOrders.push(newOrder);
    localStorage.setItem("user_orders", JSON.stringify(existingOrders));

    // 3. បញ្ជូន notification ទៅកាន់ Bell Icon store
    notificationStore.addNotification(
      "Payment Successful! 🎉",
      `Paid $${total} for: ${itemSummary}`,
    );

    // 4. Stop loading and open modal instead of native alert
    isProcessing.value = false;
    showSuccessModal.value = true;
  }, 1500);
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  clearCartItems();
  router.push("/");
};
</script>

<template>
  <div class="payment-container">
    <h2 class="page-title">Checkout & Payment</h2>

    <div v-if="cartStore.items.length > 0" class="payment-content">
      <!-- Order Summary -->
      <div class="card-box">
        <h3 class="section-title">Order Summary</h3>
        <div class="items-list">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="summary-item"
          >
            <div class="item-info">
              <img
                :src="item.product.image"
                :alt="item.product.name"
                class="item-img"
              />
              <div>
                <p class="item-name">{{ item.product.name }}</p>
                <p class="item-qty">Qty: {{ item.quantity }}</p>
              </div>
            </div>
            <span class="item-price">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </span>
          </div>
        </div>

        <div class="divider"></div>

        <div class="total-row">
          <span>Total Amount:</span>
          <span class="total-price">${{ grandTotal.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="card-box margin-top">
        <h3 class="section-title">Select Payment Method</h3>

        <div class="payment-options">
          <label
            :class="['method-card', { active: selectedPayment === 'khqr' }]"
          >
            <input type="radio" v-model="selectedPayment" value="khqr" />
            <div class="method-info">
              <span class="method-name">KHQR / Bakong</span>
              <small>Scan to pay via any mobile banking app</small>
            </div>
          </label>

          <label
            :class="['method-card', { active: selectedPayment === 'card' }]"
          >
            <input type="radio" v-model="selectedPayment" value="card" />
            <div class="method-info">
              <span class="method-name">Credit / Debit Card</span>
              <small>Visa, Mastercard, UnionPay</small>
            </div>
          </label>

          <label
            :class="['method-card', { active: selectedPayment === 'cod' }]"
          >
            <input type="radio" v-model="selectedPayment" value="cod" />
            <div class="method-info">
              <span class="method-name">Cash on Delivery (COD)</span>
              <small>Pay with cash upon arrival</small>
            </div>
          </label>
        </div>

        <!-- Dynamic Content based on selection -->
        <div v-if="selectedPayment === 'khqr'" class="qr-container">
          <p class="qr-instruction">Scan with Bakong or any Banking App</p>
          <div class="qr-box">
            <img
              :src="'/images/products/my-bakong-qr.jpg'"
              alt="KHQR Code"
              class="real-qr-img"
            />
          </div>
        </div>

        <div v-else-if="selectedPayment === 'card'" class="card-inputs">
          <input
            type="text"
            placeholder="Card Number (0000 0000 0000 0000)"
            class="input-field"
          />
          <div class="inline-inputs">
            <input type="text" placeholder="MM/YY" class="input-field" />
            <input type="text" placeholder="CVV" class="input-field" />
          </div>
        </div>

        <button class="pay-btn" :disabled="isProcessing" @click="handlePayment">
          {{
            isProcessing
              ? "Processing Payment..."
              : `Pay $${grandTotal.toFixed(2)}`
          }}
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <h3>Your cart is empty</h3>
      <p>Please add items to your cart before proceeding to checkout.</p>
      <button class="back-btn" @click="router.push('/products')">
        Continue Shopping
      </button>
    </div>

    <!-- Custom Success Modal -->
    <Teleport to="body">
      <div v-if="showSuccessModal" class="modal-overlay">
        <div class="modal-card">
          <div class="success-icon">✓</div>
          <h3 class="modal-title">Payment Successful!</h3>
          <p class="modal-message">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
          <button class="modal-btn" @click="closeSuccessModal">
            Back to Home
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.payment-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.5rem;
  text-align: center;
}

.card-box {
  background: #ffffff;
  border: 1px solid #f0e4e8;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.margin-top {
  margin-top: 1.5rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.item-img {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
}

.item-name {
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0;
}

.item-qty {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.item-price {
  font-weight: 600;
  font-size: 0.95rem;
}

.divider {
  height: 1px;
  background-color: #eee;
  margin: 1rem 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 700;
}

.total-price {
  color: #ff5b93;
  font-size: 1.3rem;
}

/* Payment Options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.method-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.method-card.active {
  border-color: #ff5b93;
  background-color: #fff8fa;
}

.method-info {
  display: flex;
  flex-direction: column;
}

.method-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #111;
}

.method-info small {
  color: #777;
  font-size: 0.78rem;
}

/* QR Box */
.qr-container {
  text-align: center;
  margin: 1rem 0;
  padding: 1.25rem;
  background: #fafafa;
  border: 1px dashed #ff5b93;
  border-radius: 8px;
}

.qr-instruction {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.qr-box {
  display: flex;
  justify-content: center;
}

.real-qr-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  background-color: #ffffff;
}

/* Card Inputs */
.card-inputs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.inline-inputs {
  display: flex;
  gap: 0.75rem;
}

.input-field {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
}

.input-field:focus {
  border-color: #ff5b93;
}

/* Pay Button */
.pay-btn {
  width: 100%;
  background-color: #ff5b93;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
}

.pay-btn:hover {
  background-color: #e04a7e;
}

.pay-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #f0e4e8;
}

.empty-state h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  margin-bottom: 1.25rem;
}

.back-btn {
  background-color: #ff5b93;
  color: white;
  border: none;
  padding: 0.65rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

/* Custom Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.modal-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 380px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  animation: popIn 0.25s ease-out;
}

.success-icon {
  width: 56px;
  height: 56px;
  background-color: #e6f9f0;
  color: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0 auto 1rem auto;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.modal-message {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.modal-btn {
  width: 100%;
  background-color: #ff5b93;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.modal-btn:hover {
  background-color: #e04a7e;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
