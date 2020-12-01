
import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'
import router from './router/index'

Vue.use(VueRouter)


new Vue({
    router,
    render:(h) => h(app)
}).$mount('#app')