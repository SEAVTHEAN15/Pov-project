import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { Product, CartItem } from "@/types/Product";

const CART_STORAGE_KEY = "shopping_cart_items";

export const useCartStore = defineStore("cart", () => {
  // Load initial cart state from localStorage if available
  const initialItems = (): CartItem[] => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const items = ref<CartItem[]>(initialItems());

  // Watch and persist changes to localStorage
  watch(
    items,
    (newItems) => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    },
    { deep: true },
  );

  // បញ្ចូលទំនិញទៅក្នុងកន្ត្រក
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find((i) => i.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ product, quantity });
    }
  };

  // កែប្រែចំនួនទំនិញ (+ ឬ - តាម delta)
  const updateQuantity = (productId: string, delta: number) => {
    const item = items.value.find((i) => i.product.id === productId);
    if (item) {
      const newQty = item.quantity + delta;
      if (newQty > 0) {
        item.quantity = newQty;
      } else {
        removeFromCart(productId);
      }
    }
  };

  // កំណត់ចំនួនទំនិញដោយផ្ទាល់ (Direct Set)
  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const item = items.value.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };

  // លុបទំនិញចេញពីកន្ត្រក
  const removeFromCart = (productId: string) => {
    items.value = items.value.filter((i) => i.product.id !== productId);
  };

  // សម្អាតកន្ត្រកទាំងមូល
  const clearCart = () => {
    items.value = [];
  };

  // គណនាចំនួនទំនិញសរុប (បង្ហាញលើ Header)
  const totalCount = computed(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0);
  });

  // គណនាតម្លៃសរុប
  const subtotal = computed(() => {
    return items.value.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  });

  return {
    items,
    addToCart,
    updateQuantity,
    setQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    subtotal,
  };
});
