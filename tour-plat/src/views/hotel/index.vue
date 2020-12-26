<template>
  <div class="hotel">
    <div class="hotel-search">
      <Button type="primary" @click="isAddHotel = true">添加酒店</Button>
    </div>
    <div class="hotel-list">
      <p class="hotel-title">酒店列表</p>
      <SectionList
        ref="hotelList"
        :columns="columns"
        :onLoad="onLoad"
        api="get-hotel-list"
      ></SectionList>
    </div>
    <AlertDrawer v-model="isAddHotel" title="添加酒店" @on-confirm="onConfirm">
      <div class="add-hotel">
        <Form
          ref="formHotel"
          :model="formHotel"
          :rules="ruleHotel"
          :label-width="110"
        >
          <FormItem label="酒店名称" prop="name">
            <Input
              type="text"
              v-model="formHotel.name"
              placeholder="请输入酒店名称"
            />
          </FormItem>
          <FormItem label="联系电话" prop="phone">
            <Input
              type="text"
              v-model="formHotel.phone"
              placeholder="请输入联系电话"
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
        hotelId: "",
        name: "",
        phone: "",
      },
      ruleHotel: {
        name: [
          {
            required: true,
            message: "请输入酒店名称",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
          {
            required: true,
            message: "电话格式不正确",
            trigger: "blur",
            validator: (rule, value, callBack) => {
              if (!/^1[3456789]\d{9}/.test(value)) {
                callBack(new Error("手机号格式不正确"));
              }
              callBack();
            },
          },
        ],
      },
      columns: [
        {
          title: "酒店名称",
          key: "hotel_name",
          align: "center",
        },
        {
          title: "联系电话",
          key: "hotel_phone",
          align: "center",
        },
        {
          title: "房间数",
          key: "roomCount",
          align: "center",
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return (
              <p class="action">
                <span
                  onClick={() => {
                    this.$router.push({path:"/hotel-detail",query:{id:params.row.hotel_id}});
                  }}
                >
                  详情
                </span>
                <span
                  onClick={() => {
                    const {
                      hotel_id: hotelId,
                      hotel_name: name,
                      hotel_phone: phone,
                    } = params.row;
                    Object.assign(this.formHotel, { hotelId, name, phone });
                    this.isAddHotel = true;
                  }}
                >
                  编辑
                </span>
                <span
                  onClick={() => {
                    this.deleteHotel(params.row.hotel_id);
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
  methods: {
    onConfirm() {
      this.$refs.formHotel.validate((value) => {
        if (!value) {
          this.$alertError("请按要求填写数据");
          return;
        }

        const param = Object.assign({}, this.formHotel);
        if (!param.hotelId) {
          this.addHotel(param);
        } else {
          this.updateHotel(param);
        }
      });
    },
    onLoad(res, callBack) {
      callBack(res);
    },
    doQuery() {
      this.$refs.hotelList.search();
    },
    // 添加酒店
    addHotel(param) {
      this.$post("add-hotel", param).then(() => {
        this.$alertSuccess("操作成功");
        this.doQuery();
        this.isAddHotel = false;
      });
    },
    //编辑酒店
    updateHotel(param) {
      this.$post("update-hotel", param).then(() => {
        this.$alertSuccess("修改成功");
        this.doQuery();
        this.isAddHotel = false;
      });
    },
    //删除酒店
    deleteHotel(id) {
      this.$alertConfirm({
        content: "确定要删除吗",
        onOk: () => {
          this.$post("delete-hotel", { id: id }).then(() => {
            this.$alertSuccess("删除成功");
            this.doQuery();
          });
        },
      });
    },
  },
  mounted() {
    this.doQuery();
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
