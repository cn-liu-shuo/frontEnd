<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      规模成长
    </h5>
    <div id="main2" style="width: 387px;height:206px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementGrow',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main2');
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
          data: ['在管面积', '人均在管面积'],
          textStyle: {
            color: '#ffffff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['2015', '2016', '2017', '2018'],
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
            max: 2000,
            interval: 500,
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
            min: 0,
            max: 0.8,
            interval: 0.2,
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
            name: '在管面积',
            type: 'bar',
            barWidth: '10%',
            itemStyle: {
              color: '#f691b8'
            },
            data: [879, 1218, 1488, 1751]
          },
          {
            name: '人均在管面积',
            type: 'line',
            yAxisIndex: 1,
            data: [0.51, 0.52, 0.56, 0.64],
            lineStyle: {
              color: 'red',
              width: 4
            },
            itemStyle: {
              color: 'red'
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