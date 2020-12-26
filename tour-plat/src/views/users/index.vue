/* *@description: users *@author: hanyuchen *@date: 2020-12-17 09:25:49 */
<template>
  <div class="users">
    <div class="users-search">
      <Button type="primary" @click="onAdd">添加用户</Button>
    </div>
    <div class="users-list">
      <p class="users-title">用户列表</p>
      <SectionList
        ref="userTable"
        :columns="columns"
        :onLoad="onLoad"
        api="get-user-list"
      ></SectionList>
    </div>
    <AlertDrawer
      v-model="isAddUser"
      :title="formUser.id ? '编辑用户' : '添加用户'"
      @on-confirm="onConfirm"
    >
      <div class="add-users">
        <Form
          ref="formUser"
          :model="formUser"
          :rules="ruleUser"
          :label-width="110"
        >
          <FormItem label="姓名" prop="name">
            <Input
              type="text"
              v-model="formUser.name"
              placeholder="请输入姓名"
            />
          </FormItem>
          <FormItem label="性别" prop="sex">
            <Select v-model="formUser.sex">
              <Option value="1">男</Option>
              <Option value="0">女</Option>
            </Select>
          </FormItem>
          <FormItem label="联系电话" prop="phone">
            <Input
              type="text"
              v-model="formUser.phone"
              placeholder="请输入手机号"
            />
          </FormItem>
        </Form>
      </div>
    </AlertDrawer>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      isAddUser: false,
      formUser: {
        id: "",
        name: "",
        sex: "",
        phone: "",
      },
      ruleUser: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            required: true,
            message: "手机号格式不正确",
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
          title: "姓名",
          key: "name",
          align: "center",
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
          render: (h, params) => {
            let sex = "";
            if (params.row.sex === "1") sex = "男";
            if (params.row.sex === "0") sex = "女";
            return h("span", {}, sex);
          },
        },
        {
          title: "联系电话",
          key: "phone",
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
                    this.resetPassword(params.row.id);
                  }}
                >
                  重置密码
                </span>
                <span
                  onClick={() => {
                    const { id, name, sex, phone } = params.row;
                    Object.assign(this.formUser, { id, name, sex, phone });
                    this.isAddUser = true;
                  }}
                >
                  编辑
                </span>
                <span
                  onClick={() => {
                    this.deleteUser(params.row.id);
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

  methods: {
    onAdd(){
      this.$refs.formUser.resetFields()
      this.isAddUser = true
    },
    onConfirm() {
      this.$refs.formUser.validate((value) => {
        if (!value) {
          this.$alertError("请按要求填写数据");
          return;
        }

        const param = Object.assign({}, this.formUser);
        if (!param.id) {
          this.addUser(param);
        } else {
          this.updateUser(param);
        }
      });
      // this.$alertConfirm({ content: "阿卡脸上的肌肤轮廓的减肥了" });
    },
    //表格初始化
    onLoad(res, callBack) {
      callBack(res);
    },
    //表格刷新
    doQuery() {
      this.$refs.userTable.search();
    },
    // 添加用户
    addUser(param) {
      this.$post("add-user", param).then(() => {
        this.$alertSuccess("操作成功");
        this.doQuery();
        this.isAddUser = false;
      });
    },
    //编辑用户
    updateUser(param) {
      this.$post("update-user", param).then(() => {
        this.$alertSuccess("修改成功");
        this.doQuery();
        this.isAddUser = false;
      });
    },
    //删除用户
    deleteUser(id) {
      this.$alertConfirm({
        content: "确定要删除吗",
        onOk: () => {
          this.$post("delete-user", { id: id }).then(() => {
            this.$alertSuccess("删除成功");
            this.doQuery();
          });
        },
      });
    },
    resetPassword(id) {
      this.$alertConfirm({
        content: "确定要重置密码吗",
        onOk: () => {
          this.$post("reset-password", { id }).then(() => {
            this.$alertSuccess("重置密码成功");
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
<style lang="less" scoped>
.users {
  padding: 50px;
  &-search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 30px;
  }
}
.users-title {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #253555;
  line-height: 44px;
  margin-bottom: 20px;
}
.add-users {
  padding: 20px;
}
.action {
  span {
    margin: 10px;
    cursor: pointer;
  }
}
</style>
