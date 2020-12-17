/* *@description: alert-drawer *@author: hanyuchen *@date: 2020-12-17 11:02:37
*/
<template>
  <div class="alert-drawer">
    <Drawer
      :title="title"
      :closable="false"
      v-model="isShow"
      :width="width"
      @on-visible-change="onVisibleChange"
    >
      <div class="drawer-content">
        <div>
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer" v-if="$slots.footer"></slot>
          <div v-else class="footer-button">
            <Button type="primary" ghost @click="onCancel">取消</Button>
            <Button type="primary" @click="onConfirm">确定</Button>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "AlertDrawer",

  components: {},

  data() {
    return {
      isShow: this.value,
    };
  },

  computed: {},

  model: {
    prop: "value",
    event: "on-state-change",
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 500,
    },
    title: {
      type: String,
      default: "标题",
    },
  },

  methods: {
    onConfirm() {
      this.isShow = false;
      this.$emit("on-confirm");
    },
    onCancel() {
      this.isShow = false;
      this.$emit("on-cancel");
    },
    onVisibleChange(e) {
      console.log(e);
      this.isShow = e;
      this.$emit("on-state-change", e);
    },
  },

  mounted() {
    console.log(this.$slots);
  },
  watch: {
    value() {
      this.isShow = this.value;
    },
  },
};
</script>
<style lang="less" scoped>
.alert-drawer {
  width: 100%;
  height: 100%;
}
.footer {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.footer-button {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 30px;
    width: 120px;
    height: 40px;
  }
}
.drawer-content {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
