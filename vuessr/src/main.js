import Vue from 'vue'
import App from './App.vue'
import {createStore} from './store'
import  { createRouter } from './router'


Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

// 返回工厂函数,每次请求创建一个vue实例
export function createApp(context){
  //1.创建路由器实例
  const router = createRouter()
  const store = createStore()
  //2.创建vue实例
  const app = new Vue({
    router,
      store,
      context,
      render: h => h(App)
  })

  return {app,router}
}