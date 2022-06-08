

<template>
  <h1>{{ msg }}</h1>
  <h1 @click="genUserInfoCon">点击发送请求</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>


<script lang="ts">
import { ref, defineComponent,getCurrentInstance } from 'vue'
import {useStore} from 'vuex'
import mapApi from '../library/map_api'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: (props,context) => {
    // const internalInstance = getCurrentInstance()
    // const globalProperties = internalInstance?internalInstance.appContext.config.globalProperties:{}


    const methodList = mapApi('common',['getUserInfo','getUserList','getUserInfoCon'])
    // console.log(methodList,'methodlist')

    methodList.getUserInfo().then((res:any)=>{
      // console.log(res,'res')
    })

    const genUserInfoCon = ()=>{
      methodList.getUserInfoCon().then(res=>{
        console.log('res')
      })
    }

    const store = useStore()

    store.commit('updateCount')

    console.log(store.state.count)

    // console.log(globalProperties ,'kkk')
    // globalProperties.$get('common/user/get-user-info/',{id:111,name:'111'}).then((res:any)=>{
    //   console.log(res,'res')
    // })
    const count = ref(0)
    return { count,genUserInfoCon }
  }
})
</script>
<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
