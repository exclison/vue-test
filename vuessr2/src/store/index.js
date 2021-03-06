import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(){
  return new Vuex.Store({
    state: {
      items:{}
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    },
    actions: {
      fetchItem ({ commit }, id) {
        console.log(id,'888');
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return commit('setItem', { id:id, item:'444' })
      }
    },
    modules: {
    }
  })
}
