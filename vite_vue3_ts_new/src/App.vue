<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-30 15:24:54
 * @LastEditors: Hanyuchen e-exclison@outlook.ocm
 * @LastEditTime: 2024-04-10 10:47:01
 * @FilePath: \lrx_h5\src\App.vue
 * @Description: 
-->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.path" v-if="$route.meta.keep_alive" />
      </keep-alive>
      <component :is="Component" :key="$route.path" v-if="!$route.meta.keep_alive" />
    </router-view>
    <!-- <Footer v-show="$route.path !== '/'"></Footer> -->
  </div>
</template>
<script setup lang="ts">
// import mapApi from "@/library/map_api";
// import { useMenuStore } from "@/store/menu";
// import { useConfigStore } from "@/store/config";
// // import VConsole from "vconsole";

// // const vConsole = new VConsole();

// const menuStore = useMenuStore();
// const method_list = mapApi("common", ["menu_text", "home_index"]);
// function get_menu_list() {
//   method_list.menu_text().then((res: any) => {
//     menuStore.updateMenuList(res);
//   });
// }
// get_menu_list();

// const configStore = useConfigStore();
// configStore.getConfig();
// // 访问量统计
// method_list.home_index()
</script>
<style></style>
