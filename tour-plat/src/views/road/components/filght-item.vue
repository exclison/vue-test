/*
 *@description: filght-item
 *@author: hanyuchen
 *@date: 2020-12-17 16:25:07
*/
<template>
  <div class="filght-item">
      <div class="flex flex-vc title-item">
          <div class="flex flex-vc con-item">
              <label>姓名:</label>
              <span>张三</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>出发时间:</label>
              <span>202012/17 17:00:00</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>到达时间:</label>
              <span>202012/17 19:00:00</span>
          </div>
      </div>
      <div class="flex flex-vc title-item">
          <div class="flex flex-vc con-item">
              <label>航班编号:</label>
              <span>B495</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>出发地:</label>
              <span>长春</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>到达地:</label>
              <span>天津</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {

  name: 'filght-item',

  components: {},

  data () {
    return {
    };
  },

  computed: {},

  props: {},

  methods: {},

  mounted() {},
}

</script>
<style lang='less' scoped>
.filght-item{
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 23px;
    margin: 20px;
    padding: 10px 20px;
}
.title-item{
    margin-bottom: 10px;
}
.con-item{
    width: 30%;
    margin-left: 30px;
    label{
        line-height: 30px;
    }
    span{
        margin-left: 20px;
    }
}
</style>