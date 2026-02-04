import {createRouter, createWebHistory} from "vue-router";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", name: "Home", component: Home},
    {
      path: "/CreatePost",
      name: "create",
      component: () => import("../views/CreatePost.vue"),
    },
    {
      path: "/post/:id",
      name: "post-detail",
      component: () => import("../views/PostDetail.vue"),
    },
    {
      path: "/Profile",
      name: "Profile",
      component: () => import("../views/Profile.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {layout: "auth"},
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {layout: "auth"},
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: {layout: "auth"},
    },
  ],
});

export default router;
