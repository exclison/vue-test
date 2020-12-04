import VueRouter from "vue-router";

const routes = [
  { path: "/",redirect: '/home' },
  { path: "/home", component: () => import("../views/home/index.vue") },
];
const router = new VueRouter({
  mode: "history",
  routes,
});
export default router;
