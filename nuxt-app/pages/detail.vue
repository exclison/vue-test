<!--  -->
<template>
  <div>
      <h1>detail {{data}}</h1>
      <!--  类似与router-view -->
      <nuxt-child />
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  async asyncData({$axios,error}) {
      const {ok,data} = await $axios.$get('/api/detail')
      if(ok){
          return {
              data
          }
      }

      error({statusCode:400,message:'数据查询失败'})
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>