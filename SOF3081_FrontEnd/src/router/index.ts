import { createRouter, createWebHistory } from "vue-router";
import PublicLayout from "@/layouts/PublicLayout.vue";
import Home from "@/views/Home.vue";
import PostDetail from "@/views/PostDetail.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import PostManager from "@/views/PostManager.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Forbidden from "@/views/Forbidden.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //1. Dùng navbar - footer
    {
      path: "/",
      component: PublicLayout,
      children: [
        {
          path: "/",
          name: "Home",
          component: Home,
        },
        {
          path: "/post-manager",
          name: "PostManager",
          component: PostManager,
          meta: { requiresAuth: true },
        },
        {
          path: "/post/:id",
          name: "post-detail",
          component: PostDetail,
        },
        {
          path: "/Profile",
          name: "Profile",
          component: Profile,
        },
      ],
    },
    // 2. đăng nhập - đăng kí - forbidden (không dùng navbar - footer)
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { layout: "auth" },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { layout: "auth" },
    },
    {
      path: "/forbidden",
      name: "Forbidden",
      component: Forbidden,
    },

    // 3. Dùng AdminLayout
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "",
          name: "admin-dashboard",
          redirect: "/admin/dashboard",
        },
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("@/views/Dashboard.vue"),
        },
      ],
    },
  ],
});

// Chặn điều hướng nếu chưa đăng nhập
router.beforeEach((to, form, next) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else if (to.meta.requiresAdmin && user.role != "admin") {
    next("/forbidden");
  } else {
    next();
  }
});

export default router;
