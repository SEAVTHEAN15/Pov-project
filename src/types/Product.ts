export type CategoryType = "eyes" | "lips" | "cheeks" | "face" | "others";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: CategoryType;
  subcategory: string;
  description?: string;
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
