/* *@description: header *@author: hanyuchen *@date: 2020-12-16 17:25:19 */
<template>
  <div class="header">
    <div class="header-title">
      <span>旅游管理平台</span>
    </div>
    <div class="header-nav">
      <ul>
        <li
          :class="{ 'nav-active': isActive(menu.path) }"
          v-for="menu in menuList"
          :key="menu.name"
          @click="onNavChange(menu)"
        >
          {{ menu.name }}
        </li>
      </ul>
    </div>
    <div>
      <Dropdown @on-click="onPerson">
        <span class="name-title">
          {{$store.state.userInfo.name}}
          <Icon type="ios-arrow-down"></Icon>
        </span>
        <DropdownMenu slot="list">
          <DropdownItem name="person">个人中心</DropdownItem>
          <DropdownItem name="logout">登出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import menus from "../../config/menus";
import { mapMutations } from "vuex";
export default {
  name: "Header",

  components: {},

  data() {
    return {};
  },

  computed: {
    menuList() {
      const menuList = menus.filter(i=>i.role.indexOf(this.$store.state.userInfo.role) >= 0)
      return menuList;
    },
  },

  methods: {
    ...mapMutations(["logout"]),
    onNavChange(menu) {
      this.$router.push(menu.path);
      console.log(this.$route);
    },
    isActive(path) {
      return this.$route.path.indexOf(path) === 0;
    },
    onPerson(e) {
      console.log(e);
      if (e === "person") {
        this.$router.push("/person");
      }
      if (e === "logout") {
        this.logout();
        this.$router.push("/login");
      }
    },
  },

  mounted() {},
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  background: #168bf5;
  padding: 0 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-title {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 33px;
  }
  &-nav {
    margin-right: 50px;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    li {
      margin: 20px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #d0e7fd;
      line-height: 28px;
      cursor: pointer;
    }
  }
  .nav-active {
    color: #ffffff;
    font-size: 24px;
  }
  .name-title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #d0e7fd;
    line-height: 25px;
    cursor: pointer;
  }
}
</style>
