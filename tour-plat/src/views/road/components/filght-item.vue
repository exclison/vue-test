/*
 *@description: filght-item
 *@author: hanyuchen
 *@date: 2020-12-17 16:25:07
*/
<template>
  <div class="filght-item">
      <div class="flex flex-vc title-item">
          <div class="flex flex-vc con-item" style="width:30%">
              <label>姓名:</label>
              <span>{{dataOptions.user_name}}</span>
          </div>
          <div class="flex flex-vc con-item" style="width:45%">
              <label>出发时间:</label>
              <span>{{dataOptions.startTime}}</span>
          </div>
          <div class="flex flex-vc con-item" style="width:25%">
              <label>出发地:</label>
              <span>{{dataOptions.startPoint}}</span>
          </div>
      </div>
      <div class="flex flex-vc title-item">
          <div class="flex flex-vc con-item" style="width:30%">
              <label>航班名称:</label>
              <span>{{dataOptions.name}}</span>
          </div>
          <div class="flex flex-vc con-item" style="width:45%">
              <label>到达时间:</label>
              <span>{{dataOptions.endTime}}</span>
          </div>
          
          <div class="flex flex-vc con-item" style="width:25%">
              <label>到达地:</label>
              <span>{{dataOptions.endPoint}}</span>
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
.filght-item{
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
    width: auto;
    margin-left: 30px;
    label{
        line-height: 30px;
    }
    span{
        // margin-left: 20px;
    }
}
</style>