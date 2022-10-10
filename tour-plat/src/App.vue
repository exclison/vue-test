<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-05-17 15:07:21
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-09-21 17:01:38
 * @FilePath: \vue-test\tour-plat\src\App.vue
 * @Description: 
-->
<template>
  <div id="tour_plat">
    这是子应用
    <router-link to="/hotel">hotel</router-link>
    <router-link to="/home">home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>