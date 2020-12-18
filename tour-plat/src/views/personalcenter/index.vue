/* *@description: index *@author: hanyuchen *@date: 2020-12-17 10:09:04 */
<template>
  <div class="personal-center flex flex-hc">
    <div class="personal-center-content">
      <div class="personal-edit" @click="onStateChange" v-if="!isEdit">修改</div>
      <div class="personal-edit" @click="onStateChange" v-if="isEdit">保存</div>
      <div class="content-main" v-if="!isEdit">
        <p class="content-item">
          <label>姓名:</label>
          <span>张三</span>
        </p>
        <p class="content-item">
          <label>性别:</label>
          <span>男</span>
        </p>
        <p class="content-item">
          <label>联系电话:</label>
          <span>1332334545</span>
        </p>
        <p class="content-item">
          <label>密码:</label>
          <span>******</span>
        </p>
      </div>
      <div class="content-main" v-else>
        <Form
          ref="formHotel"
          :model="formHotel"
          :rules="ruleHotel"
          :label-width="110"
        >
          <FormItem label="姓名" prop="user">
            <div class="input-item">
              <Input
                type="text"
                v-model="formHotel.user"
                placeholder="Username"
              />
            </div>
          </FormItem>
          <FormItem label="性别" prop="user">
            <div class="input-item">
              <Input
                type="text"
                v-model="formHotel.user"
                placeholder="Username"
              />
            </div>
          </FormItem>
          <FormItem label="联系电话" prop="user">
            <div class="input-item">
              <Input
                type="text"
                v-model="formHotel.user"
                placeholder="Username"
              />
            </div>
          </FormItem>
          <FormItem label="密码" prop="user">
            <div class="input-item">
              <Input
                type="text"
                v-model="formHotel.user"
                placeholder="Username"
              />
            </div>
          </FormItem>
          <FormItem prop="user">
            <div class="input-item">
              <Input
                type="text"
                v-model="formHotel.user"
                placeholder="Username"
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
    return {
      isEdit: false,
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
    };
  },

  computed: {},

  methods: {
    onStateChange() {
      this.isEdit = !this.isEdit;
    },
  },

  mounted() {},
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
  .input-item{
      width: 200px;
  }
}
</style>
