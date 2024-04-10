<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-02-02 15:03:49
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-02-28 13:40:07
 * @FilePath: \lrx_h5\src\components\Footer\footer.vue
 * @Description: footer
-->
<template>
  <div class="footer" :style="footer_style">
    <span>{{ config.icp }} </span>
    <span @click="handleRoute">{{config.cop}}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "Footer",
};
</script>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useConfigStore } from "@/store/config";

const configStore = useConfigStore();
const config = configStore.getConfigState;

const route = useRoute();
const router = useRouter();

const footer_style = computed(() => {
  const color: string | undefined | null = route.meta.footerBackColor as string | undefined | null;
  const footerColor: string | undefined | null =
    (route.meta.footerColor as string | undefined | null) || "hsla(0, 0%, 100%, 0.5)";
  const backcolor = color ? color : "#676262";
  return {
    background: backcolor,
    color: footerColor,
  };
});

function handleRoute() {
  router.push("/bqsm");
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsla(0, 0%, 100%, 0.5);
  & > span {
    font-size: 26px;
    margin: 0 4px;
    &:last-child {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
