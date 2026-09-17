<script setup lang="ts">
import { ref } from "vue";

interface Service {
  id: string;
  title: string;
  category: "makeup" | "skincare" | "lessons";
  price: number;
  duration: string;
  description: string;
  icon: string;
  popular?: boolean;
  includes: string[];
}

const activeCategory = ref<string>("all");
const selectedService = ref<Service | null>(null);

// Booking Form State
const bookingDate = ref("");
const bookingTime = ref("");
const clientName = ref("");
const clientEmail = ref("");
const isSubmitted = ref(false);

const services = ref<Service[]>([
  {
    id: "1",
    title: "Bridal & Event Makeup",
    category: "makeup",
    price: 120,
    duration: "90 mins",
    popular: true,
    description:
      "Full face luxury makeup application customized for weddings, photoshoots, and red-carpet events.",
    icon: "✨",
    includes: [
      "Skin prep & hydrating facial mist",
      "Premium false lash application",
      "12-hour waterproof setting finish",
    ],
  },
  {
    id: "2",
    title: "Skincare Consultation",
    category: "skincare",
    price: 45,
    duration: "45 mins",
    description:
      "One-on-one session with our licensed aesthetician to analyze skin barrier health and recommend custom routines.",
    icon: "🌸",
    includes: [
      "Digital skin type assessment",
      "Customized ingredient breakdown",
      "Take-home skincare sample kit",
    ],
  },
  {
    id: "3",
    title: "1-on-1 Makeup Masterclass",
    category: "lessons",
    price: 85,
    duration: "60 mins",
    description:
      "Master everyday beauty techniques, proper brush control, and color theory with a professional artist.",
    icon: "💄",
    includes: [
      "Pouch purge & product evaluation",
      "Step-by-step half-face guidance",
      "Personalized face chart reference",
    ],
  },
  {
    id: "4",
    title: "Express Touch-Up",
    category: "makeup",
    price: 30,
    duration: "30 mins",
    description:
      "Quick mid-day refresh focusing on eyes, lips, contouring, and glow restoration before an evening dinner.",
    icon: "💅",
    includes: [
      "Complexion powder touch-up",
      "Lip color application & lining",
      "Eye highlight enhancement",
    ],
  },
]);

// Filtered List Computed Logic
const filteredServices = ref(services.value);

const setCategory = (cat: string) => {
  activeCategory.value = cat;
  if (cat === "all") {
    filteredServices.value = services.value;
  } else {
    filteredServices.value = services.value.filter((s) => s.category === cat);
  }
};

const openBookingModal = (service: Service) => {
  selectedService.value = service;
  isSubmitted.value = false;
  bookingDate.value = "";
  bookingTime.value = "";
};

const submitBooking = () => {
  if (bookingDate.value && bookingTime.value && clientName.value) {
    isSubmitted.value = true;
    setTimeout(() => {
      selectedService.value = null;
    }, 2200);
  }
};

const faqs = [
  {
    q: "Do I need to bring my own makeup for lessons?",
    a: "We provide all products and sanitation equipment, but you're welcome to bring your personal makeup bag so we can review your existing daily routine!",
  },
  {
    q: "How far in advance should I book bridal makeup?",
    a: "We recommend booking bridal services 2 to 4 months in advance to secure your preferred date and arrange a trial session.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made at least 24 hours before your scheduled appointment time receive a 100% full refund.",
  },
];
</script>

