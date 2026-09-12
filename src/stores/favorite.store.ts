import { defineStore } from "pinia";

export interface Product {
  id: number | string;
  name: string;
  price: number;
  image?: string;
  [key: string]: any;
}

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    favoriteItems: JSON.parse(
      localStorage.getItem("pinky_favorites") || "[]",
    ) as Product[],
  }),

  getters: {
    totalCount: (state): number => state.favoriteItems.length,
    isFavorite: (state) => {
      return (productId: number | string): boolean =>
        state.favoriteItems.some((item) => item.id === productId);
    },
  },

  actions: {
    toggleFavorite(product: Product) {
      const index = this.favoriteItems.findIndex(
        (item) => item.id === product.id,
      );
      if (index > -1) {
        this.favoriteItems.splice(index, 1);
      } else {
        this.favoriteItems.push(product);
      }
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "pinky_favorites",
        JSON.stringify(this.favoriteItems),
      );
    },
  },
});
