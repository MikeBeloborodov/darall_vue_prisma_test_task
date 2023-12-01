import { createRouter, createWebHistory } from "vue-router";
import MenuView from "../views/MenuView.vue";
import RedactMenuView from "../views/RedactMenuView.vue";
import PageNotFoundView from "../views/PageNotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/menu",
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuView,
    },
    {
      path: "/redact",
      name: "redact",
      component: RedactMenuView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page-not-found",
      component: PageNotFoundView,
    },
  ],
});

export default router;
