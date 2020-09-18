
import view from './krouter-view'
import link from './krouter-link'
let Vue;
//1.实现一个插件：挂载$router

class KVueRouter{
    constructor(options){
        console.log(options,'ddd');
        this.$options = options

        //需要创建响应式的current属性
        Vue.util.defineReactive(this,'current','/')
        // this.current = '/'
        // this.app = new Vue({
        //     data(){
        //         return {
        //             current:'/'
        //         }
        //     }
        // })

        //监控url变化
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        //监控url变化
        window.addEventListener('load',this.onHashChange.bind(this))


        //创建一个路由映射表
        this.routeMap = {}
        options.routes.forEach(route =>{
            this.routeMap[route.path] = route
        })

    }

    onHashChange(){
        this.current = window.location.hash.slice(1)
    }
}

KVueRouter.install = function(_Vue){
    //保存构造函数，在KvueRouter中使用
    Vue = _Vue;

    // 挂载$router
    // 怎么获取根实例中的router选项
    Vue.mixin({
        beforeCreate(){
            // 确保根实例的时候才执行
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })


    // 任务2:实现两个全局的组件router-link和router-view
    Vue.component('router-link',link)
    Vue.component('router-view',view)

}

export default KVueRouter