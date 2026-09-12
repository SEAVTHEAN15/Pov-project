<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ProductCard from "@/components/common/ProductCard.vue";
import type { Product } from "@/types/Product";

// Hero Banner Carousel State
const currentSlide = ref(0);
let autoSlideInterval: number | null = null;

const bannerSlides = [
  {
    id: 1,
    title: "Reveal Your Natural Beauty",
    subtitle:
      "Discover premium cosmetics designed to enhance your glow. Feel confident every day with products that care for your skin and style.",
    image: "/images/products/banner1.jpg",
    ctaText: "View all products",
    ctaLink: "/products",
  },
  {
    id: 2,
    title: "Reveal Your Natural Beauty",
    subtitle:
      "Discover premium cosmetics designed to enhance your glow. Feel confident every day with products that care for your skin and style.",
    image: "/images/products/banner2.jpg",
    ctaText: "View all products",
    ctaLink: "/products",
  },
  {
    id: 3,
    title: "Reveal Your Natural Beauty",
    subtitle:
      "Discover premium cosmetics designed to enhance your glow. Feel confident every day with products that care for your skin and style.",
    image: "/images/products/banner3.jpg",
    ctaText: "View all products",
    ctaLink: "/products",
  },
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bannerSlides.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + bannerSlides.length) % bannerSlides.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetTimer();
};

const startTimer = () => {
  if (autoSlideInterval) return;
  autoSlideInterval = window.setInterval(nextSlide, 5000);
};

const stopTimer = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

const resetTimer = () => {
  stopTimer();
  startTimer();
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});

// Product Carousels Setup
const newArrivalsRef = ref<HTMLElement | null>(null);
const bestSellersRef = ref<HTMLElement | null>(null);
const clearStockRef = ref<HTMLElement | null>(null);

const scroll = (container: HTMLElement | null, direction: "left" | "right") => {
  if (!container) return;
  const scrollAmount = direction === "left" ? -300 : 300;
  container.scrollBy({ left: scrollAmount, behavior: "smooth" });
};

const newArrivals = ref<Product[]>([
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
    category: "face",
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
]);

const bestSellers = ref<Product[]>([
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
]);

const clearStock = ref<Product[]>([
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
    category: "lips",
    subcategory: "Tint",
    isClearStock: true,
  },
  {
    id: "22",
    name: "3CE Pouch Small",
    price: 6.72,
    image: "/images/products/pouchSmall.jpg",
    category: "lips",
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
</script>

<template>
  <div class="home-view">
    <!-- Hero Banner Carousel -->
    <div class="banner-slider" @mouseenter="stopTimer" @mouseleave="startTimer">
      <div
        v-for="(slide, index) in bannerSlides"
        :key="slide.id"
        class="slide"
        :class="{ active: currentSlide === index }"
        :style="{
          backgroundImage: ` url(${slide.image})`,
        }"
      >
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p class="text-hero">{{ slide.subtitle }}</p>
          <router-link :to="slide.ctaLink" class="cta-btn">
            {{ slide.ctaText }}
          </router-link>
        </div>
      </div>

      <!-- Arrow Controls -->
      <button
        class="slider-arrow prev"
        @click="prevSlide"
        aria-label="Previous Slide"
      >
        ‹
      </button>
      <button
        class="slider-arrow next"
        @click="nextSlide"
        aria-label="Next Slide"
      >
        ›
      </button>

      <!-- Dots Controls -->
      <div class="slider-dots">
        <span
          v-for="(_, index) in bannerSlides"
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>

    <!-- Section 1: New Arrivals -->
    <section class="section">
      <div class="section-header">
        <h3 class="content-text">New Arrivals</h3>
        <div class="carousel-nav">
          <button class="nav-btn" @click="scroll(newArrivalsRef, 'left')">
            ‹
          </button>
          <button class="nav-btn" @click="scroll(newArrivalsRef, 'right')">
            ›
          </button>
        </div>
      </div>
      <div class="carousel-container" ref="newArrivalsRef">
        <div class="carousel-item" v-for="p in newArrivals" :key="p.id">
          <ProductCard :product="p" />
        </div>
      </div>
    </section>

    <!-- Section 2: Best Sellers -->
    <section class="section">
      <div class="section-header">
        <h3 class="content-text">Best Sellers</h3>
        <div class="carousel-nav">
          <button class="nav-btn" @click="scroll(bestSellersRef, 'left')">
            ‹
          </button>
          <button class="nav-btn" @click="scroll(bestSellersRef, 'right')">
            ›
          </button>
        </div>
      </div>
      <div class="carousel-container" ref="bestSellersRef">
        <div class="carousel-item" v-for="p in bestSellers" :key="p.id">
          <ProductCard :product="p" />
        </div>
      </div>
    </section>

    <!-- Section 3: Clear Stock -->
    <section class="section">
      <div class="section-header">
        <h3 class="content-text">Clear Stock</h3>
        <div class="carousel-nav">
          <button class="nav-btn" @click="scroll(clearStockRef, 'left')">
            ‹
          </button>
          <button class="nav-btn" @click="scroll(clearStockRef, 'right')">
            ›
          </button>
        </div>
      </div>
      <div class="carousel-container" ref="clearStockRef">
        <div class="carousel-item" v-for="p in clearStock" :key="p.id">
          <ProductCard :product="p" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

/* Banner Slider Styles */
.banner-slider {
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 50px;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

.slide.active {
  opacity: 1;
  z-index: 1;
}

.slide-content {
  color: #000000;
  max-width: 600px;
}

.slide-content h2 {
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
}

.text-hero {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 30px;
}

.cta-btn {
  background-color: #ff6fa3;
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: 24px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.2s;
}

.cta-btn:hover {
  background-color: #e04a7e;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.slider-arrow:hover {
  background: rgba(255, 255, 255, 0.7);
  color: #111;
}

.slider-arrow.prev {
  left: 15px;
}

.slider-arrow.next {
  right: 15px;
}

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #ff6fa3;
  width: 24px;
  border-radius: 10px;
}

/* Horizontal Scroll Carousels */
.section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section .content-text {
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.carousel-nav {
  display: flex;
  gap: 0.5rem;
}

.nav-btn {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.nav-btn:hover {
  background-color: #ff6fa3;
  color: white;
  border-color: #ff6fa3;
}

.carousel-container {
  display: flex;
  /* gap: 1.25rem; */
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 0.5rem 0.25rem 1rem 0.25rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* background-color: #e04a7e; */
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 240px;
  scroll-snap-align: start;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .banner-slider {
    height: 300px;
  }

  .slide-content h2 {
    font-size: 1.8rem;
  }

  .text-hero {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  .carousel-item {
    flex: 0 0 190px;
  }

  .carousel-nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .banner-slider {
    height: 260px;
  }

  .slider-arrow {
    display: none;
  }

  .carousel-item {
    flex: 0 0 165px;
  }
}
</style>
