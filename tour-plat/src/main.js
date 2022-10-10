/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-05-17 15:07:21
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-09-21 17:55:19
 * @FilePath: \vue-test\tour-plat\src\main.js
 * @Description: 
 */
import './public-path';
import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import routes from "./router";
import VueRouter from "vue-router";

// import router from "./router";
import store from "./store";
import components from "./components/main";
import Util from "./library/util";
import mixins from "./config/mixin"
import "./plugins/iview";
import "./assets/styles/index.less";

Object.keys(components).forEach((key) => Vue.component(key, components[key]));

Vue.use(Util);
Vue.use(VueRouter);
Vue.mixin(mixins)

Vue.config.productionTip = false;

// store.dispatch("getUserInfo").then(() => {
//   new Vue({
//     router,
//     store,
//     render: (h) => h(App),
//   }).$mount("#app");
// });




let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  console.log(container,'container')
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/test/vue/' : '/vue/',
    mode: 'history',
    routes,
  });
  console.log(router,'router')
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#tour_plat') : '#tour_plat');
  // store.dispatch("getUserInfo").then(() => {
  //   instance = new Vue({
  //     router,
  //     store,
  //     render: (h) => h(App),
  //   }).$mount(container ? container.querySelector('#tour_plat') : '#tour_plat');
  // });
 
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}