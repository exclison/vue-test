//保存构造函数的饮用，避免import
let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._wrappedGetters = options.getters;
    this.getters = {}

    // console.log(this._wrappedGetters,'ghgh');

    // resetGetter(this)
    //获取getters
    const wrappedGetter = this._wrappedGetters
    const computed = {} //计算方法，将放入vue实例中

    // forEachValue(wrappedGetter,(fn,key)=>{
    //     computed[key] = partial(fn,options.state)

    //     Object.defineProperty(this.getters,key,{
            
    //         get:()=>this._vm[key],
    //         enumerable:true
    //     })
    // })

    for(let key in wrappedGetter){

        //获取getter函数
        const fn = wrappedGetter[key]
        //解析getter函数并将其添加到计算属性中
        computed[key] = partial(fn,options.state)

        //将getter值写入this.getters中
        Object.defineProperty(this.getters,key,{
            
            get:()=>this._vm[key],
            enumerable:true
        })
        

    }

    //创建vue实例以保持响应式
    this._vm = new Vue({
        data:{
            //加两个$，Vue不做代理
            $$state:options.state
        },
        computed
    })
    // 响应化处理state
    // this.state = new Vue({
    //   data: options.state,
    // });

    

    //绑定commit、dispatch的上下文store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

  }

  

  //存取器，store.state
  get state(){
    //   console.log(this._vm,'ooo');
    return this._vm ? this._vm._data.$$state : {}
  }

  set state(v){
      console.error('不能直接修改state');
  }

  //store.commit('MUTATIONS', payload)
  //type:mutation 的类型
  //payload:载荷，是参数
  commit(type, payload) {
    const entry = this._mutations[type];
    if (entry) {
      entry(this.state, payload);
    }
  }

  dispatch(type,payload) {
    const entry = this._actions[type];
    if (entry) {
      entry(this, payload);
    }
  }
}
// function resetGetter(store){
//     const wrappedGetter = store._wrappedGetters
//     const computed = {}

//     for(let key in wrappedGetter){
//         const fn = wrappedGetter[key]
//         computed[key] = partial(fn,store.state)
//         console.log(partial(fn,store.state))

//         Object.defineProperty(store.getters,key,{
//             get:()=>store._vm[key],
//             enumerable:true
//         })
        

//     }

//     store._vm = new Vue({
//         data:{
//             //加两个$，Vue不做代理
//             $$state:store.$options.state
//         },
//         computed
//     })
//     console.log(store,'kkkk');
// }
function partial(fn,arg){
    return function(){
        return fn(arg)
    }
}
// function forEachValue (obj, fn) {
//     Object.keys(obj).forEach(key => fn(obj[key], key))
//   }
function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}
//vuex
export default {
  Store,
  install,
};
