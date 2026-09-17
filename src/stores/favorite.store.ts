import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { Product } from "@/types/Product";

const FAVORITES_STORAGE_KEY = "pinky_favorites";

export const useFavoriteStore = defineStore("favorite", () => {
  // Safe initial state loading from localStorage
  const loadFavorites = (): Product[] => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage:", e);
      return [];
    }
  };

  const favoriteItems = ref<Product[]>(loadFavorites());

  // Automatically sync updates to localStorage
  watch(
    favoriteItems,
    (newItems) => {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newItems));
    },
    { deep: true },
  );

  // Check if a product is in favorites
  const isFavorite = (productId: string | number): boolean => {
    return favoriteItems.value.some((item) => item.id === productId);
  };

  // Toggle item in/out of favorites
  const toggleFavorite = (product: Product) => {
    const index = favoriteItems.value.findIndex(
      (item) => item.id === product.id,
    );
    if (index > -1) {
      favoriteItems.value.splice(index, 1);
    } else {
      favoriteItems.value.push(product);
    }
  };

  // Remove a product directly by ID
  const removeFavorite = (productId: string | number) => {
    favoriteItems.value = favoriteItems.value.filter(
      (item) => item.id !== productId,
    );
  };

  // Clear all favorites
  const clearFavorites = () => {
    favoriteItems.value = [];
  };

  // Total count computed property
  const totalCount = computed(() => favoriteItems.value.length);

  return {
    favoriteItems,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    totalCount,
  };
});
