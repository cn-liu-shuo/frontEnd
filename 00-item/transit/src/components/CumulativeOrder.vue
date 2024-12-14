<template>
  <div class="cumulative-order">
    <!-- 累计订单量排名 -->
    <div class="tit">
      <h2>累计订单量排名</h2>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="6">
          <div class="wrap">
            <div class="col col-1"></div>
            <div class="num">965</div>
            <div class="info">今日订单统计</div>
          </div>
          <div class="wrap">
            <div class="col col-2"></div>
            <div class="num">965</div>
            <div class="info">今日订单统计</div>
          </div>
          <div class="wrap">
            <div class="col col-3"></div>
            <div class="num">965</div>
            <div class="info">今日订单统计</div>
          </div>
        </el-col>
        <el-col :span="18">
          <div id="cumulative-order" style="width: 100%;height:16.88rem;"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "JavaScriptCumulativeOrder",

  data() {
    return {};
  },

  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      var chartDom = document.getElementById("cumulative-order");
      var myChart = echarts.init(chartDom, "dark");
      var option;

      option = {
        backgroundColor: "#09153d",
        xAxis: {
          type: "category",
          data: ["中通", "圆通", "顺丰", "韵达", "天天"],
          axisLabel: {
            textStyle: {
              color: "#5de7e8",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#5de7e8",
            },
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            barWidth: "50%",
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.cumulative-order {
  background-color: #09153d;
  .tit {
    height: 2.81rem;
    h2 {
      color: #fff;
      font-size: 1.13rem;
      line-height: 1.38rem;
      font-weight: 400;
      padding-top: 0.75rem;
      padding-left: 1.63rem;
    }
  }
  .content {
    height: 17.94rem;
    ::v-deep .el-row {
      .el-col {
        margin-top: 0.88rem;
        .wrap {
          width: 7.75rem;
          height: 4.38rem;
          background-color: #04255a;
          margin: 0 auto 0.5rem auto;
          .col {
            width: 6.94rem;
            height: 0.25rem;
            margin: 0 auto;
          }
          .col-1 {
            background: radial-gradient(circle, #01d0e2, #0f2c61);
          }
          .col-2 {
            background: radial-gradient(circle, #01bd06, #062459);
          }
          .col-3 {
            background: radial-gradient(circle, #d63956, #112558);
          }
          .num {
            padding-top: 0.44rem;
            font-size: 1.75rem;
            color: #03d9eb;
            text-align: center;
          }
          .info {
            font-size: 0.88rem;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
