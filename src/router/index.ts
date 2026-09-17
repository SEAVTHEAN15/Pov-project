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

  // Separate Admin Login Route
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("@/views/AdminLoginView.vue"),
  },

  // Protected Admin Routes Setup
  {
    path: "/admin",
    component: () => import("@/views/admin/AdminLayout.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("@/views/admin/DashboardOverview.vue"),
      },
      {
        path: "products",
        name: "admin-products",
        component: () => import("@/views/admin/ProductManagement.vue"),
      },
      {
        path: "orders",
        name: "admin-orders",
        component: () => import("@/views/admin/OrderManagement.vue"),
      },
    ],
  },

  // 404 Catch-All Route
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("user_token");
  const userRole = localStorage.getItem("user_role");
  const isAuthenticated = !!token;
  const isAdmin = userRole === "admin";

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  // 1. Check Admin protection
  if (requiresAdmin) {
    if (!isAuthenticated) {
      return next({ path: "/admin/login", query: { redirect: to.fullPath } });
    }
    if (!isAdmin) {
      return next({ path: "/" });
    }
  }

  // 2. Check Standard User protection
  if (requiresAuth && !isAuthenticated) {
    return next({ path: "/login", query: { redirect: to.fullPath } });
  }

  // 3. Redirect authenticated users away from login/register
  if (isAuthenticated && (to.name === "login" || to.name === "register")) {
    return next({ path: "/" });
  }

  next();
});

export default router;
