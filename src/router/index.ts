import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductCategoryView from "@/views/ProductCategoryView.vue";
import ServicesView from "@/views/ServicesView.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import CartView from "@/views/CartView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: HomeView },
  { path: "/products", name: "products", component: ProductsView },
  {
    path: "/products/:category",
    name: "product-category",
    component: ProductCategoryView,
    props: true,
  },
  { path: "/services", name: "services", component: ServicesView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/cart", name: "cart", component: CartView },
  {
    path: "/product/:id",
    name: "product-detail",
    component: () => import("@/views/ProductDetailView.vue"),
    props: true,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesView,
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("@/views/PaymentView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/ForgotPasswordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// ប្ដូរពី 'from' ទៅ '_from' ដើម្បីលុប warning (Unused variable)
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem("user_token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
