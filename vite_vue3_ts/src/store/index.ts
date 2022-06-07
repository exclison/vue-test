
import { createStore } from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";



// 创建一个新的 store 实例
const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store

