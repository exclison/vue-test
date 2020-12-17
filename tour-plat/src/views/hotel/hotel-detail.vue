/* *@description: hotel-detail *@author: hanyuchen *@date: 2020-12-17 14:49:27
*/
<template>
  <div class="hotel-detail">
    <div class="hotel-detail-search">
      <Button type="primary" @click="isAddHotel = true">添加房间</Button>
    </div>
    <div class="hotel-detail-list">
      <p class="room-title">房间列表</p>
      <SectionList :columns="columns" :datas="dataList"></SectionList>
    </div>
    <AlertDrawer v-model="isAddHotel" title="添加房间" @on-confirm="onConfirm">
      <div class="add-hotel">
        <Form
          ref="formHotel"
          :model="formHotel"
          :rules="ruleHotel"
          :label-width="110"
        >
          <FormItem label="房间号" prop="user">
            <Input
              type="text"
              v-model="formHotel.user"
              placeholder="Username"
            />
          </FormItem>
          <FormItem label="房间容量" prop="user">
            <Input
              type="text"
              v-model="formHotel.user"
              placeholder="Username"
            />
          </FormItem>
        </Form>
      </div>
    </AlertDrawer>
  </div>
</template>

<script>
export default {
  name: "hotel-detail",

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
          title: "房间号",
          key: "name",
          align: "center",
        },
        {
          title: "状态",
          key: "age",
          align: "center",
        },
        {
          title: "预定人",
          key: "age",
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
                  }}
                >
                  预定
                </span>
                <span
                  onClick={() => {
                    this.isAddHotel = true;
                  }}
                >
                  编辑
                </span>
                <span
                  onClick={() => {
                    this.isAddHotel = true;
                  }}
                >
                  删除
                </span>
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
.hotel-detail {
  padding: 50px;
  &-search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 30px;
  }
}
.room-title {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #253555;
  line-height: 44px;
  margin-bottom: 20px;
}
.add-hotel {
  padding: 20px;
}
.action {
  span {
    margin: 10px;
    cursor: pointer;
  }
}
</style>
