import Vue from "vue";
import App from "./App.vue";

// import router from './router'
import { createRouter } from "./router";

// import store from './store'

import { createStore } from "./store";
import { sync } from "vuex-router-sync";

Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

export function createApp() {
  // 创建 router 实例
  const router = createRouter();
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
  });
  // 返回 app 和 router
  return { app, router,store };
}
