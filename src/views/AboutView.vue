<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// Key Brand Stats
const stats = [
  { value: "100%", label: "Cruelty-Free" },
  { value: "50k+", label: "Happy Customers" },
  { value: "15+", label: "Beauty Awards" },
  { value: "4.9★", label: "Average Rating" },
];

// Feature Cards
const features = [
  {
    icon: "🌸",
    title: "Dermatologically Tested",
    description:
      "Safe, hypoallergenic formulas engineered specifically for sensitive skin types.",
  },
  {
    icon: "🐰",
    title: "100% Cruelty-Free",
    description:
      "We never test on animals at any stage of product development or manufacturing.",
  },
  {
    icon: "✨",
    title: "Modern Formulations",
    description:
      "Infused with skin-loving ingredients for vibrant pigments and lightweight feel.",
  },
];
</script>

<template>
  <div class="about-container">
    <!-- Hero Section -->
    <section class="about-hero">
      <span class="hero-badge">About Pinky Store</span>
      <h1>Redefining Everyday Elegance</h1>
      <p>
        Enhancing your natural radiance with conscious, high-performance
        cosmetics crafted for modern lifestyles.
      </p>
    </section>

    <!-- Brand Stats Section -->
    <section class="stats-bar">
      <div v-for="(stat, idx) in stats" :key="idx" class="stat-item">
        <h3>{{ stat.value }}</h3>
        <p>{{ stat.label }}</p>
      </div>
    </section>

    <!-- Main Story / Mission Section -->
    <section class="story-section">
      <div class="story-content">
        <span class="sub-heading">Our Mission</span>
        <h2>Beauty that feels as good as it looks</h2>
        <p>
          Founded with a passion for self-expression, Pinky Store brings you
          carefully curated cosmetic products designed to highlight your natural
          radiance. We believe beauty routines should be effortless, inspiring,
          and accessible to everyone.
        </p>
        <p>
          Every item in our collection is crafted to give you long-lasting wear
          without compromising on skin nourishment or ethical values.
        </p>
      </div>
      <div class="story-image-card">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
          alt="Pinky Cosmetics Display"
        />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-title">
        <h2>Why Choose Pinky Store</h2>
        <p>Built on trust, quality, and conscious beauty practices.</p>
      </div>

      <div class="features-grid">
        <div v-for="(feat, idx) in features" :key="idx" class="feature-card">
          <div class="icon-wrapper">{{ feat.icon }}</div>
          <h3>{{ feat.title }}</h3>
          <p>{{ feat.description }}</p>
        </div>
      </div>
    </section>

    <!-- Bottom Call-To-Action Banner -->
    <section class="cta-banner">
      <h2>Ready to find your perfect shade?</h2>
      <p>
        Explore our curated collections and discover your daily go-to beauty
        essentials.
      </p>
      <button class="cta-btn" @click="router.push('/products')">
        Shop Our Collection
      </button>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1400px;
  /* padding: 1.5rem 1rem 4rem; */
  padding: 0px 0px 50px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  color: #2d3748;
}

/* Hero Section */
.about-hero {
  text-align: center;
  background: linear-gradient(135deg, #fde8f0 0%, #fff0f5 100%);
  padding: 4rem 0rem;
  border-radius: 0px 0px 20px 20px;

  .hero-badge {
    background: #ffffff;
    color: #f4588e;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.35rem 0.85rem;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #0f172a;
    margin: 1rem 0 0.5rem;
  }

  p {
    color: #64748b;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

/* Stats Bar */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;

  .stat-item {
    h3 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #f4588e;
      margin: 0;
    }
    p {
      margin: 0.2rem 0 0;
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 600;
    }
  }
}

/* Story Section */
.story-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  .sub-heading {
    color: #f4588e;
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0.4rem 0 1rem;
    line-height: 1.25;
  }

  p {
    color: #475569;
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 0.98rem;
  }

  .story-image-card {
    width: 100%;
    height: 320px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(244, 88, 142, 0.12);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

/* Features Section */
.features-section {
  .section-title {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.8rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }

    p {
      color: #64748b;
      font-size: 0.95rem;
      margin-top: 0.3rem;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  }

  .icon-wrapper {
    width: 52px;
    height: 52px;
    background-color: #fde8f0;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto 1.25rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
  }

  p {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }
}

/* CTA Banner */
.cta-banner {
  background-color: #fde8f0;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;

  h2 {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }

  p {
    color: #64748b;
    margin: 0.5rem 0 1.5rem;
  }

  .cta-btn {
    background-color: #f4588e;
    color: white;
    border: none;
    padding: 0.8rem 1.75rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e0447b;
    }
  }
}

/* Responsive Styles */
@media (max-width: 850px) {
  .story-section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 1rem 0.75rem 2.5rem;
    gap: 2.5rem;
  }

  .about-hero {
    padding: 2.5rem 1rem;

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  .stats-bar {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.25rem 1rem;
  }

  .story-section h2 {
    font-size: 1.5rem;
  }

  .cta-banner {
    padding: 2rem 1rem;

    h2 {
      font-size: 1.4rem;
    }

    .cta-btn {
      width: 100%;
    }
  }
}
</style>
