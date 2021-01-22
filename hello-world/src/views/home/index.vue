<!--  -->
<template>
  <div>
    <!-- <p @click="$store.commit('add')">counter:{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter:{{$store.state.counter}}</p>
    <p>double counter:{{$store.getters.doubleCounter}}</p>
    <svg>
      <use xlink:href="#icon-test"></use>
    </svg>
    <svg>
      <use xlink:href="#icon-test1"></use>
    </svg> -->
<HelloWorld></HelloWorld>
    <!-- <vxe-table
      :data="tableData"
      :height="400"
      :scroll-x="{ gt: 10 }"
      :scroll-y="{ gt: 10 }"
    >
      <vxe-table-column type="seq" title="Seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="role1" title="Role1" width="300"></vxe-table-column>
      <vxe-table-column field="role2" title="Role2" width="300"></vxe-table-column>
      <vxe-table-column field="role3" title="Role3" width="300"></vxe-table-column>
      <vxe-table-column field="role3" title="Role3" width="300"></vxe-table-column>
      <vxe-table-column field="role3" title="Role3" width="300"></vxe-table-column>
      <vxe-table-column field="role3" title="Role3" width="300"></vxe-table-column>
      <vxe-table-column field="role3" title="Role3" width="300"></vxe-table-column>
      <vxe-table-column field="role3" title="Role3" width="300"></vxe-table-column>
      <vxe-table-column field="role3" title="Role3" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" fixed="right" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
    </vxe-table> -->
  </div>
</template>

<script>
import "../../assets/icons/test.svg";
import HelloWorld from '../../components/HelloWorld'
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          address: "Shenzhen",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Man",
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          address: "Shanghai",
        },
      ],
    };
  },
  components:{HelloWorld},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="less" scoped></style>
