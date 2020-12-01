import Vue from 'vue'
import App from './App.vue'
// import router from './krouter'
// import store from './kstore'
import store from './store'
import router from './router'

import './assets/icons/index'

import './plugins/utils'
import './plugins/table'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
