/* *@description: index *@author: hanyuchen *@date: 2020-12-17 09:26:47 */
<template>
  <div class="road">
    <div class="container">
      <div class="item-a">
        <div class="title-item">我的酒店</div>
        <div>
            <HotelItem v-for="i in tripInfo.hotelList" :key="i.hotel_id" :dataOptions="i"></HotelItem>
        </div>
      </div>
      <div class="item-b">
        <div class="title-item">我的机票</div>
        <div>
            <FilghtItem v-for="i in tripInfo.flightList" :key="i.hotel_id" :dataOptions="i"></FilghtItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilghtItem from './components/filght-item'
import HotelItem from './components/hotel-item'
export default {
  components: {
      FilghtItem,
      HotelItem,
  },

  data() {
    return {
      tripInfo:{},
    };
  },

  computed: {},

  methods: {
    getTripInfo(){
      this.$get('get-trip-info').then(res=>{
        this.tripInfo = res
      })
    },
  },

  mounted() {
    this.getTripInfo()
  },
};
</script>
<style lang="less" scoped>
.road {
  padding: 100px;
}
.title-item {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #253555;
  line-height: 44px;
  margin-bottom: 30px;
}
.item-a {
  grid-area: hotel;
  padding: 10px;
}

.item-b {
  grid-area: filght;
  padding: 10px;
}

.container {
  width: 100%;

  height: 1000px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  grid-template-rows: 500px;

  grid-template-areas:
    "hotel filght";
}
</style>
