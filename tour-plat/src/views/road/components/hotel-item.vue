/*
 *@description: hotel-item
 *@author: hanyuchen
 *@date: 2020-12-17 16:24:54
*/
<template>
  <div class="hotel-item">
      <div class="flex flex-vc title-item">
          <div class="flex flex-vc con-item">
              <label>酒店:</label>
              <span>速八酒店</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>联系电话:</label>
              <span>1332334545</span>
          </div>
      </div>
      <div class="flex flex-vc title-item">
          <div class="flex flex-vc con-item">
              <label>房间号:</label>
              <span>B495</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>日期:</label>
              <span>202012/17--2020/12/19</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {

  name: 'hotel-item',

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
.hotel-item{
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
    width: 45%;
    margin-left: 30px;
    label{
        line-height: 30px;
    }
    span{
        margin-left: 20px;
    }
}
</style>