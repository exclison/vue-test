<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-09-01 11:01:30
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-11-01 10:41:17
 * @FilePath: \vue-test\vite_vue3_ts\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <router-view></router-view>
  </div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <Decorators></Decorators>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Decorators from "./components/Decorators.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    Decorators,
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
