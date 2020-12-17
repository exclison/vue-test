/* *@description: index *@author: hanyuchen *@date: 2020-12-17 09:26:47 */
<template>
  <div class="road">
    <div class="container">
      <div class="item-a">
        <div class="title-item">计划路程</div>
        <Timeline>
          <TimelineItem>
            <p class="time">1976年</p>
            <p class="content">Apple I 问世</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">1984年</p>
            <p class="content">发布 Macintosh</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2007年</p>
            <p class="content">发布 iPhone</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2010年</p>
            <p class="content">发布 iPad</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2011年10月5日</p>
            <p class="content">史蒂夫·乔布斯去世</p>
          </TimelineItem>
        </Timeline>
      </div>

      <div class="item-b">
        <div class="title-item">我的酒店</div>
        <div>
            <HotelItem></HotelItem>
        </div>
      </div>

      <div class="item-c">
        <div class="title-item">我的机票</div>
        <div>
            <FilghtItem></FilghtItem>
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
    return {};
  },

  computed: {},

  methods: {},

  mounted() {},
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
  grid-area: road;
  padding: 0 30px;
}

.item-b {
  grid-area: filght;
}

.item-c {
  grid-area: hotel;
}

.container {
  width: 100%;

  height: 1000px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  grid-template-rows: 500px 500px;

  grid-template-areas:
    "road filght"
    "road hotel";
}
</style>
