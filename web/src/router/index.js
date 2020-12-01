import VueRouter from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/home/index.vue") },
];
const router = new VueRouter({
  mode: "history",
  routes,
});
export default router;
