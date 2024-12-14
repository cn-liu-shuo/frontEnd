<template>
  <div>
    <!-- -->
    <h5 class="title">
      <span></span>
      客户满意度
    </h5>
    <div id="main5" style="width: 387px;height:169px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'TenementSatisfaction',

  data() {
    return {

    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById('main5');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        grid: {
          right: '10%',
          bottom: '15%',
          left: '15%'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '客户服务 78', max: 78 },
            { name: '安全管理 74', max: 74 },
            { name: '车辆管理 64', max: 64 },
            { name: '清洁卫生 77', max: 77 },
            { name: '绿化养护 82', max: 82 },
            { name: '公共设施维护 75', max: 75 },
            { name: '入户装修 76', max: 76 },
            { name: '装修管理 70', max: 70 },
            { name: '社区文化活动 77', max: 77 },
            { name: '物业人员 79', max: 79 },
          ],
          radius: '50%'
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [50, 50, 50, 50, 50, 60, 50, 50, 50, 50],
                name: 'Allocated Budget'
              },
              {
                value: [60, 60, 60, 60, 60, 50, 60, 60, 60, 60],
                name: 'Actual Spending'
              }
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