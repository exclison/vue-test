<!--
 * @Author: Hanyuchen e-exclison@outlook.ocm
 * @Date: 2024-04-10 10:44:45
 * @LastEditors: Hanyuchen e-exclison@outlook.ocm
 * @LastEditTime: 2024-04-10 10:49:35
 * @FilePath: \vite_vue3_ts_new\src\views\home\home.vue
 * @Description: 
-->
<template>
  <div class="home">
    首页
  </div>
</template>

<script lang="ts">
export default {
  name: "home",
};
</script>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { menu_list2 } from "@/router/menu_list";

const router = useRouter();
const menu_item_style = computed(() => (menu_item: any, index: number) => {
  return {
    backgroundImage: `url(${menu_item.image})`,
  };
});

function handleMenu2Route(menu_item: any) {
  router.push(menu_item.path);
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
