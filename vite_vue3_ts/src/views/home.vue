/* * @name:home * @description: * @auth:hanyuchen * @date: 2022-06-07 15:16 */
<template>
  <div class="home">
    <office-page></office-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OfficePage from "../components/office.vue";
export default defineComponent({
  name: "home",
  components: {OfficePage},
  props: {},
  setup: (props, context) => {
    return {};
  },
});
</script>

<style scoped lang="scss">
.home {
}
</style>
