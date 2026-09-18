<script setup lang="ts">
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();

// Step State Management (1 = Request, 2 = Verify OTP, 3 = Reset Password)
const currentStep = ref<1 | 2 | 3>(1);

// Form Fields
const email = ref("");
const otpCode = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// UI States
const isLoading = ref(false);
const errorMessage = ref("");
const isSuccessModalOpen = ref(false); // Controls the professional popup modal

// Step 1: Request OTP / Reset Link
const handleRequestOtp = () => {
  if (!email.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  // Simulate API Request
  setTimeout(() => {
    isLoading.value = false;
    currentStep.value = 2;
  }, 1000);
};

// Step 2: Verify OTP
const handleVerifyOtp = () => {
  if (otpCode.value.length < 4) {
    errorMessage.value = "Please enter a valid OTP code.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  // Simulate API Verification
  setTimeout(() => {
    isLoading.value = false;
    currentStep.value = 3;
  }, 1000);
};

// Step 3: Reset Password
const handleResetPassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  if (newPassword.value.length < 6) {
    errorMessage.value = "Password must be at least 6 characters long.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  // Simulate Password Update API
  setTimeout(() => {
    isLoading.value = false;
    isSuccessModalOpen.value = true; // Opens the popup modal on screen
  }, 1000);
};

// Handle modal button click to go to login
const handleCloseModal = () => {
  isSuccessModalOpen.value = false;
  router.push("/login");
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <!-- Left Hero Banner -->
      <div class="hero-section left-banner">
        <h1>reset</h1>
      </div>

      <!-- Right Form Container -->
      <div class="form-section">
        <!-- Error Message Alert -->
        <div v-if="errorMessage" class="error-alert">
          {{ errorMessage }}
        </div>

        <!-- ================= STEP 1: Request OTP ================= -->
        <div v-if="currentStep === 1">
          <h2 class="form-title">Forgot Password?</h2>
          <p class="form-subtitle">
            Enter your registered email address to receive a verification code.
          </p>

          <form @submit.prevent="handleRequestOtp" class="auth-form">
            <div class="form-group">
              <label>Email Address</label>
              <input
                type="email"
                v-model="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              {{ isLoading ? "Sending Code..." : "Send Verification Code" }}
            </button>
          </form>
        </div>

        <!-- ================= STEP 2: Verify OTP ================= -->
        <div v-else-if="currentStep === 2">
          <h2 class="form-title">Enter OTP Code</h2>
          <p class="form-subtitle">
            We sent a verification code to <strong>{{ email }}</strong>
          </p>

          <form @submit.prevent="handleVerifyOtp" class="auth-form">
            <div class="form-group">
              <label>OTP Code</label>
              <input
                type="text"
                v-model="otpCode"
                placeholder="Enter code (e.g. 1234)"
                maxlength="6"
                required
              />
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              {{ isLoading ? "Verifying..." : "Verify Code" }}
            </button>
          </form>

          <button @click="currentStep = 1" class="text-btn">
            Change Email
          </button>
        </div>

        <!-- ================= STEP 3: Reset Password ================= -->
        <div v-else-if="currentStep === 3">
          <h2 class="form-title">Create New Password</h2>
          <p class="form-subtitle">
            Your new password must be different from previous passwords.
          </p>

          <form @submit.prevent="handleResetPassword" class="auth-form">
            <div class="form-group">
              <label>New Password</label>
              <input
                type="password"
                v-model="newPassword"
                placeholder="Enter new password"
                required
              />
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              {{ isLoading ? "Updating..." : "Reset Password" }}
            </button>
          </form>
        </div>

        <!-- Back to Login Link -->
        <p class="toggle-text">
          Remembered your password? <RouterLink to="/login">Login</RouterLink>
        </p>
      </div>
    </div>

    <!-- ================= PROFESSIONAL SUCCESS MODAL POPUP ================= -->
    <Teleport to="body">
      <div v-if="isSuccessModalOpen" class="modal-overlay">
        <div class="success-modal-card">
          <div class="success-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <!-- Fixed missing opening bracket (<) for polyline -->
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3>Password Reset Successful!</h3>
          <p>
            Your password has been successfully updated. You can now log in with
            your new password.
          </p>
          <button
            type="button"
            class="modal-action-btn"
            @click="handleCloseModal"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
@import "@/assets/styles/auth-styles.css";

.form-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.error-alert {
  background-color: #fde8e8;
  color: #e53e3e;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.82rem;
  margin-bottom: 1rem;
}

.text-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 0.8rem;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
}

.text-btn:hover {
  color: #eb5e8d;
}

/* ================= MODAL STYLES ================= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(3px);
}

.success-modal-card {
  background: #fff;
  padding: 2.2rem 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalScaleIn 0.25s ease-out;
}

@keyframes modalScaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon-wrapper {
  width: 56px;
  height: 56px;
  background-color: #e6f9f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem auto;
}

.success-modal-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.success-modal-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.8rem;
  line-height: 1.5;
}

.modal-action-btn {
  width: 100%;
  background-color: #ff5b93;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-action-btn:hover {
  background-color: #e04a7e;
}
</style>
