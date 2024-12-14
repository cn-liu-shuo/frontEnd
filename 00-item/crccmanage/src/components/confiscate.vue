<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      物业费收缴
    </h5>
    <div id="main3" style="width: 387px;height:206px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementConfiscate',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main3');
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
          data: ['完成值', '目标值', '收缴率'],
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
            name: '（万元）',
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
              formatter: '{value} %', // 将Y轴的值格式化为百分比形式
              textStyle: {
                color: '#ffffff',
                fontSize: 10
              }
            }
          }
        ],
        series: [
          {
            name: '目标值',
            type: 'line',
            data: [
              94, 94, 94, 94, 94, 94, 94, 94, 94, 94,
              94
            ],
            lineStyle: {
              color: 'red',
              width: 4
            },
            itemStyle: {
              color: 'red'
            }
          },
          {
            name: '完成值',
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              color: '#f691b8'
            },
            data: [9613, 11567, 13055, 15039, 16593, 18159, 19369, 20464, 21959, 23325]
          },
          {
            name: '收缴率',
            type: 'line',
            yAxisIndex: 1,
            data: [34, 40, 45, 52, 56, 62, 66, 72, 75, 80],
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