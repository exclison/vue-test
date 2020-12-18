/* *@description: login *@author: hanyuchen *@date: 2020-12-18 16:19:46 */
<template>
  <div class="login flex flex-hc flex-vc">
    <div class="login-main flex flex-hc flex-vc">
      <div class="login-main-form">
        <Form
          ref="formHotel"
          :model="formHotel"
          :rules="ruleHotel"
          :label-width="80"
        >
          <FormItem label="账号" prop="user">
            <Input
              type="text"
              v-model="formHotel.user"
              placeholder="Username"
            />
          </FormItem>
          <FormItem label="密码" prop="user">
            <Input
              type="text"
              v-model="formHotel.user"
              placeholder="Username"
            />
          </FormItem>
        </Form>
        <div class="flex flex-hc flex-vc">
            <Button type="primary" @click="isAddHotel = true">登录</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",

  components: {},

  data() {
    return {
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

  props: {},

  methods: {},

  mounted() {},
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: rgba(22, 138, 244, 1);
  .login-main {
    width: 800px;
    height: 400px;
    background-color: #fff;
    border-radius: 30px;
  }
  .login-main-form{
      width: 400px;
  }
}
</style>
