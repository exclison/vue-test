/* *@description: index *@author: hanyuchen *@date: 2020-12-17 10:33:53 */
<template>
  <div class="section-list">
    <Table :columns="columns" :data="datas"></Table>
  </div>
</template>

<script>
export default {
  name: "SectionList",

  components: {},

  data() {
    return {

    };
  },

  computed: {},

  props: {
    params: {
      type: Object,
      default() {
        return {};
      },
    },
    onLoad: {
      type: Function,
      default() {
        return () => {};
      },
    },
    datas: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    
  },

  methods: {
    search() {},
  },

  mounted() {},
};
</script>
<style lang="less" scoped>
.section-list {
}
</style>
