import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { Product, CategoryType } from "@/types/Product";
import { dummyProducts } from "@/data/products";

const PRODUCTS_STORAGE_KEY = "pinky_products";

export const useProductStore = defineStore("product", () => {
  // Load products from localStorage or fallback to dummyProducts
  const loadProducts = (): Product[] => {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [...dummyProducts];
    } catch (e) {
      console.error("Failed to parse products from localStorage:", e);
      return [...dummyProducts];
    }
  };

  const products = ref<Product[]>(loadProducts());

  // Persist admin changes to localStorage
  watch(
    products,
    (newProducts) => {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(newProducts));
    },
    { deep: true },
  );

  // GETTERS
  const getProductById = computed(() => {
    return (id: string | number) =>
      products.value.find((p) => String(p.id) === String(id));
  });

  const getProductsByCategory = computed(() => {
    return (category: CategoryType) =>
      products.value.filter((p) => p.category === category);
  });

  const newArrivals = computed(() =>
    products.value.filter((p) => p.isNewArrival),
  );

  const bestSellers = computed(() =>
    products.value.filter((p) => p.isBestSeller),
  );

  const clearStockItems = computed(() =>
    products.value.filter((p) => p.isClearStock),
  );

  // ACTIONS

  // CREATE: Add new product
  const addProduct = (newProduct: Omit<Product, "id">) => {
    const createdProduct: Product = {
      ...newProduct,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    products.value.unshift(createdProduct);
  };

  // UPDATE: Edit existing product
  const updateProduct = (updatedProduct: Product) => {
    const index = products.value.findIndex(
      (p) => String(p.id) === String(updatedProduct.id),
    );
    if (index !== -1) {
      products.value[index] = { ...updatedProduct };
    }
  };

  // DELETE: Remove product by ID
  const deleteProduct = (id: string | number) => {
    products.value = products.value.filter((p) => String(p.id) !== String(id));
  };

  // RESET: Restore initial dummy data
  const resetToDefault = () => {
    products.value = [...dummyProducts];
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  };

  return {
    products,
    getProductById,
    getProductsByCategory,
    newArrivals,
    bestSellers,
    clearStockItems,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault,
  };
});
