<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      人员数量
    </h5>
    <div id="main4" style="width: 387px;height:164px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementStaff',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main4');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        grid: {
          right: '10%',
          bottom: '15%',
          left: '20%'
        },
        legend: {
          right: 'right',
          data: ['工程', '客服', '保洁', '自有', '外委', '秩序'],
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner',
              fontSize: 8,
              color: '#ffffff'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1548, name: '自有' },
              { value: 775, name: '外委' }
            ]
          },
          {
            name: 'Access From',
            type: 'pie',
            radius: ['35%', '50%'],
            labelLine: {
              length: 30
            },
            label: {
              formatter: '{b}',
              borderWidth: 1,
              borderRadius: 4,
              textStyle: {
                color: '#ffffff'
              }
            },
            data: [
              { value: 335, name: '工程' },
              { value: 310, name: '客服' },
              { value: 234, name: '保洁' },
              { value: 135, name: '秩序' }
            ]
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