import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import PostDetail from "@/views/PostDetail.vue";
import Profile from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import PostManager from "@/views/PostManager.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
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
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { layout: "auth" },
    },
    {
      path: "/register",
      name: "register",
      component: () => Register,
      meta: { layout: "auth" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => Dashboard,
    },
  ],
});

// Chặn điều hướng nếu chưa đăng nhập
router.beforeEach((to, form, next) => {
  const loggedInUser = localStorage.getItem("user");

  if (to.meta.requiresAuth && !loggedInUser) {
    alert("cc");
    next("/login");
  } else {
    next();
  }
});

export default router;
