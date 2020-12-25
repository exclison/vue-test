import Vue from "vue";
import Vuex from "vuex";
import config from "../config/config";
import { $get } from "../library/ajax";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    login(state, userInfo) {
      Object.keys(userInfo).forEach((key) => {
        Vue.set(state.userInfo, key, userInfo[key]);
      });
      const userJson = JSON.stringify(state.userInfo);
      window.localStorage.setItem(config.base_name + "userInfo", userJson);
    },
    logout(state) {
      state.userInfo = {};
      window.localStorage.removeItem(config.base_name + "userInfo");
    },
  },
  actions: {
    async getUserInfo(ctx) {
      const userInfo = JSON.parse(
        window.localStorage.getItem(config.base_name + "userInfo")
      );
      const ticket = userInfo ? userInfo.ticket || "" : "";
      if (!ticket) {
        ctx.commit("logout");
        return;
      }
      $get("get-user-info", null, { header: { ticket } })
        .then((res) => {
          ctx.commit("login", res);
        })
        .catch(() => {
          console.log('eee')
          ctx.commit("logout");
        });
    },
  },
  modules: {},
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
    getToken(state) {
      return state.userInfo.ticket || "";
    },
  },
});
