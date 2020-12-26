/* *@description: index *@author: hanyuchen *@date: 2020-12-17 10:33:53 */
<template>
  <div class="section-list">
    <Table :columns="columns" :data="dataList"></Table>
  </div>
</template>

<script>
export default {
  name: "SectionList",

  components: {},

  data() {
    return {
      dataList:[],
      searchForm:{},
    };
  },

  computed: {},

  props: {
    params: {
      type: Object,
      default() {
        return {};
      },
    },
    onLoad: {
      type: Function,
      default() {
        return () => {};
      },
    },
    datas: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    api:{
      type:String,
      default:''
    },
    
  },

  methods: {
    search() {
      if(this.api){
        const param = Object.assign({},this.searchForm,this.params)
        this.$get(this.api,param).then(res=>{
          this.onLoad(res,this.callBack)
        })
      }
    },
    callBack(res){
      this.dataList = res
    },
  },

  mounted() {},
  watch:{
    datas(){
      this.dataList = this.datas
    }
  }
};
</script>
<style lang="less" scoped>
.section-list {
}
</style>
