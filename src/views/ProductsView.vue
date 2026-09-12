<script setup lang="ts">
import { ref, computed } from "vue";
import ProductCard from "@/components/common/ProductCard.vue";
import type { Product } from "@/types/Product";

const selectedCategory = ref<string>("all");
const searchQuery = ref<string>("");

const categories = [
  { id: "all", label: "All Products" },
  { id: "eyes", label: "Eyes" },
  { id: "lips", label: "Lips" },
  { id: "cheeks", label: "Cheeks" },
  { id: "face", label: "Face" },
  { id: "others", label: "Others" },
];

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
    category: "eyes",
    subcategory: "Concealer",
    isNewArrival: true,
  },
  {
    id: "8",
    name: "Kiko Highlighter Face Stick",
    price: 18.95,
    image: "/images/products/kikoHighlighter.jpg",
    category: "cheeks",
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
    category: "lips",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "14",
    name: "Matte Colour Lipstick",
    price: 5.93,
    image: "/images/products/matteLipstick.jpg",
    category: "lips",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "15",
    name: "3D Hydra Lipgloss",
    price: 17.57,
    image: "/images/products/hydraLipgloss.jpg",
    category: "lips",
    subcategory: "Mascara",
    isBestSeller: true,
  },
  {
    id: "16",
    name: "Glow Blush CheekTone",
    price: 18.0,
    image: "/images/products/glowBlush.jpg",
    category: "cheeks",
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
    category: "face",
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
    category: "eyes",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "24",
    name: "Arch Appeal Brow Mascara",
    price: 12.85,
    image: "/images/products/browMascara.jpg",
    category: "eyes",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "25",
    name: "Rouge HD Matte Lipstick ",
    price: 13.52,
    image: "/images/products/hdMatteLipstick.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "26",
    name: "3D Hydra Lip Gloss",
    price: 18.93,
    image: "/images/products/3DHydraLipGloss.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "27",
    name: "3CE Blushlighter",
    price: 16.27,
    image: "/images/products/3CEBlushlighter.jpg",
    category: "cheeks",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "28",
    name: "Glow-y Powder",
    price: 18.0,
    image: "/images/products/Glow_yPowder.jpg",
    category: "face",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "29",
    name: "3CE All Rounder Face Palette",
    price: 27.0,
    image: "/images/products/rounderFacePalette.jpg",
    category: "eyes",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "30",
    name: "Eyebrow Wax Fixing Pencil",
    price: 14.2,
    image: "/images/products/EyebrowWaxFixingPencil.jpg",
    category: "eyes",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "31",
    name: "Super Colour Waterproof Eyeliner",
    price: 14.87,
    image: "/images/products/WaterproofEyeliner.jpg",
    category: "eyes",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "32",
    name: "Base Brush",
    price: 14.0,
    image: "/images/products/baseBrush.jpg",
    category: "others",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "33",
    name: "[3CE Scarf Edition] Face Blush",
    price: 13.56,
    image: "/images/products/FaceBlush.jpg",
    category: "cheeks",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "34",
    name: "Mask Fit AI Filter Cushion",
    price: 26.0,
    image: "/images/products/maskFitAIFilterCushion.jpg",
    category: "face",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "35",
    name: "3CE Syrup Layering Tint",
    price: 12.17,
    image: "/images/products/syrupLayeringTint.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "36",
    name: "Cashmere Hug Lipstick",
    price: 14.88,
    image: "/images/products/cashmereHugLipstick.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "37",
    name: "Glasting Color Gloss Mini",
    price: 10.0,
    image: "/images/products/glastingColorGlossMini.jpg",
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "38",
    name: "So Chic Trio Blush",
    price: 17.59,
    image: "/images/products/soChicTrioBlush.jpg",
    category: "cheeks",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "39",
    name: "3CE Shimmer Makeup Fixer",
    price: 12.88,
    image: "/images/products/shimmerMakeupFixer.jpg",
    category: "face",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "40",
    name: "3CE Square Hand Mirror",
    price: 6.1,
    image: "/images/products/squareHandMirror.jpg",
    category: "others",
    subcategory: "Tint",
    isClearStock: true,
  },
]);

const filteredProducts = computed(() => {
  return allProducts.value.filter((product) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      product.category === selectedCategory.value;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>

<template>
  <div class="products-view">
    <div class="products-header">
      <h1>Our Products</h1>
      <p>Explore our wide range of cosmetics crafted for your daily look.</p>
    </div>

    <!-- Search & Filter Section -->
    <div class="controls-bar">
      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['tab-btn', { active: selectedCategory === cat.id }]"
          @click="selectedCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
        />
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <p>No products match your search criteria.</p>
      <button
        class="reset-btn"
        @click="
          selectedCategory = 'all';
          searchQuery = '';
        "
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.products-view {
  padding: 1rem 0;
}

.products-header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.2rem;
    color: #111;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
}

.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  border: 1px solid #e2e8f0;
  background-color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fdf2f7;
    border-color: #ff6fa3;
  }

  &.active {
    background-color: #ff6fa3;
    color: white;
    border-color: #ff6fa3;
  }
}

.search-box input {
  padding: 0.55rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  outline: none;
  width: 240px;
  font-size: 0.9rem;

  &:focus {
    border-color: #ff6fa3;
  }
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
    color: #666;
    margin-bottom: 1rem;
  }
}

.reset-btn {
  background-color: #ff6fa3;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
}
</style>
