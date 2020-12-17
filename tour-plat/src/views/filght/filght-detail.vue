/* *@description: filght-detail *@author: hanyuchen *@date: 2020-12-17 15:22:10
*/
<template>
  <div class="filght-detail">
    <div class="filght-detail-search">
      <div class="title-item">
        <label>航班编号</label>
        <span>SD223344</span>
      </div>
      <div class="title-item">
        <label>出行时间</label>
        <span>SD223344</span>
      </div>
      <div class="title-item">
        <label>到达时间</label>
        <span>SD223344</span>
      </div>
      <div class="title-item">
        <label>出发地</label>
        <span>SD223344</span>
      </div>
      <div class="title-item">
        <label>到达地</label>
        <span>SD223344</span>
      </div>
      <!-- <Button type="primary" @click="isAddHotel = true">添加航班</Button> -->
    </div>
    <div class="filght-detail-list">
      <p class="filght-detail-title">乘客列表</p>
      <SectionList :columns="columns" :datas="dataList"></SectionList>
    </div>
  </div>
</template>

<script>
export default {
  name: "filght-detail",

  components: {},

  data() {
    return {
      isAddHotel: false,
      formHotel: {
        user: "",
      },
      ruleHotel: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
          },
        ],
      },
      columns: [
        {
          title: "乘客姓名",
          key: "name",
          align: "center",
        },
        {
          title: "性别",
          key: "age",
          align: "center",
        },
        {
          title: "联系电话",
          key: "address",
          align: "center",
        },
        {
          title: "操作",
          key: "address",
          align: "center",
          render: (h, params) => {
            return (
              <p class="action">
                <span
                  onClick={() => {
                    this.isAddHotel = true;
                  }}
                >
                  编辑
                </span>
                <span onClick={() => {}}>删除</span>
              </p>
            );
          },
        },
      ],
      dataList: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
    };
  },

  computed: {},

  props: {},

  methods: {
    onConfirm() {
      this.$alertSuccess("操作成功");
      this.$alertConfirm({ content: "阿卡脸上的肌肤轮廓的减肥了" });
    },
  },

  mounted() {},
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
