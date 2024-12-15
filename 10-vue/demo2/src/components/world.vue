<template>
  <div>
    <!-- -->
    <el-button @click="handle">点击</el-button>
    <div style="height: 300px; width: 100%" id="mychart"></div>
    <!-- 使用全局组件 -->
    <pages></pages>
 
 </div>
</template>

<script>
import { mixin } from "@/mixin/index";
import * as echarts from "echarts";
export default {
  //   局部混入
  mixins: [mixin],
  //  keep-alive 两个生命周期
  activated() {
    console.log("进入组件时触发");
  },
  deactivated() {
    console.log("离开组件时触发");
  },

  data() {
    return {
      xdata: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      series: [5, 20, 36, 10, 10, 20]
    };
  },

  mounted() {
    console.log(this.$hi)
    this.initChart();
  },

  methods: {
    initChart() {
        let option = {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("mychart"));
      // 绘制图表
      myChart.setOption(option);
    }
  }
};
</script>
