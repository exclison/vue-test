<!--  -->
<template>
  <div>
      <!-- 属性 -->
      <h3>{{msg}}</h3>
      <!-- 新增特性 -->
      <p><input type="text" @keydown.enter="addFeature"></p>
      <!-- ts特性列表 -->
      <ul>
          <li v-for="frature in features"  :key="frature.id">{{frature.name}}</li>
          <li>特性总数:{{count}}</li>
      </ul>
  </div>
</template>

<script lang="ts">
// import {Prop,Vue} from 'vue-property-decorator';
import {Component,Prop,Vue} from 'vue-property-decorator';
// import { component } from 'vue/types/umd';
// import {Feature} from '../types'
// import {getFeatures} from '../api/frature'

//目标:返回组件构造函数
// function Component(options: any) {
//     return function(target: any){
//         //返回组件构造函数即可
//         Vue.extend(options)
//     }
// }

@Component({
    props:{
        msg: String
    }
})
export default class Hello extends Vue {
    // //属性就是data
    // features: Feature[] = []

    // //括号中的配置是给Vue的
    // //变量附近的配置是给ts的
    // // @Prop({type: String,required: true}) msg!: string

    // //函数直接作为回调
    // // @Emit()
    // addFeature(e: KeyboardEvent): void{
    //     // target 类型EventTarget
    //     const inp = e.target as HTMLInputElement
    //     this.features.push({id: this.features.length + 1,name: inp.value})
    //     inp.value = ''
    // }

    // //如果和生命周期钩子同名,就是生命周期
    // created () {
    //     getFeatures().then(res => {
    //         this.features = res.data
    //     })
    //     // this.$axios
    //     // this.features = [{id:1,name:'类型注解'}]
    // }

    // // 存取器用于计算属性
    // get count(){
    //     return this.features.length
    // }
}

</script>
<style lang='less' scoped>
</style>