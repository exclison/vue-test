/* * @name:AreaCascader * @description: * @auth:hanyuchen * @date: 2020-12-26
17:47 */
<template>
  <div class="AreaCascader">
    <Cascader :data="areaList" v-bind="$attrs" v-on="$listeners"></Cascader>
  </div>
</template>

<script>
import { cityList } from "../../../library/city";
export default {
  name: "AreaCascader",

  components: {},

  data() {
    return {
      areaList: [],
    };
  },

  computed: {},

  mounted() {
    this.areaList = this.parseList(cityList.provinces);
  },

  methods: {
    parseList(data) {
      data = data.map((i) => {
        const obj = {
          value: i.provinceName || i.citysName,
          label: i.provinceName || i.citysName,
          children: i.citys || [],
        };
        if (i.citys && i.citys.length > 0) {
          obj.children = this.parseList(i.citys);
        }else{
            delete obj.children
        }

        return obj;
      });
      return data
    },
  },
};
</script>

<style scoped lang="less">
.AreaCascader {
}
</style>
