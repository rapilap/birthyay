import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/HelloWorld.vue";
import Wishes from "../components/Wishes.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/wishes", name: "Wishes", component: Wishes },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
