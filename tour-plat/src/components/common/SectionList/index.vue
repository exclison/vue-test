/*
 *@description: index
 *@author: hanyuchen
 *@date: 2020-12-17 10:33:53
*/
<template>
  <div class="section-list">
       <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {

  name: 'SectionList',

  components: {},

  data () {
    return {
        columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
    };
  },

  computed: {},

  props:{
      params:{
          type:Object,
          default(){
              return {}
          }
      },
      onLoad:{
          type:Function,
          default(){
              return ()=>{}
          }
      },
      datas:{
          type:Array,
          default(){
              return []
          }
      },
  },

  methods: {
      search(){},
  },

  mounted() {},
}

</script>
<style lang='less' scoped>
.section-list{
}
</style>