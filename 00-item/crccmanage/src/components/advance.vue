<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      物业费预收
    </h5>
    <div id="main8" style="width: 387px;height:169px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementAdvance',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main8');
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
          name: '预收金额',
          min: 3,
          max: 18,
          interval: 3,
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
          name: '预收率',
          nameTextStyle: {
            color: '#fff'
          },
          min: 0,
          max: 3000,
          interval: 500,
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
              [5.00, 211],
              [6.00, 114],
              [8.00, 564],
              [10.00, 3031],
              [18.00, 1729]
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