<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

const handleSubmit = () => {
  alert(`Thank you, ${form.firstName}! Your message has been sent.`);
  form.firstName = "";
  form.lastName = "";
  form.email = "";
  form.message = "";
};
</script>

<template>
  <div class="contact-view">
    <div class="contact-hero">
      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you. Contact us for bookings, questions, or
        support.
      </p>
    </div>

    <div class="contact-card">
      <div class="info-side">
        <h3>Contact Information</h3>
        <p><strong>Phone:</strong> +855 123 456 789</p>
        <p><strong>Email:</strong> pinkycosmetics@beauty</p>

        <h3 class="mt-4">Shopping Address:</h3>
        <p>Phnom Penh, Cambodia</p>

        <h3 class="mt-4">Opening Hours:</h3>
        <p>Mon - Sun: 9:00 AM - 8:00 PM</p>
      </div>

      <div class="form-side">
        <h3>Ask us anything</h3>
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <input
              v-model="form.firstName"
              type="text"
              placeholder="Enter first name"
              required
            />
            <input
              v-model="form.lastName"
              type="text"
              placeholder="Enter last name"
              required
            />
          </div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          />
          <textarea
            v-model="form.message"
            placeholder="How can we help?"
            rows="4"
            required
          ></textarea>
          <button type="submit" class="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-hero {
  text-align: center;
  margin-bottom: 2rem;
}
.contact-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  overflow: hidden;
  max-width: 900px;
  margin: 0 auto 3rem auto;
}
.info-side {
  padding: 2.5rem;
  background-color: #fafafa;
  border-right: 1px solid #f0f0f0;
}
.info-side h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #222;
}
.mt-4 {
  margin-top: 1.5rem;
}
.form-side {
  padding: 2.5rem;
}
.form-side h3 {
  margin-bottom: 1.5rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.row {
  display: flex;
  gap: 1rem;
}
input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  outline: none;
}
.submit-btn {
  background-color: #ff6fa3;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>
