<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleAdminLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Please enter your email and password!";
    return;
  }

  errorMessage.value = "";
  isLoading.value = true;

  try {
    // Simulated auth delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (email.value === "admin@example.com" && password.value === "admin123") {
      localStorage.setItem("user_token", "admin-secret-token");
      localStorage.setItem("user_role", "admin");
      localStorage.setItem("user_email", email.value);
      localStorage.setItem(
        "user_profile",
        JSON.stringify({ name: "System Admin", email: email.value }),
      );

      await router.push("/admin/dashboard");
    } else {
      errorMessage.value = "email or password incorrect!";
    }
  } catch (error) {
    errorMessage.value = "here is an error in the system, please try again.";
  } finally {
    isLoading.value = false;
  }
};

const clearError = () => {
  if (errorMessage.value) errorMessage.value = "";
};
</script>

<template>
  <div class="admin-login-container">
    <div class="admin-login-card">
      <div class="admin-header">
        <div class="shield-icon">🛡️</div>
        <h2>Admin Portal</h2>
        <p>Security Management System for Administrator</p>
      </div>

      <form @submit.prevent="handleAdminLogin" class="admin-form">
        <transition name="fade">
          <div v-if="errorMessage" class="error-alert">
            {{ errorMessage }}
          </div>
        </transition>

        <div class="form-group">
          <label for="admin-email">Email</label>
          <input
            id="admin-email"
            v-model="email"
            type="email"
            placeholder="admin@example.com"
            required
            @input="clearError"
          />
        </div>

        <div class="form-group">
          <label for="admin-password">Password</label>
          <input
            id="admin-password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            @input="clearError"
          />
        </div>

        <button type="submit" class="admin-btn" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          <span>{{ isLoading ? "checking..." : "Admin Login" }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.admin-login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #0f172a; */

  /* padding: 1.5rem; */
}

.admin-login-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  color: #f8fafc;
}

.admin-header {
  text-align: center;
  margin-bottom: 2rem;
}

.shield-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.admin-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
}

.admin-header p {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #cbd5e1;
}

.form-group input {
  padding: 0.75rem 1rem;
  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.9rem;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-group input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
}

.error-alert {
  background-color: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #fca5a5;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  text-align: center;
}

.admin-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #0284c7;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    opacity 0.2s;
}

.admin-btn:hover:not(:disabled) {
  background-color: #0369a1;
}

.admin-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
