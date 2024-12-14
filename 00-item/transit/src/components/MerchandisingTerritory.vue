<template>
  <div>
    <!-- 商品销售地区统计 -->
    <div class="tit">
      <h2>商品销售地区统计</h2>
    </div>
    <div class="content">
      <div class="left">
        <p>A地区（<span style="color: #dc1f62">12345</span>）</p>
        <p>B地区（<span style="color: #e8bc22">12345</span>）</p>
        <p>C地区（<span style="color: #108c61">12345</span>）</p>
        <p>D地区（<span style="color: #6666ff">12345</span>）</p>
        <p>E地区（<span style="color: #6666ff">12345</span>）</p>
        <p>F地区（<span style="color: #6666ff">12345</span>）</p>
        <p>G地区（<span style="color: #6666ff">12345</span>）</p>
      </div>
      <div class="right">
        <div id="merchandising-territory" style="width: 100%;height: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "JavaScriptMerchandisingTerritory",

  data() {
    return {};
  },

  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById("merchandising-territory");
      var myChart = echarts.init(chartDom, "dark");
      var option;

      option = {
        backgroundColor: "#09153d", // 背景颜色
        grid: {
          left: '20%', // 左侧距离

        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["A地区", "B地区", "C地区", "D地区", "E地区", "F地区", "G地区"],
          axisLabel: {
            textStyle: {
              color: "#fff", // 更改x轴字体颜色
              fontSize: "13px", // 更改x轴字体大小
            },
          },
          axisLine: {
            lineStyle: {
              color: "#262950", // 更改x轴颜色
            },
          },
          splitLine: {
            show: true, // 显示纵向网格线
            lineStyle: {
              color: "#20264c", // 设置纵向网格线颜色
            },
          },
        },
        yAxis: {
          type: "value",
          name: "（万元）", // 设置y轴单位
          nameTextStyle: {
            color: "#fff", // 设置y轴单位字体颜色
          },
          axisLabel: {
            textStyle: {
              color: "#fff", // y轴字体颜色
              fontSize: "13px", // y轴字体大小
            },
          },
          splitLine: {
            show: true, // 横向网格线
            lineStyle: {
              color: "#20264c", // 横向网格线颜色
            },
          },
        },
        series: [
          {
            symbolSize: "20", // 圆点大小
            data: [11820, 17932, 11901, 13934, 11290, 14330, 10320],
            type: "line",
            areaStyle: {
              // 面积图颜色
              color: new echarts.graphic.LinearGradient(
                0, // 渐变起始点x坐标（相对于容器宽度）
                0, // 渐变起始点y坐标（相对于容器高度）
                0, // 渐变结束点x坐标（相对于容器宽度）
                1, // 渐变结束点y坐标（相对于容器高度），1表示底部
                [
                  { offset: 0, color: "rgba(67, 184, 201, 1)" }, // 起始颜色（蓝色）
                  { offset: 1, color: "rgba(67, 184, 201, 0)" }, // 结束颜色（透明蓝色，实际上是透明）
                ]
              ),
            },
            lineStyle: {
              color: "#01d7ef", // 折线颜色
            },
            itemStyle: {
              color: "#01d7ef", // 圆点颜色
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: #09153d;
  // 标题
  .tit {
    height: 2.81rem;
    h2 {
      color: #fff;
      font-weight: 400;
      font-size: 1.13rem;
      line-height: 1.38rem;
      padding-top: 0.63rem;
      padding-left: 1.63rem;
    }
  }
  // 内容
  .content {
    height: 19.94rem;
    display: flex;
    .left {
      width: 11.06rem;
      padding-top: 1.75rem;
      padding-left: 3rem;
      padding-bottom: 0.69rem;
      p {
        color: #0168dd;
      }
    }
    .right {
      width: 22.38rem + 3.44rem;
      text-align: right;
    }
  }
}
</style>
