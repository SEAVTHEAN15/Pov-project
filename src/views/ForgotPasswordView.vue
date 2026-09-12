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

// Step 1: Request OTP / Reset Link
const handleRequestOtp = () => {
  if (!email.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  // Simulate API Request
  setTimeout(() => {
    isLoading.value = false;
    currentStep.value = 2; // រត់ទៅកាន់ Step 2
  }, 1000);
};

// Step 2: Verify OTP
const handleVerifyOtp = () => {
  if (otpCode.value.length < 4) {
    errorMessage.value = "Please enter a valid OTP code";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  // Simulate API Verification
  setTimeout(() => {
    isLoading.value = false;
    currentStep.value = 3; // រត់ទៅកាន់ Step 3
  }, 1000);
};

// Step 3: Reset Password
const handleResetPassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  if (newPassword.value.length < 6) {
    errorMessage.value = "Password must be at least 6 characters";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  // Simulate Password Update API
  setTimeout(() => {
    isLoading.value = false;
    alert("Password reset successfully!");
    router.push("/login");
  }, 1000);
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
</style>
