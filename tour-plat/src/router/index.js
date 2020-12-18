import Vue from "vue";
import VueRouter from "vue-router";

import hotel from './hotel'
import users from './users'
import filght from './filght'
import road from './road'
import personalcenter from './personalcenter'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/hotel',
    component: () => import("../views/home/index.vue"),
    children:[
      ...hotel,
      ...users,
      ...filght,
      ...road,
      ...personalcenter,
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
