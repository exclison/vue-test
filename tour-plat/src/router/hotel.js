export default [
  {
    path: "/hotel",
    name: "hotel",
    component: () => import("../views/hotel/index.vue"),
  },
  {
    path: "/hotel-detail",
    name: "hotel-detail",
    component: () => import("../views/hotel/hotel-detail.vue"),
  },
];
