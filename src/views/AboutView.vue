<script setup lang="ts">
// About View Component
</script>

<template>
  <div class="about-view">
    <div class="about-hero">
      <h1>About Pinky Makeup</h1>
      <p>Enhancing natural beauty with conscious, high-quality cosmetics.</p>
    </div>

    <div class="about-content">
      <div class="story-section">
        <h2>Our Mission</h2>
        <p>
          Founded with a passion for beauty and self-expression, Pinky Makeup
          brings you carefully curated cosmetic products designed to highlight
          your natural radiance. We believe beauty routines should be
          effortless, inspiring, and accessible to everyone.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <span class="icon">🌸</span>
          <h3>Quality Assured</h3>
          <p>
            Dermatologically tested formulas suitable for sensitive skin types.
          </p>
        </div>
        <div class="feature-card">
          <span class="icon">🐰</span>
          <h3>Cruelty-Free</h3>
          <p>100% cruelty-free commitment across all curated cosmetics.</p>
        </div>
        <div class="feature-card">
          <span class="icon">✨</span>
          <h3>Modern Trends</h3>
          <p>
            Stay styled with the latest shades, formulas, and beauty
            innovations.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  padding: 1rem 0;
}

.about-hero {
  text-align: center;
  background-color: #fde8f0;
  padding: 3.5rem 1.5rem;
  border-radius: 16px;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.2rem;
    color: #111;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 1.05rem;
  }
}

.about-content {
  max-width: 900px;
  margin: 0 auto;
}

.story-section {
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  p {
    color: #555;
    line-height: 1.7;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border: 1px solid #f0e4e8;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;

  .icon {
    font-size: 2rem;
  }

  h3 {
    margin: 0.75rem 0 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}
</style>
