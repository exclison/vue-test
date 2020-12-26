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
              <span>{{dataOptions.hotel_name}}</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>服务热线:</label>
              <span>{{dataOptions.hotel_phone}}</span>
          </div>
      </div>
      <div class="flex flex-vc title-item">
          <div class="flex flex-vc con-item">
              <label>房间号:</label>
              <span>{{dataOptions.room_num}}</span>
          </div>
          <div class="flex flex-vc con-item">
              <label>姓名:</label>
              <span>{{dataOptions.user_name}}</span>
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

  props: {
      dataOptions:{
          type:Object,
          default:()=>{}
      },
  },

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
    padding: 10px 20px;
    margin: 10px 0;
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