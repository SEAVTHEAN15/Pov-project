<script setup lang="ts">
import { ref } from "vue";

interface Service {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
  icon: string;
}

const services = ref<Service[]>([
  {
    id: "1",
    title: "Bridal & Event Makeup",
    price: 120,
    duration: "90 mins",
    description:
      "Full face makeup application customized for weddings, photoshoots, and special events.",
    icon: "✨",
  },
  {
    id: "2",
    title: "Personalized Skincare Consultation",
    price: 45,
    duration: "45 mins",
    description:
      "One-on-one session to analyze your skin type and recommend custom product routines.",
    icon: "🌸",
  },
  {
    id: "3",
    title: "1-on-1 Makeup Lesson",
    price: 85,
    duration: "60 mins",
    description:
      "Learn everyday beauty techniques, proper brush control, and color matching with an expert.",
    icon: "💄",
  },
  {
    id: "4",
    title: "Express Touch-Up",
    price: 30,
    duration: "30 mins",
    description:
      "Quick refresh focusing on eyes, lips, and glow application before an evening event.",
    icon: "💅",
  },
]);
</script>

<template>
  <div class="services-view">
    <div class="services-header">
      <h1>Our Beauty Services</h1>
      <p>
        Professional makeup art and personalized consultations to help you feel
        confident and radiant.
      </p>
    </div>

    <div class="services-grid">
      <div v-for="service in services" :key="service.id" class="service-card">
        <div class="service-icon">{{ service.icon }}</div>
        <h2>{{ service.title }}</h2>
        <div class="service-meta">
          <span class="price">${{ service.price.toFixed(2) }}</span>
          <span class="duration">• {{ service.duration }}</span>
        </div>
        <p class="description">{{ service.description }}</p>
        <button class="book-btn">Book Appointment</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.services-view {
  padding: 1rem 0;
}

.services-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.2rem;
    color: #111;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    max-width: 550px;
    margin: 0 auto;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: white;
  border: 1px solid #f0e4e8;
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(255, 111, 163, 0.12);
  }
}

.service-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.service-card h2 {
  font-size: 1.25rem;
  color: #222;
  margin-bottom: 0.5rem;
}

.service-meta {
  margin-bottom: 1rem;

  .price {
    font-size: 1.2rem;
    font-weight: 700;
    color: #ff6fa3;
  }

  .duration {
    color: #888;
    font-size: 0.88rem;
    margin-left: 0.4rem;
  }
}

.description {
  color: #555;
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.book-btn {
  width: 100%;
  background-color: #ff6fa3;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e55c8f;
  }
}
</style>
