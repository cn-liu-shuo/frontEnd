<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      公区能耗
    </h5>
    <div id="main6" style="width: 387px;height:164px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementEnergy',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main6');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#25282f',
          borderColor: 'transparent',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          right: '10%',
          bottom: '15%',
          left: '15%',
        },
        legend: {
          data: ['用水', '用电'],
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12'],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#333333'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '（万吨）',
            min: 0,
            max: 10,
            interval: 2,
            nameTextStyle: {
              color: '#ffffff',
              fontSize: 10,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#333333',
                width: 2
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
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: 10
              }
            }
          },
          {
            type: 'value',
            name: '',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#333333',
                width: 2
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#333333',
                width: 2,
                type: 'dashed'
              }
            },
            axisLabel: {
              // formatter: '{value} %', // 将Y轴的值格式化为百分比形式
              textStyle: {
                color: '#ffffff',
                fontSize: 10
              }
            }
          }
        ],
        series: [
          {
            name: '用水',
            type: 'line',
            data: [
              4.05, 4.62, 3.17, 2.73, 4.3, 4.74, 8.86, 6.58, 7.53, 7.28
            ],
            lineStyle: {
              color: 'red',
              width: 1
            },
            itemStyle: {
              color: '#8499bf'
            }
          },
          {
            name: '用电',
            type: 'line',
            yAxisIndex: 1,
            data: [418, 424, 405, 420, 396, 464, 587, 647, 623, 484],
            lineStyle: {
              color: '#2f4554'
            },
            itemStyle: {
              color: '#ffffff'
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