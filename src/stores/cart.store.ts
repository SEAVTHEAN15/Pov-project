// import { defineStore } from "pinia";
// // import { Product, CartItem } from "@/types/Product";
// import type { Product, CartItem } from "@/types/Product";

// export const useCartStore = defineStore("cart", {
//   state: () => ({
//     items: [] as CartItem[],
//   }),
//   getters: {
//     totalCount: (state) =>
//       state.items.reduce((acc, item) => acc + item.quantity, 0),
//     totalPrice: (state) =>
//       state.items.reduce(
//         (acc, item) => acc + item.product.price * item.quantity,
//         0,
//       ),
//   },
//   actions: {
//     addItem(product: Product) {
//       const existing = this.items.find((i) => i.product.id === product.id);
//       if (existing) {
//         existing.quantity++;
//       } else {
//         this.items.push({ product, quantity: 1 });
//       }
//     },
//     removeItem(productId: string) {
//       this.items = this.items.filter((i) => i.product.id !== productId);
//     },
//     updateQuantity(productId: string, quantity: number) {
//       const item = this.items.find((i) => i.product.id === productId);
//       if (item) {
//         item.quantity = quantity;
//         if (item.quantity <= 0) this.removeItem(productId);
//       }
//     },
//   },
// });

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product, CartItem } from "@/types/Product";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  // បញ្ចូលទំនិញទៅក្នុងកន្ត្រក
  const addToCart = (product: Product) => {
    const existingItem = items.value.find((i) => i.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({ product, quantity: 1 });
    }
  };

  // កែប្រែចំនួនទំនិញ (+ ឬ -)
  const updateQuantity = (productId: string, delta: number) => {
    const item = items.value.find((i) => i.product.id === productId);
    if (item) {
      const newQty = item.quantity + delta;
      if (newQty > 0) {
        item.quantity = newQty;
      }
    }
  };

  // លុបទំនិញចេញពីកន្ត្រក
  const removeFromCart = (productId: string) => {
    items.value = items.value.filter((i) => i.product.id !== productId);
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
  // បន្ថែម function នេះ
  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalCount,
    subtotal,
    clearCart,
  };
});
