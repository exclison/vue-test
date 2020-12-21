import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import hotel from "./hotel";
import users from "./users";
import filght from "./filght";
import road from "./road";
import personalcenter from "./personalcenter";
import config from '../config/config'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/hotel",
    component: () => import("../views/home/index.vue"),
    children: [...hotel, ...users, ...filght, ...road, ...personalcenter],
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

router.beforeEach((to, from, next) => {
  // const ticket = store.state.userInfo.ticket || null
  const userInfo = JSON.parse(
    window.localStorage.getItem(config.base_name + "userInfo")
  );
  const ticket = userInfo ? userInfo.ticket || "" : "";
  if (to.name === "login" && ticket) {
    next("/");
  }
  if (to.name !== "login" && !ticket) {
    store.commit('logout')
    next("/login");
  }
  next();
});

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

export default router;
