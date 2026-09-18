export type CategoryType = "eyes" | "lips" | "cheeks" | "face" | "others";

// Define the structure for each individual shade
export interface Shade {
  id: string;
  name: string;
  colorCode: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: CategoryType;
  subcategory: string;
  description?: string;
  shades?: Shade[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isClearStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FavoriteItem {
  product: Product;
  addedAt?: string;
}

export type ProductSortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";
