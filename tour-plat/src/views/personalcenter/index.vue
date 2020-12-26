/* *@description: index *@author: hanyuchen *@date: 2020-12-17 10:09:04 */
<template>
  <div class="personal-center flex flex-hc">
    <div class="personal-center-content">
      <div class="personal-edit" @click="onEdit" v-if="!isEdit">修改</div>
      <div class="personal-edit" @click="onSave" v-if="isEdit">保存</div>
      <div class="content-main" v-if="!isEdit">
        <p class="content-item">
          <label>姓名:</label>
          <span>{{ userInfo.name }}</span>
        </p>
        <p class="content-item">
          <label>性别:</label>
          <span v-if="userInfo.sex === '1'">男</span>
          <span v-if="userInfo.sex === '0'">女</span>
        </p>
        <p class="content-item">
          <label>联系电话:</label>
          <span>{{ userInfo.phone }}</span>
        </p>
        <p class="content-item">
          <label>密码:</label>
          <span>******</span>
        </p>
      </div>
      <div class="content-main" v-else>
        <Form
          ref="formUserCenter"
          :model="formUserCenter"
          :rules="ruleUserCenter"
          :label-width="110"
        >
          <FormItem label="姓名" prop="name">
            <div class="input-item">
              <Input
                type="text"
                v-model="formUserCenter.name"
                placeholder="请输入姓名"
              />
            </div>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <div class="input-item">
              <Select v-model="formUserCenter.sex" placeholder="请选择性别">
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </div>
          </FormItem>
          <FormItem label="联系电话" prop="phone">
            <div class="input-item">
              <Input
                type="text"
                v-model="formUserCenter.phone"
                placeholder="请输入电话"
              />
            </div>
          </FormItem>
          <FormItem label="密码" prop="password">
            <div class="input-item">
              <Input
                type="password"
                v-model="formUserCenter.password"
                autocomplete="new-password"
                placeholder="请输入密码"
              />
            </div>
          </FormItem>
          <FormItem prop="passwordAgain">
            <div class="input-item">
              <Input
                type="password"
                v-model="formUserCenter.passwordAgain"
                autocomplete="new-password"
                placeholder="再次输入密码"
              />
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    const validatePass = (rule,value,callback)=>{
      const isNull = (value)=>value===''||value===undefined || value ===null
      if(isNull(value)){
        callback(new Error(rule.message))
      }
      callback()
    }
    return {
      isEdit: false,
      userInfo: {},
      formUserCenter: {
        name: "",
        phone: "",
        sex: "",
        password: "",
        passwordAgain: "",
      },
      ruleUserCenter: {
        phone: [
          {
            require:true,
            message: "手机号不能为空",
            trigger: "blur",
            validator:validatePass
          },
          {
            message: "手机号格式不正确",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!/^1[3456789]\d{9}/.test(value)) {
                callback(new Error(rule.message));
              }
              callback();
            },
          },
        ],
        passwordAgain: [
          {
            message: "两次密码必须相同",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (this.formUserCenter.password) {
                if (value !== this.formUserCenter.password) {
                  callback(new Error(rule.message));
                }
              }
              callback();
            },
          },
        ],
      },
    };
  },

  computed: {},

  methods: {
    onEdit() {
      const { id, name, phone, sex } = this.userInfo;
      Object.assign(this.formUserCenter, { id, name, phone, sex });
      this.isEdit = !this.isEdit;
    },
    onSave() {
      this.$refs.formUserCenter.validate((value) => {
        if (!value) {
          this.$alertError("请按要求填写数据");
          return;
        }
        const param = Object.assign({}, this.formUserCenter);
        delete param.passwordAgain
        
        this.updateUser(param)
      });
    },
    getUserInfo() {
      this.$get("get-user-info").then((res) => {
        this.userInfo = res;
      });
    },
    //编辑用户
    updateUser(param) {
      this.$post("update-user", param).then(() => {
        this.$alertSuccess("修改成功");
        this.getUserInfo();
        this.isEdit = !this.isEdit;
      });
    },
  },

  mounted() {
    this.getUserInfo();
  },
};
</script>
<style lang="less" scoped>
.personal-center {
  padding: 100px;
  &-content {
    width: 800px;
    height: auto;
    min-height: 500px;
    background-color: #fff;
    border-radius: 23px;
    padding: 50px;
  }
  .content-main {
    width: 100%;
    height: 100%;
    margin-left: 80px;
  }
  .content-item {
    line-height: 46px;
    margin-bottom: 24px;
    label {
      width: 100px;
      display: inline-block;
      text-align: right;
    }
    span {
      margin-left: 30px;
    }
  }
  .personal-edit {
    width: 100%;
    padding: 0 50px;
    text-align: right;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #168bf5;
    line-height: 44px;
    cursor: pointer;
  }
  .input-item {
    width: 200px;
  }
}
</style>
