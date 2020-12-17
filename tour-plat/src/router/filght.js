export default [
  {
    path: "/filght",
    name: "filght",
    component: () => import("../views/filght/index.vue"),
  },
  {
    path: "/filght-detail",
    name: "filght-detail",
    component: () => import("../views/filght/filght-detail.vue"),
  },
];
