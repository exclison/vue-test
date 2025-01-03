<template>
  <div ref="chart" class="map-chart">
  </div>
</template>
<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: "officePage",
  data() {
    return {
      myChart: null,
      useList: ['2','3','F01'],//使用中的
      reserveList: ['1'],//预定的
    }
  },
  mounted(){
    this.initChart()
  },
  methods:{
    initChart(){
      const that = this
      this.myChart = echarts.init(this.$refs.chart)
      axios.get("/office.svg").then(res=>{
        echarts.registerMap('office', { svg: res.data });

        let option = {
          tooltip: {},
          geo: {
            map: 'office',
            roam: true,
            // selectedMode: 'multiple',
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            tooltip: {
              textStyle:{
                fontSize:80,
                color: '#000'
              },
              formatter: function (params) {
                // console.log(params,'params')
                return /^F/g.test(params.name)? `房间：${params.name}`:`座位：${params.name}`;
              }
            },
            itemStyle: {
              // color: '#fff',
              areaColor:'rgba(255, 0, 0, 0.3)',
              borderWidth:0
            },
            emphasis: {
              label:false,
              itemStyle: {
                color: undefined,
              }
            },
            select: {
              label:false,
              itemStyle:{
                areaColor:'rgba(0, 0, 0, 0.3)',
              },
            },
            regions:[]
          }
        }
        this.myChart.setOption(option);
        let newRegions = this.distHouseSeat()//重新分配区域
        option.geo.regions = newRegions
        this.$nextTick(()=>{
          this.myChart.setOption(option);
        })

        this.myChart.on('click', function (params) {
          console.log(params.name,'iii')
          // that.myChart.setOption(option);

          // const selectedNames = params.allSelected[0].name.slice();
          // for (var i = selectedNames.length - 1; i >= 0; i--) {
          //   if (that.useList.indexOf(selectedNames[i]) >= 0 || that.reserveList.indexOf(selectedNames[i]) >= 0) {
          //     selectedNames.splice(i, 1);
          //   }
          // }
          // console.log('selected', selectedNames,that.useList);
        });
      }).catch(err=>{
        console.log(err)
      })

    },
    distHouseSeat(){
      const svgList = this.myChart.getOption().geo[0].regions
      let regions = []
      svgList.forEach(item => {
        regions.push(this.getRegionConfig(item.name))
      })
      console.log(regions)
      return regions
    },
    //获取区域配置
    getRegionConfig(name){
      if(this.isReserve(name) === 1){//使用中
        if(/^F/g.test(name)){//房间样式
          return {
            name: name,
            silent: true,
            itemStyle: {
              color: 'rgba(237, 125, 49,0.2)'
            },
            emphasis: {
              itemStyle: {
                color: 'rgba(237, 125, 49,0.2)'
              }
            },
            select: {
              itemStyle: {
                color: 'rgba(237, 125, 49,0.2)'
              }
            }
          }
        }else{//工位样式
          return {
            name: name,
            silent: true,
            itemStyle: {
              color: '#ed7d31'
            },
            emphasis: {
              itemStyle: {
                color: '#ed7d31'
              }
            },
            select: {
              itemStyle: {
                color: '#ed7d31'
              }
            },
            z:1000,
          }
        }
      }else if(this.isReserve(name) === 2){//已预定
        if(/^F/g.test(name)){//房间样式
          return {
            name: name,
            silent: true,
            itemStyle: {
              color: 'rgba(112, 173, 71,0.2)'
            },
            emphasis: {
              itemStyle: {
                color: 'rgba(112, 173, 71,0.2)'
              }
            },
            select: {
              itemStyle: {
                color: 'rgba(112, 173, 71,0.2)'
              }
            }
          }
        }else{//工位样式
          return {
            name: name,
            silent: true,
            itemStyle: {
              color: '#70ad47'
            },
            emphasis: {
              itemStyle: {
                color: '#70ad47'
              }
            },
            select: {
              itemStyle: {
                color: '#70ad47'
              }
            },
            z:1000,
          }
        }
      }else{//未预定
        if(/^F/g.test(name)){//房间样式
          return {
            name: name,
            // itemStyle: {
            //   label:false,
            //   color: 'rgba(0, 140, 0,0.2)'
            // },
            silent: false,
            emphasis: {
              itemStyle: {
                color: 'rgba(22, 176, 255,0.2)',
                borderColor: '#16b0ff',
                borderWidth: 5
              }
            },
            select: {
              itemStyle: {
                color: 'rgba(22, 176, 255,0.2)',
                opacity: 0.5
              }
            }
          }
        }else{//工位样式
          return {
            name: name,
            silent: false,
            itemStyle: {
              label:false,
              color: '#ccc',
            },
            emphasis: {
              label:false,
              itemStyle: {
                color: undefined,
                borderColor: '#16b0ff',
                borderWidth: 5
              }
            },
            select: {
              label:false,
              itemStyle: {
                color: 'rgba(22, 176, 255,1)',
                borderColor: '#16b0ff',
                borderWidth: 5
              }
            },
            z:1000,
          }
        }
      }
    },
    // 是否包括预定
    isReserve(name){
      if(this.useList.includes(name)){//是否已使用
        return 1
      }else if(this.reserveList.includes(name)){//是否已预定
        return 2
      }else{
        return 3
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.map-chart{
  width: 100%;
  height: 100vh;
}
</style>
