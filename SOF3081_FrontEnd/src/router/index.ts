import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/post/:id",
      name: "post-detail",
      component: () => import("../views/PostDetail.vue"),
    },
  ],
});

export default router;
