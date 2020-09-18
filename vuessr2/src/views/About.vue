<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{item}}</h2>
  </div>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    console.log(route,'44455');
    return store.dispatch('fetchItem', route.query.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      console.log(this.$store.state.items,'kklkl');
      return this.$store.state.items
    }
  }
}
</script>