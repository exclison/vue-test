<!--  -->
<template>
  <div>
    <p @click="$store.commit('add')">counter:{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter:{{$store.state.counter}}</p>
    <p>double counter:{{$store.getters.doubleCounter}}</p>
    <svg>
      <use xlink:href="#icon-test"></use>
    </svg>
    <svg>
      <use xlink:href="#icon-test1"></use>
    </svg>
  </div>
</template>

<script>
import '../../assets/icons/test.svg'
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>