<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-15 10:29:19
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-01-15 10:38:31
 * @FilePath: \vue-test\vite_vue3_ts\src\views\map\map.vue
 * @Description: 
-->
<template>
  <div class="map">
    <div class="map_box" id="map_box"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "map",
};
</script>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
// import { loadBMap } from "@/library/map.js";
// import {loadBMap} from '@/library/map.js'
import * as echarts from "echarts";

// 请确保在引入百度地图扩展之前已经引入百度地图 JS API 脚本并成功加载
// https://api.map.baidu.com/api?v=3.0&ak=你申请的AK
// https://api.map.baidu.com/api?v=3.0&ak=PcXCduiAlqY2nZDZT23d2pKDVDHhFlp4

import "echarts/extension/bmap/bmap";

import "echarts/extension/bmap/bmap";
function loadBMap(ak) {
  return new Promise(function (resolve, reject) {
    if (typeof BMap !== "undefined") {
      // eslint-disable-next-line no-undef
      resolve(BMap);
      return true;
    }
    window.onBMapCallback = function () {
      // eslint-disable-next-line no-undef
      resolve(BMap);
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    // 百度地图地址
    script.src =
      "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&__ec_v__=20240115&callback=onBMapCallback";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

onMounted(() => {
  loadBMap("PcXCduiAlqY2nZDZT23d2pKDVDHhFlp4").then(() => {
    const option = {
      // 加载 bmap 组件
      bmap: {
        // 百度地图中心经纬度。默认为 [104.114129, 37.550339]。
        center: [120.13066322374, 30.240018034923],
        // 百度地图缩放级别。默认为 5。
        zoom: 14,
        // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'。默认关闭。
        roam: true,
        // 百度地图的旧版自定义样式，见 https://lbsyun.baidu.com/custom/index.htm
        mapStyle: {},
        // 百度地图 3.0 之后的新版自定义样式，见 https://lbsyun.baidu.com/index.php?title=open/custom
        mapStyleV2: {},
        // 百度地图的初始化配置，见 https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a0b1
        mapOptions: {
          // 禁用百度地图自带的底图可点功能
          enableMapClick: false,
        },
      },
      series: [
        // {
        //   type: "scatter",
        //   // 使用百度地图坐标系
        //   coordinateSystem: "bmap",
        //   // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
        //   data: [[120, 30, 1]],
        //   // 编码数据项中第三个元素作为 value 维度
        //   encode: {
        //     value: 2,
        //   },
        // },
      ],
    };

    const dom = document.getElementById("map_box");
    let myEchart = echarts.init(dom);

    myEchart.setOption(option, true);

    // // 获取百度地图实例，使用百度地图自带的控件
    // var bmap = myEchart.getModel().getComponent("bmap").getBMap();
    // bmap.addControl(new BMap.MapTypeControl());
  });
});
</script>

<style scoped lang="scss">
.map {
  .map_box {
    width: 500px;
    height: 500px;
    overflow: hidden;
  }
}
</style>
