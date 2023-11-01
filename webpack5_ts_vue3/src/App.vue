/* * @name:App * @description: * @auth:hanyuchen * @date: 2022-04-18 10:32 */
<template>
  <div class="App">
    <h1>这是Vue3+ts</h1>
    <img src="./assets/images/404.png" alt="" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
export default defineComponent({
  name: "App",

  setup(props, ctx) {
    onMounted(() => {
      console.log(122);
    });

    let hasMove = true;
    function onRender() {
      console.log("render");
      hasMove && (hasMove = true);
      if (hasMove && customLayer?.De?.visible) {
        console.log("hide");
        customLayer.hide();
      }
      const mapPixel = getMapDistance2Pixel(mapObj);
      _width = settingObj.gridValue / mapPixel;

      function debounceFun() {
        if (!customLayer?.De?.visible) {
          customLayer.render = null;
          hasMove = false;
          customLayer.show();
          setTimeout(() => {
            customLayer.render = onRender;
          }, 500);
        }
        draw(_width);
      }

      if (customLayer?.De?.visible) {
        hasMove = true;
      }

      common.debounce(debounceFun, 300);
    }

    return {};
  },
});
</script>

<style scoped lang="less">
.App {
}
</style>
