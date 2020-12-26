/* *@description: filght-detail *@author: hanyuchen *@date: 2020-12-17 15:22:10
*/
<template>
  <div class="filght-detail">
    <div class="filght-detail-search">
      <!-- <div class="title-item">
        <label>航班编号</label>
        <span>SD223344</span>
      </div> -->
      <div class="title-item">
        <label>出行时间</label>
        <span>{{ flightDetail.startTime }}</span>
      </div>
      <div class="title-item">
        <label>到达时间</label>
        <span>{{ flightDetail.endTime }}</span>
      </div>
      <div class="title-item">
        <label>出发地</label>
        <span>{{ flightDetail.startPoint }}</span>
      </div>
      <div class="title-item">
        <label>到达地</label>
        <span>{{ flightDetail.endPoint }}</span>
      </div>
    </div>
    <div class="filght-detail-list">
      <p class="filght-detail-title">乘客列表</p>
      <SectionList :columns="columns" :datas="flightDetail.users"></SectionList>
    </div>
  </div>
</template>

<script>
export default {
  name: "filght-detail",

  components: {},

  data() {
    return {
      flightDetail: {},
      columns: [
        {
          title: "乘客姓名",
          key: "name",
          align: "center",
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
          render(h, params) {
            let sex = "";
            if (params.row.sex === "0") sex = "女";
            if (params.row.sex === "1") sex = "男";
            return h("span", {}, sex);
          },
        },
        {
          title: "联系电话",
          key: "phone",
          align: "center",
        },
      ],
    };
  },

  computed: {},

  props: {},

  methods: {
    getFlightById() {
      this.$get("get-flight-by-id", { id: this.$route.query.id }).then(
        (res) => {
          this.flightDetail = res;
        }
      );
    },
  },

  mounted() {
    this.getFlightById();
  },
};
</script>
<style lang="less" scoped>
.filght-detail {
  padding: 50px;
  &-search {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .title-item {
      display: flex;
      align-items: center;
      margin-right: 30px;
      span {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #f7a200;
        line-height: 28px;
        margin-left: 20px;
      }
    }
  }
}
.filght-detail-title {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #253555;
  line-height: 44px;
  margin-bottom: 20px;
}
.add-filght-detail {
  padding: 20px;
}
.action {
  span {
    margin: 10px;
    cursor: pointer;
  }
}
</style>
