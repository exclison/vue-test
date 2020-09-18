import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import hello from './hello'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect: '/home'
    },
    home,
    hello,
]

const router = new VueRouter({
    mode: 'history',
    routes // (缩写) 相当于 routes: routes
  })

export default router