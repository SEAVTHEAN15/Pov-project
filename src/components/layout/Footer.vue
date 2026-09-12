<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const newsletterEmail = ref("");

const handleSubscribe = () => {
  if (newsletterEmail.value) {
    alert(`Subscribed with: ${newsletterEmail.value}`);
    newsletterEmail.value = "";
  }
};
</script>

<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-grid">
        <!-- Column 1: Brand & Subscribe -->
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <div class="logo-circle">
              <img src="/images/products/logo.png" class="logo-img" alt="" />
            </div>
            <h3 class="brand-title">Pinky makeup</h3>
          </div>
          <p class="brand-desc">
            Premium cosmetics enhance natural beauty, boost confidence, and
            provide high-quality, skin-friendly products to help you stay
            radiant and shine daily.
          </p>

          <form @submit.prevent="handleSubscribe" class="subscribe-form">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="Your email address"
              required
            />
            <button type="submit">SUBSCRIBE</button>
          </form>

          <div class="app-qr-section">
            <h4>Pinky makeup App</h4>
            <svg
              class="qr-code"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000"
                d="M0,0 h35 v35 h-35 z M5,5 v25 h25 v-25 z M10,10 h15 v15 h-15 z"
              />
              <path
                fill="#000"
                d="M65,0 h35 v35 h-35 z M70,5 v25 h25 v-25 z M75,10 h15 v15 h-15 z"
              />
              <path
                fill="#000"
                d="M0,65 h35 v35 h-35 z M5,70 v25 h25 v-25 z M10,75 h15 v15 h-15 z"
              />
              <rect x="42" y="5" width="10" height="25" fill="#000" />
              <rect x="42" y="42" width="16" height="16" fill="#000" />
              <rect x="65" y="42" width="25" height="10" fill="#000" />
              <rect x="5" y="42" width="25" height="10" fill="#000" />
              <rect x="42" y="70" width="10" height="25" fill="#000" />
              <rect x="65" y="65" width="15" height="15" fill="#000" />
              <rect x="85" y="85" width="15" height="15" fill="#000" />
            </svg>
          </div>
        </div>

        <!-- Column 2: Follow us -->
        <div class="footer-col">
          <h4 class="col-title">Follow us</h4>
          <ul class="footer-links">
            <li>
              <a href="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                  ></path>
                </svg>
                Facebook
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  ></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a href="#">
                <svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.2a6.34 6.34 0 0 0-5.46 6.22 6.34 6.34 0 1 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.71 1.52v-3.4a4.85 4.85 0 0 1-1-.02z"
                  />
                </svg>
                TikTok
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                  ></path>
                  <polygon
                    points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                  ></polygon>
                </svg>
                Youtube
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Customer Services -->
        <div class="footer-col">
          <h4 class="col-title">Customer Services</h4>
          <ul class="footer-links">
            <li>
              <RouterLink to="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Online exchange policy
              </RouterLink>
            </li>
            <li>
              <RouterLink to="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Privacy Policy
              </RouterLink>
            </li>
            <li>
              <RouterLink to="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  ></path>
                </svg>
                FAQs & guides
              </RouterLink>
            </li>
            <li>
              <RouterLink to="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Find a Store
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Column 4: Contact us -->
        <div class="footer-col">
          <h4 class="col-title">Contact us</h4>
          <ul class="footer-links">
            <li>
              <a href="mailto:pinkcosmetic@gail.com">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                pinkymakeup@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+855085330330">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                (+855) 085 330 330
              </a>
            </li>
            <li>
              <a href="#">
                <svg
                  class="link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Copyright Bottom -->
    <div class="footer-bottom">
      <p>©Pinky. All right reserved</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #ffd8e5;
  color: #333333;
  margin-top: auto;
}

.footer-main {
  max-width: 1300px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.2fr;
  gap: 2.5rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo-circle {
  width: 70px;
  height: 70px;
  /* background-color: #ff5b93; */
  /* border-radius: 50%; */
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white; */
  /* text-align: center; */
  /* line-height: 1; */
  /* flex-shrink: 0; */
}
.logo-circle .logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #000000;
  margin: 0;
}

.brand-desc {
  font-size: 0.88rem;
  color: #555555;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  max-width: 380px;
}

.subscribe-form {
  display: flex;
  max-width: 340px;
  margin-bottom: 2rem;
}

.subscribe-form input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #ffffff;
  border-radius: 6px 0 0 6px;
  outline: none;
  font-size: 0.85rem;
  background: #ffffff;
}

.subscribe-form input::placeholder {
  color: #999999;
}

.subscribe-form button {
  background-color: #ee5b88;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0 6px 6px 0;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background-color 0.2s;
}

.subscribe-form button:hover {
  background-color: #d84875;
}

.app-qr-section h4 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #000000;
}

.qr-code {
  width: 75px;
  height: 75px;
  background: #ffffff;
  padding: 4px;
  border-radius: 4px;
}

.col-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1.25rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-links a {
  text-decoration: none;
  color: #222222;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #ee5b88;
}

.link-icon {
  width: 16px;
  height: 16px;
  color: #000000;
  flex-shrink: 0;
}

.footer-bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1rem 1.5rem;
  text-align: right;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-bottom p {
  font-size: 0.75rem;
  color: #666666;
  margin: 0;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .brand-col {
    grid-column: span 2;
  }
}

@media (max-width: 550px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .brand-col {
    grid-column: span 1;
  }
  .footer-bottom {
    text-align: center;
  }
}
</style>
