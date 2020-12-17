<template>
  <div class="hotel">
    <div class="hotel-search">
      <Button type="primary" @click="isAddHotel = true">添加酒店</Button>
    </div>
    <div class="hotel-list">
      <p class="hotel-title">酒店列表</p>
      <SectionList :columns="columns" :datas="dataList"></SectionList>
    </div>
    <AlertDrawer v-model="isAddHotel" title="添加酒店" @on-confirm="onConfirm">
      <div class="add-hotel">
        <Form
          ref="formHotel"
          :model="formHotel"
          :rules="ruleHotel"
          :label-width="110"
        >
          <FormItem label="酒店名称" prop="user">
            <Input
              type="text"
              v-model="formHotel.user"
              placeholder="Username"
            />
          </FormItem>
          <FormItem label="联系电话" prop="user">
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
// @ is an alias to /src

export default {
  name: "hotel",
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
          title: "酒店名称",
          key: "name",
          align: "center",
        },
        {
          title: "联系电话",
          key: "age",
          align: "center",
        },
        {
          title: "房间数",
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
                    this.$router.push("/hotel-detail");
                  }}
                >
                  详情
                </span>
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
  methods: {
    onConfirm() {
      this.$alertSuccess("操作成功");
      this.$alertConfirm({ content: "阿卡脸上的肌肤轮廓的减肥了" });
    },
  },
};
</script>
<style lang="less" scope>
.hotel {
  padding: 50px;
  &-search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 30px;
  }
}
.hotel-title {
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
