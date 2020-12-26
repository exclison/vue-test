/* *@description: index *@author: hanyuchen *@date: 2020-12-17 09:25:10 */
<template>
  <div class="filght">
    <div class="filght-search">
      <Button type="primary" @click="onAdd">添加航班</Button>
    </div>
    <div class="filght-list">
      <p class="filght-title">航班列表</p>
      <SectionList
        ref="flightList"
        :columns="columns"
        :onLoad="onLoad"
        api="get-flight-list"
      ></SectionList>
    </div>
    <AlertDrawer
      v-model="isAddFlight"
      :title="formFlight.id ? '编辑航班' : '添加航班'"
      @on-confirm="onConfirm"
    >
      <div class="add-filght">
        <Form
          ref="formFlight"
          :model="formFlight"
          :rules="ruleFlight"
          :label-width="110"
        >
          <FormItem label="航班名称" prop="name">
            <Input
              type="text"
              v-model="formFlight.name"
              placeholder="Username"
            />
          </FormItem>
          <FormItem label="出发时间" prop="startTime">
            <DatePicker
              type="datetime"
              :value="formFlight.startTime"
              placeholder="请选择出发时间"
              @on-change="onStartTime"
            ></DatePicker>
          </FormItem>
          <FormItem label="到达时间" prop="endTime">
            <DatePicker
              type="datetime"
              :value="formFlight.endTime"
              placeholder="请选择到达时间"
              @on-change="onEndTime"
            ></DatePicker>
          </FormItem>
          <FormItem label="出发地" prop="startPoint">
            <AreaCascader @on-change="onStartPoint"></AreaCascader>
          </FormItem>
          <FormItem label="到达地" prop="startPoint">
            <AreaCascader @on-change="onEndPoint"></AreaCascader>
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
    const validatePass = (rule,value,callBack)=>{
      const isNull = (value)=>value==='' || value === undefined || value === null
      if(isNull(value)){
        callBack(new Error(rule.message))
      }
      callBack()
    }
    return {
      isAddFlight: false,
      formFlight: {
        id: "",
        name: "",
        startTime: "",
        endTime: "",
        startPoint: "",
        endPoint: "",
      },
      ruleFlight: {
        name: [
          {
            required: true,
            message: "请输入航班名称",
            trigger: "blur",
          },
        ],
        startTime: [
          {
            required: true,
            message: "请选择出发时间",
            trigger: "change",
            validator:validatePass
          },
        ],
        endTime: [
          {
            required: true,
            message: "请选择到达时间",
            trigger: "change",
            validator:validatePass
          },
        ],
        startPoint: [
          {
            required: true,
            message: "请选择出发地点",
            trigger: "change",
          },
        ],
        endPoint: [
          {
            required: true,
            message: "请选择到达地点",
            trigger: "change",
          },
        ],
      },
      columns: [
        {
          title: "航班名称",
          key: "name",
          align: "center",
        },
        {
          title: "出发时间",
          key: "startTime",
          align: "center",
        },
        {
          title: "到达时间",
          key: "endTime",
          align: "center",
        },
        {
          title: "出发地",
          key: "startPoint",
          align: "center",
        },
        {
          title: "到达地",
          key: "endPoint",
          align: "center",
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h,params) => {
            return (
              <p class="action">
                <span
                  onClick={() => {
                    this.$router.push({path:"/filght-detail",query:{id:params.row.id}});
                  }}
                >
                  详情
                </span>
                <span
                  onClick={() => {
                    const {id,name,startTime,endTime,startPoint,endPoint} = params.row
                    const param = {id,name,startTime,endTime,startPoint,endPoint}
                    Object.assign(this.formFlight,param)
                    this.isAddFlight = true;
                  }}
                >
                  编辑
                </span>
                <span onClick={() => {
                  this.deleteFlight(params.row.id)
                }}>删除</span>
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
      this.$refs.formFlight.resetFields()
      this.isAddFlight = true
    },
    onConfirm() {
      this.$refs.formFlight.validate(value=>{
        if(!value){
          this.$alertError('请按要求填写数据')
          return
        }
      })
      const param = Object.assign({},this.formFlight)

      if(!param.id){
        this.addFlight(param)
      }else{
        this.updateFlight(param)
      }

    },
    onLoad(res, callBack) {
      callBack(res);
    },
    doQuery() {
      this.$refs.flightList.search();
    },
    onStartTime(e){
      this.formFlight.startTime = e
    },
    onEndTime(e){
      this.formFlight.endTime = e
    },
    onStartPoint(e) {
      this.formFlight.startPoint = e.length > 0 ? e[e.length - 1] : "";
    },
    onEndPoint(e) {
      this.formFlight.endPoint = e.length > 0 ? e[e.length - 1] : "";
    },
    // 添加航班
    addFlight(param) {
      this.$post("add-flight", param).then(() => {
        this.$alertSuccess("操作成功");
        this.doQuery();
        this.isAddFlight = false;
      });
    },
    //编辑航班
    updateFlight(param) {
      this.$post("update-flight", param).then(() => {
        this.$alertSuccess("修改成功");
        this.doQuery();
        this.isAddFlight = false;
      });
    },
    //删除航班
    deleteFlight(id) {
      this.$alertConfirm({
        content: "确定要删除吗",
        onOk: () => {
          this.$post("delete-flight", { id: id }).then(() => {
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
<style lang="less" scoped>
.filght {
  padding: 50px;
  &-search {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 30px;
  }
}
.filght-title {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #253555;
  line-height: 44px;
  margin-bottom: 20px;
}
.add-filght {
  padding: 20px;
}
.action {
  span {
    margin: 10px;
    cursor: pointer;
  }
}
</style>
