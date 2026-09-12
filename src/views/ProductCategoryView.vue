<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ProductCard from "@/components/common/ProductCard.vue";
import type { Product } from "@/types/Product";

const props = defineProps<{
  category?: string;
}>();

const route = useRoute();

// Active category resolved from props or route params
const activeCategory = computed(() => {
  const cat = props.category || (route.params.category as string) || "all";
  return cat.toLowerCase();
});

// Sample Product Catalog Data
const allProducts = ref<Product[]>([
  {
    id: "1",
    name: "3CE Contour Shading",
    price: 16.27,
    image: "/images/products/contour.jpg",
    category: "cheeks",
    subcategory: "Shading",
    isNewArrival: true,
  },
  {
    id: "2",
    name: "3CE Small Hand Mirror",
    price: 8.78,
    image: "/images/products/mirror.jpg",
    category: "others",
    subcategory: "Accessories",
    isNewArrival: true,
  },
  {
    id: "3",
    name: "3CE True Color Corrector",
    price: 16.95,
    image: "/images/products/corrector.jpg",
    category: "face",
    subcategory: "Concealer",
    isNewArrival: true,
  },
  {
    id: "4",
    name: "Full Coverage Concealer",
    price: 17.59,
    image: "/images/products/concealer.jpg",
    category: "face",
    subcategory: "Concealer",
    isNewArrival: true,
  },
  {
    id: "5",
    name: "3CE Blur Veil Powder",
    price: 17.62,
    image: "/images/products/veil.jpg",
    category: "face",
    subcategory: "Concealer",
    isNewArrival: true,
  },
  {
    id: "6",
    name: "3CE Bare Cover Cushion",
    price: 20.33,
    image: "/images/products/bareCover.jpg",
    category: "face",
    subcategory: "Concealer",
    isNewArrival: true,
  },
  {
    id: "7",
    name: "3CE Color Baker",
    price: 26.41,
    image: "/images/products/baker.jpg",
    category: "face",
    subcategory: "Concealer",
    isNewArrival: true,
  },
  {
    id: "8",
    name: "Kiko Highlighter Face Stick",
    price: 18.95,
    image: "/images/products/kikoHighlighter.jpg",
    category: "face",
    subcategory: "Concealer",
    isNewArrival: true,
  },
  {
    id: "9",
    name: "3CE Eyeshadow Palette",
    price: 42.66,
    image: "/images/products/palette.jpg",
    category: "eyes",
    subcategory: "Eyeshadow",
    isBestSeller: true,
  },
  {
    id: "10",
    name: "3CE Easy Brow Designing Pencil",
    price: 12.39,
    image: "/images/products/brow.jpg",
    category: "eyes",
    subcategory: "Eyebrow",
    isBestSeller: true,
  },
  {
    id: "11",
    name: "CCUK Gel Stroke Liquid Eyeliner",
    price: 6.0,
    image: "/images/products/eyeliner.jpg",
    category: "eyes",
    subcategory: "Eyeliner",
    isBestSeller: true,
  },
  {
    id: "12",
    name: "Large Lash Mascara",
    price: 16.0,
    image: "/images/products/mascara.jpg",
    category: "eyes",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "13",
    name: "[3CE X MUUT] Blur Water Tint",
    price: 12.85,
    image: "/images/products/blurWaterTint.jpg",
    category: "eyes",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "14",
    name: "Matte Colour Lipstick",
    price: 5.93,
    image: "/images/products/matteLipstick.jpg",
    category: "eyes",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "15",
    name: "3D Hydra Lipgloss",
    price: 17.57,
    image: "/images/products/hydraLipgloss.jpg",
    category: "eyes",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "16",
    name: "Glow Blush CheekTone",
    price: 18.0,
    image: "/images/products/glowBlush.jpg",
    category: "eyes",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "17",
    name: "3CE Fitting Mesh Cover Cushion",
    price: 28.43,
    image: "/images/products/cushion.jpg",
    category: "face",
    subcategory: "Cushion",
    isClearStock: true,
  },
  {
    id: "18",
    name: "3CE Makeup Fix Powder",
    price: 20.33,
    image: "/images/products/powder.jpg",
    category: "face",
    subcategory: "Powder",
    isClearStock: true,
  },
  {
    id: "19",
    name: "Skin Tone Concealer",
    price: 13.53,
    image: "/images/products/skintone-concealer.jpg",
    category: "face",
    subcategory: "Concealer",
    isClearStock: true,
  },
  {
    id: "20",
    name: "3CE Tone Up Tint",
    price: 15.59,
    image: "/images/products/tint.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "21",
    name: "Makeup Travel Bag",
    price: 5.0,
    image: "/images/products/travelBage.jpg",
    category: "others",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "22",
    name: "3CE Pouch Small",
    price: 6.72,
    image: "/images/products/pouchSmall.jpg",
    category: "others",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "23",
    name: "3CE Color Grid Eyeshadow",
    price: 12.87,
    image: "/images/products/gridEyeshadow.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "24",
    name: "Arch Appeal Brow Mascara",
    price: 12.85,
    image: "/images/products/browMascara.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
]);

// Dynamic filtering based on current category parameter
const filteredProducts = computed(() => {
  if (activeCategory.value === "all") {
    return allProducts.value;
  }
  return allProducts.value.filter(
    (p) => p.category.toLowerCase() === activeCategory.value,
  );
});

const formattedTitle = computed(() => {
  const title = activeCategory.value;
  return title.charAt(0).toUpperCase() + title.slice(1);
});
</script>

<template>
  <div class="category-view">
    <header class="category-header">
      <h1>{{ formattedTitle }} Collection</h1>
      <p class="count">{{ filteredProducts.length }} items available</p>
    </header>

    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-else class="empty-state">
      <p>No products found in the "{{ activeCategory }}" category.</p>
      <router-link to="/products" class="back-btn"
        >View All Products</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.category-view {
  padding: 1rem 0;
}

.category-header {
  margin-bottom: 2rem;
  text-align: center;
}

.category-header h1 {
  font-size: 2rem;
  color: #111;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
}

.count {
  color: #666;
  font-size: 0.95rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  background-color: #fdf8fa;
  border-radius: 12px;

  p {
    margin-bottom: 1rem;
    color: #666;
  }
}

.back-btn {
  display: inline-block;
  background-color: #ff6fa3;
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
}
</style>
