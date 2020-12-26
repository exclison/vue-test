import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components/main";
import Util from "./library/util";
import mixins from "./config/mixin"
import "./plugins/iview";
import "./assets/styles/index.less";

Object.keys(components).forEach((key) => Vue.component(key, components[key]));

Vue.use(Util);
Vue.mixin(mixins)

Vue.config.productionTip = false;

store.dispatch("getUserInfo").then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
