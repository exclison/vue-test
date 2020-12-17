<template>
  <div class="hotel">
    <div class="hotel-search">
      <Button type="primary" @click="isAddHotel = true">添加酒店</Button>
    </div>
    <div class="hotel-list">
      <SectionList></SectionList>
    </div>
    <AlertDrawer v-model="isAddHotel" title="添加酒店" @on-confirm="onConfirm">
      <div class="add-hotel">
        <Form ref="formHotel" :model="formHotel" :rules="ruleHotel" :label-width="110" >
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
    };
  },
  methods:{
    onConfirm(){
      this.$alertSuccess('操作成功')
      this.$alertConfirm({content:'阿卡脸上的肌肤轮廓的减肥了'})
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
.add-hotel{
  padding: 20px;
}
</style>
