<script setup lang="ts">
import { reactive, ref, onUnmounted } from "vue";

const isSubmitting = ref(false);
const isSuccess = ref(false);
const submittedName = ref("");
const submittedEmail = ref("");

let resetTimer: ReturnType<typeof setTimeout> | null = null;
let submitTimer: ReturnType<typeof setTimeout> | null = null;

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  subject: "General Inquiry",
  message: "",
});

const handleSubmit = () => {
  isSubmitting.value = true;

  // Cache values to preserve context in success message
  submittedName.value = form.firstName;
  submittedEmail.value = form.email;

  // Simulate API request delay
  submitTimer = setTimeout(() => {
    isSubmitting.value = false;
    isSuccess.value = true;

    // Reset form after delay
    resetTimer = setTimeout(() => {
      form.firstName = "";
      form.lastName = "";
      form.email = "";
      form.subject = "General Inquiry";
      form.message = "";
      isSuccess.value = false;
    }, 4000);
  }, 1000);
};

onUnmounted(() => {
  if (resetTimer) clearTimeout(resetTimer);
  if (submitTimer) clearTimeout(submitTimer);
});
</script>

<template>
  <div class="contact-container">
    <!-- Hero Header -->
    <header class="contact-hero">
      <span class="hero-tag">We're Here To Help</span>
      <h1>Get in Touch</h1>
      <p>
        Have a question about our products, custom bridal bookings, or your
        order status? Our beauty support team is always ready to assist you.
      </p>
    </header>

    <!-- Main Content Layout -->
    <main class="contact-card">
      <!-- Left Side: Information & Social Links -->
      <aside class="info-side">
        <div class="info-block">
          <h3>Contact Information</h3>
          <ul class="contact-list">
            <li>
              <div class="info-icon">
                <i class="fa-solid fa-phone-volume"></i>
              </div>
              <div>
                <strong>Phone</strong>
                <p>+855 123 456 789</p>
              </div>
            </li>
            <li>
              <div class="info-icon"><i class="fa-solid fa-envelope"></i></div>
              <div>
                <strong>Email</strong>
                <p>pinkycosmetics@beauty.com</p>
              </div>
            </li>
            <li>
              <div class="info-icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <strong>Flagship Boutique</strong>
                <p>Monivong Blvd, Phnom Penh, Cambodia</p>
              </div>
            </li>
            <li>
              <div class="info-icon">
                <i class="fa-solid fa-alarm-clock"></i>
              </div>
              <div>
                <strong>Opening Hours</strong>
                <p>Mon - Sun: 9:00 AM - 8:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="social-block">
          <h3>Follow Our Journey</h3>
          <div class="social-links">
            <a href="#" class="social-pill">Facebook</a>
            <a href="#" class="social-pill">Instagram</a>
            <a href="#" class="social-pill">TikTok</a>
          </div>
        </div>
      </aside>

      <!-- Right Side: Interactive Form -->
      <section class="form-side">
        <Transition name="fade" mode="out-in">
          <div v-if="!isSuccess" key="form">
            <h3>Send Us a Message</h3>
            <p class="form-subtext">
              Fill out the form below and we will get back to you within 24
              hours.
            </p>

            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="input-group">
                  <label for="first-name">First Name</label>
                  <input
                    id="first-name"
                    v-model="form.firstName"
                    type="text"
                    placeholder="e.g. Serey"
                    required
                  />
                </div>
                <div class="input-group">
                  <label for="last-name">Last Name</label>
                  <input
                    id="last-name"
                    v-model="form.lastName"
                    type="text"
                    placeholder="e.g. Roth"
                    required
                  />
                </div>
              </div>

              <div class="input-group">
                <label for="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div class="input-group">
                <label for="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  v-model="form.subject"
                  class="select-input"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Assistance">
                    Product & Shade Matching
                  </option>
                  <option value="Appointment Booking">
                    Appointment & Booking Inquiry
                  </option>
                  <option value="Order Support">Order & Delivery Status</option>
                </select>
              </div>

              <div class="input-group">
                <label for="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  placeholder="How can our beauty team help you today?"
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner"></span>
                <span>{{ isSubmitting ? "Sending..." : "Send Message" }}</span>
              </button>
            </form>
          </div>

          <!-- Success Screen Overlay -->
          <div v-else key="success" class="success-screen">
            <div class="success-icon">✨</div>
            <h3>Message Sent!</h3>
            <p>
              Thank you, <strong>{{ submittedName }}</strong
              >! We have received your message and will contact you via
              <strong>{{ submittedEmail }}</strong> shortly.
            </p>
          </div>
        </Transition>
      </section>
    </main>

    <!-- Embedded Location Map Section -->
    <section class="map-section">
      <div class="map-header">
        <h2>Visit Our Store</h2>
        <p>
          Come try our full cosmetic line and get live shade matches at our
          Phnom Penh boutique.
        </p>
      </div>
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125102.34871239082!2d104.8517935!3d11.5563738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be7%3A0x6c2c8f82806e2361!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          width="100%"
          height="320"
          style="border: 0"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Pinky Store Location Map"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-container {
  max-width: 1400px;
  /* padding: 1.5rem 1rem 5rem; */
  /* padding: 40px 0; */
  margin: 0 auto;
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
.contact-hero {
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
    margin: 0 auto;
    line-height: 1.6;
  }
}

/* Contact Card Layout */
.contact-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  overflow: hidden;
  margin-bottom: 4rem;
}

/* Info Side */
.info-side {
  background-color: #faf7f9;
  padding: 2.5rem 2rem;
  border-right: 1px solid #f1e4eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-side h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1.25rem 0;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.info-icon {
  width: 38px;
  height: 38px;
  background-color: #fde8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.contact-list strong {
  display: block;
  font-size: 0.85rem;
  color: #0f172a;
  margin-bottom: 0.15rem;
}

.contact-list p {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.social-block {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2d5de;
}

.social-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.social-pill {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.4rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #f4588e;
    border-color: #f4588e;
  }
}

/* Form Side */
.form-side {
  padding: 2.5rem;
}

.form-side h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.25rem 0;
}

.form-subtext {
  font-size: 0.88rem;
  color: #64748b;
  margin-bottom: 1.75rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #475569;
  }
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  outline: none;
  background-color: #ffffff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #f4588e;
    box-shadow: 0 0 0 3px rgba(244, 88, 142, 0.15);
  }
}

.select-input {
  cursor: pointer;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #e0447b;
  }

  &:disabled {
    background-color: #fca5a5;
    cursor: not-allowed;
  }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Success Screen */
.success-screen {
  text-align: center;
  padding: 3rem 1rem;

  .success-icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #0f172a;
    margin: 0 0 0.5rem;
  }

  p {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto;
  }
}

/* Vue Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Map Section */
.map-section {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.map-header {
  text-align: center;
  margin-bottom: 1.75rem;

  h2 {
    font-size: 1.6rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 0.3rem 0;
  }

  p {
    color: #64748b;
    font-size: 0.92rem;
  }
}

.map-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Responsive Styles */
@media (max-width: 850px) {
  .contact-hero {
    padding: 2.5rem 1rem;
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
    }
  }

  .contact-card {
    grid-template-columns: 1fr;
    margin-bottom: 2.5rem;
  }

  .info-side {
    border-right: none;
    border-bottom: 1px solid #f1e4eb;
    padding: 2rem 1.5rem;
  }

  .form-side {
    padding: 2rem 1.5rem;
  }

  .row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 1rem 0.75rem 3rem;
  }

  .map-section {
    padding: 1.5rem 1rem;
  }

  .map-header h2 {
    font-size: 1.3rem;
  }
}
</style>
