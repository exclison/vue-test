/* *@description: header *@author: hanyuchen *@date: 2020-12-16 17:25:19 */
<template>
  <div class="header">
    <div class="header-title">
      <span>旅游管理平台</span>
    </div>
    <div></div>
    <div>
      <Dropdown>
        <span class="name-title">
          张三
          <Icon type="ios-arrow-down"></Icon>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem>个人中心</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  components: {},

  data() {
    return {};
  },

  computed: {},

  methods: {},

  mounted() {},
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  background: #168bf5;
  padding: 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-title {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 33px;
  }
  .name-title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #d0e7fd;
    line-height: 25px;
  }
}
</style>
