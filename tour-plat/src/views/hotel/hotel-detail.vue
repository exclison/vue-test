/* *@description: hotel-detail *@author: hanyuchen *@date: 2020-12-17 14:49:27
*/
<template>
  <div class="hotel-detail">
    <div class="hotel-detail-search">
      <Button type="primary" v-if="isAdmin" @click="onAdd">添加房间</Button>
    </div>
    <div class="hotel-detail-list">
      <p class="room-title">房间列表</p>
      <SectionList
        ref="roomList"
        :columns="columns"
        :params="searchParam"
        :onLoad="onLoad"
        api="get-room-list-by-id"
      ></SectionList>
    </div>
    <AlertDrawer v-model="isAddRoom" title="添加房间" @on-confirm="onConfirm">
      <div class="add-hotel">
        <Form
          ref="formRoom"
          :model="formRoom"
          :rules="ruleRoom"
          :label-width="110"
        >
          <FormItem label="房间号" prop="roomNum">
            <Input
              type="text"
              v-model="formRoom.roomNum"
              placeholder="请输入房间号"
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
      isAddRoom: false,
      searchParam: {
        id: "",
      },
      formRoom: {
        hotelId: "",
        roomNum: "",
      },
      ruleRoom: {
        roomNum: [
          {
            required: true,
            message: "请输入房间号",
            trigger: "blur",
          },
        ],
      },
      columns: [
        {
          title: "房间号",
          key: "room_num",
          align: "center",
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: (h, params) => {
            return <span>{params.row.user_name ? "已满" : "空"}</span>;
          },
        },
        {
          title: "预定人",
          key: "user_name",
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
                  v-show={!params.row.user_name}
                  onClick={() => {
                    const param = Object.assign(
                      {},
                      {
                        userId: this.$store.state.userInfo.id,
                        roomId: params.row.room_id,
                      }
                    );
                    this.reserveRoom(param);
                  }}
                >
                  预定
                </span>
                <span v-show={!!params.row.user_name} style={{ color: "#ccc" }}>
                  预定
                </span>
                <span
                  v-show={this.isAdmin}
                  onClick={() => {
                    this.deleteRoom(params.row.room_id);
                  }}
                >
                  删除
                </span>
              </p>
            );
          },
        },
      ],
    };
  },

  computed: {},

  props: {},

  methods: {
    onAdd() {
      this.$refs.formRoom.resetFields();
      this.isAddRoom = true;
    },
    onConfirm() {
      this.$refs.formRoom.validate((value) => {
        if (!value) {
          this.$alertError("请按要求填写数据");
          return;
        }
        const param = Object.assign({}, this.formRoom);
        this.addRoom(param);
      });
    },
    onLoad(res, callBack) {
      callBack(res);
    },
    doQuery() {
      this.$refs.roomList.search();
    },
    // 添加房间
    addRoom(param) {
      this.$post("add-room", param).then(() => {
        this.$alertSuccess("操作成功");
        this.doQuery();
        this.isAddRoom = false;
      });
    },
    //删除房间
    deleteRoom(id) {
      this.$alertConfirm({
        content: "确定要删除吗",
        onOk: () => {
          this.$post("delete-room", { roomId: id }).then(() => {
            this.$alertSuccess("删除成功");
            this.doQuery();
          });
        },
      });
    },
    reserveRoom(param) {
      this.$alertConfirm({
        content: "确定要预定吗",
        onOk: () => {
          this.$post("reserve-room", param).then(() => {
            this.$alertSuccess("预定成功");
            this.doQuery();
          });
        },
      });
    },
  },

  mounted() {
    this.searchParam.id = this.formRoom.hotelId = this.$route.query.id;
    this.doQuery();
  },
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
