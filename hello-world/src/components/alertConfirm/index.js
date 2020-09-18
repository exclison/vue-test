
import Vue from 'vue'

function create(component, props) {
    //组件构造函数如何获取
    //1.Vue.extend()
    //2.render 
    const vm = new Vue({
            // h 是createElement,返回VNode,是虚拟dom
            // 需要挂载才能变成真实dom
            render: h => h(component, { props }),
        }).$mount() //不指定宿主元素,会创建真实dom,但是不会追加操作

    // 获取真实dom
    document.body.appendChild(vm.$el)

    const comp = vm.$children[0]

    comp.remove = function(){
        document.body.removeChild(vm.$el)
        vm.$destory()
    }

    return comp

}

export default {
    install(Vue){
        Vue.prototype.$notice = function(Notice,options){
            return create(Notice,options)
        }
    }
}