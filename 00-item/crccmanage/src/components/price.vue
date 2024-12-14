<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      物业费单价
    </h5>
    <div id="main7" style="width: 387px;height:164px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementPrice',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main7');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        grid: {
          right: '10%',
          bottom: '15%',
          left: '15%'
        },
        xAxis: {
          type: 'value',
          name: '在管面积',
          min: 1.8,
          max: 2.8,
          interval: 0.2,
          nameTextStyle: {
            color: '#fff'
          },
          data: [1.8, 8, 2, 2.2, 2.4, 2.6, 2.81],
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
              show: true, // 显示Y轴的刻度线
              lineStyle: {
                color: '#333333', // 刻度线的颜色
                width: 2, // 刻度线的宽度
                type: 'dashed' // 刻度线的类型（实线、虚线等）
              }
              // 您可以根据需求进一步调整其他刻度线样式
            },
        },
        yAxis: {
          name: '物业费平均单价',
          nameTextStyle: {
            color: '#fff'
          },
          min: 0,
          max: 1800,
          interval: 300,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
              show: true, // 显示Y轴的刻度线
              lineStyle: {
                color: '#333333', // 刻度线的颜色
                width: 2, // 刻度线的宽度
                type: 'dashed' // 刻度线的类型（实线、虚线等）
              }
              // 您可以根据需求进一步调整其他刻度线样式
            },
        },
        series: [
          {
            type: 'scatter',
            data: [
              [1.84, 362, 362],
              [2.02, 133],
              [2.1, 241],
              [2.4, 1548],
              [2.66, 424]
            ],
            symbolSize: function (data) {
              return data[1] / 20
            },
            itemStyle: {
              color: function (params) {
                if (params.data[1] < 100) {
                  return
                } else if (params.data[1] < 200) {
                  return '#81b4a6'
                } else if (params.data[1] < 300) {
                  return '#5793a0'
                } else if (params.data[1] < 400) {
                  return '#c27f6b'
                } else if (params.data[1] < 500) {
                  return '#ac3334'
                } else {
                  return '#688f7d'
                }
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding: 0;
  margin: 0;
  width: 100%;
  color: #b1e2fe;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  line-height: 16px;
  height: 16px;

  span {
    float: left;
    width: 3px;
    background: #b1e2fe;
    height: 16px;
    margin-right: 15px;
  }
}
</style>