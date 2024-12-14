<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      多种经营
    </h5>
    <div id="main9" style="width: 387px;height:164px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementOperate',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main9');
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
          data: ['完成值', '目标值', '月度完成率', '年度完成率'],
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
            min: 0,
            max: 70000,
            interval: 20000,
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
            name: '完成值',
            type: 'bar',
            itemStyle: {
              color: 'pink'
            }
          },
          {
            name: '目标值',
            type: 'line',
            itemStyle: {
              color: 'red'
            },
            lineStyle: {
              color: 'red',
            }
          },
          {
            name: '月度完成率',
            type: 'line',
            yAxisIndex: 1,
            data: [
              101, 88, 88, 103, 109, 111, 112, 113, 111, 110
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
            name: '年度完成率',
            type: 'line',
            yAxisIndex: 1,
            data: [8, 15, 22, 34, 45, 55, 65, 76, 83, 92],
            lineStyle: {
              color: '#61a0a8'
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