<template>
  <div class="services-container">
    <!-- Hero Header Section -->
    <header class="services-hero">
      <span class="hero-tag">Personalized Beauty & Styling</span>
      <h1>Our Beauty Services</h1>
      <p>
        Experience bespoke makeup artistry and tailored skincare routines
        designed to enhance your natural radiance for any occasion.
      </p>

      <!-- Category Filter Pills -->
      <div class="category-filters">
        <button
          :class="['filter-btn', { active: activeCategory === 'all' }]"
          @click="setCategory('all')"
        >
          All Services
        </button>
        <button
          :class="['filter-btn', { active: activeCategory === 'makeup' }]"
          @click="setCategory('makeup')"
        >
          Makeup & Styling
        </button>
        <button
          :class="['filter-btn', { active: activeCategory === 'skincare' }]"
          @click="setCategory('skincare')"
        >
          Skincare & Prep
        </button>
        <button
          :class="['filter-btn', { active: activeCategory === 'lessons' }]"
          @click="setCategory('lessons')"
        >
          Lessons & Classes
        </button>
      </div>
    </header>

    <!-- Services Grid -->
    <main class="services-grid">
      <div
        v-for="service in filteredServices"
        :key="service.id"
        class="service-card"
      >
        <div v-if="service.popular" class="popular-badge">Most Popular</div>

        <div class="card-top">
          <div class="icon-wrapper">{{ service.icon }}</div>
          <div class="price-container">
            <span class="price">${{ service.price.toFixed(2) }}</span>
            <span class="duration">• {{ service.duration }}</span>
          </div>
        </div>

        <h2>{{ service.title }}</h2>
        <p class="description">{{ service.description }}</p>

        <!-- Feature List -->
        <div class="includes-box">
          <span class="includes-title">What's included:</span>
          <ul>
            <li v-for="(item, idx) in service.includes" :key="idx">
              <span class="check-mark">✓</span> {{ item }}
            </li>
          </ul>
        </div>

        <button class="book-btn" @click="openBookingModal(service)">
          Book Appointment
        </button>
      </div>
    </main>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know before your beauty appointment</p>
      </div>
      <div class="faq-grid">
        <div v-for="(item, idx) in faqs" :key="idx" class="faq-card">
          <h3>{{ item.q }}</h3>
          <p>{{ item.a }}</p>
        </div>
      </div>
    </section>

    <!-- Interactive Booking Modal Dialog -->
    <div
      v-if="selectedService"
      class="modal-backdrop"
      @click.self="selectedService = null"
    >
      <div class="modal-card">
        <button class="close-btn" @click="selectedService = null">✕</button>

        <div v-if="!isSubmitted">
          <span class="modal-sub">Confirm Appointment</span>
          <h3 class="modal-title">{{ selectedService.title }}</h3>
          <p class="modal-price">
            ${{ selectedService.price.toFixed(2) }}
            <span>({{ selectedService.duration }})</span>
          </p>

          <form @submit.prevent="submitBooking" class="booking-form">
            <div class="form-group">
              <label>Full Name</label>
              <input
                type="text"
                v-model="clientName"
                placeholder="e.g. Serey Roth"
                required
              />
            </div>

            <div class="form-group">
              <label>Email Address</label>
              <input
                type="email"
                v-model="clientEmail"
                placeholder="e.g. name@example.com"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Preferred Date</label>
                <input type="date" v-model="bookingDate" required />
              </div>
              <div class="form-group">
                <label>Preferred Time</label>
                <input type="time" v-model="bookingTime" required />
              </div>
            </div>

            <button type="submit" class="submit-btn">
              Confirm & Lock Reservation
            </button>
          </form>
        </div>

        <!-- Success Feedback Screen -->
        <div v-else class="success-screen">
          <div class="success-icon">🎉</div>
          <h3>Appointment Requested!</h3>
          <p>
            Thank you, <strong>{{ clientName }}</strong
            >. We have saved your spot for
            <strong>{{ selectedService.title }}</strong> on {{ bookingDate }} at
            {{ bookingTime }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.services-container {
  max-width: 1400px;
  margin: 0 auto;
  /* padding: 1.5rem 1rem 5rem; */
  /* padding: 40px 0; */

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  color: #334155;
}

/* Hero Section */
.services-hero {
  text-align: center;
  background: linear-gradient(135deg, #fde8f0 0%, #fff0f5 100%);
  padding: 3.5rem 0rem;
  border-radius: 0px 0px 20px 20px;
  margin-bottom: 3rem;

  .hero-tag {
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
    font-size: 1.05rem;
    max-width: 580px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
}

/* Category Filters */
.category-filters {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  padding: 0.55rem 1.25rem;
  border-radius: 25px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #f4588e;
    border-color: #fde8f0;
  }

  &.active {
    background-color: #f4588e;
    color: #ffffff;
    border-color: #f4588e;
    box-shadow: 0 4px 12px rgba(244, 88, 142, 0.25);
  }
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.75rem;
  margin-bottom: 4rem;
}

.service-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 18px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.25 ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(244, 88, 142, 0.12);
  }
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #f4588e;
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 12px;
  text-transform: uppercase;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  background-color: #fde8f0;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.price-container {
  text-align: right;

  .price {
    display: block;
    font-size: 1.35rem;
    font-weight: 800;
    color: #f4588e;
  }
  .duration {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 600;
  }
}

.service-card h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem;
}

.description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

/* Includes Box */
.includes-box {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;

  .includes-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    display: block;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    li {
      font-size: 0.82rem;
      color: #334155;
      display: flex;
      align-items: center;
      gap: 0.4rem;

      .check-mark {
        color: #10b981;
        font-weight: 800;
      }
    }
  }
}

.book-btn {
  width: 100%;
  background-color: #f4588e;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0447b;
  }
}

/* FAQ Section */
.faq-section {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  padding: 3rem 2rem;
}

.faq-header {
  text-align: center;
  margin-bottom: 2.5rem;

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

.faq-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  .faq-card {
    h3 {
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 0.5rem;
    }
    p {
      color: #64748b;
      font-size: 0.88rem;
      line-height: 1.5;
      margin: 0;
    }
  }
}

/* Modal Styling */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 1rem;
}

.modal-card {
  position: relative;
  background: #ffffff;
  border-radius: 20px;
  padding: 2.25rem;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 0.9rem;
  cursor: pointer;
  color: #64748b;
}

.modal-sub {
  font-size: 0.75rem;
  font-weight: 700;
  color: #f4588e;
  text-transform: uppercase;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0.2rem 0 0.3rem;
}

.modal-price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #f4588e;
  margin-bottom: 1.5rem;

  span {
    color: #94a3b8;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #475569;
  }

  input {
    padding: 0.7rem;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 0.9rem;
    outline: none;

    &:focus {
      border-color: #f4588e;
    }
  }
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.submit-btn {
  margin-top: 0.5rem;
  background-color: #f4588e;
  color: white;
  border: none;
  padding: 0.85rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}

.success-screen {
  text-align: center;
  padding: 1.5rem 0;

  .success-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.4rem;
    color: #0f172a;
    margin: 0 0 0.5rem;
  }

  p {
    color: #64748b;
    font-size: 0.92rem;
    line-height: 1.5;
  }
}

/* Responsive */
@media (max-width: 850px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
