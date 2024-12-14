<template>
  <div class="er">
    <div class="a1">
      <div id="mainx" style=" width: 779px;height: 555px"></div>
    </div>
    <div class="left">
      <p v-for="(company, index) in open" :key="index">
        {{ company.name }}
      </p>
    </div>
    <div class="right">
      <p v-for="(company, index) in opens" :key="index">
        {{ company.name }}
      </p>
    </div>
    <div class="dikuang">
      <div style="float: left;  margin-right: 10px;">
        <p style="color: #B1E2FE; margin: 0px;">在管面积</p>
        <p style="font-size: 24px;margin: 0px; color: #fff; font-weight: bold;">1548<span
            style="font-size: 12px;">万平米</span></p>
      </div>
      <div style="float: left; margin-right: 10px;">
        <p style="color: #B1E2FE; margin: 0px;">再管户数</p>
        <p style="font-size: 24px; margin: 0px; color: #fff; font-weight: bold;">12<span
            style="font-size: 12px;">万</span></p>
      </div>
      <div style="float: left;  margin-right: 10px;">
        <p style="color: #B1E2FE; margin: 0px;">在管项目</p>
        <p style="font-size: 24px; margin: 0px; color: #fff; font-weight: bold;">78<span
            style="font-size: 12px;">个</span></p>
      </div>
      <div style="float: left;  margin-right: 10px;">
        <p style="color: #B1E2FE; margin: 0px;">储备项目</p>
        <p style="font-size: 24px; margin: 0px; color: #fff; font-weight: bold;">54<span
            style="font-size: 12px;">个</span></p>
      </div>
    </div>
    <div class="dingkuai">
      <div style="float: left; margin-right: 100px;">
        <p style="color: #fff; margin: 0; font-size: 16px;">今日实收<span style="font-size: 10px;">2018-11-09
            00:00:00</span></p>
        <p style="color: #B1E2FE;  margin: 0; font-size: 28px; font-weight: bold;">1605143<span
            style="font-size: 16px;">元</span></p>
      </div>
      <div style="float: left;">
        <p style="color: #fff; margin: 0; font-size: 16px;">累计实收</p>
        <p style="color: #B1E2FE;  margin: 0; font-size: 28px; font-weight: bold;">46545<span
            style="font-size: 16px;">万元</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "TenementMap",
  data() {
    return {
      open: [
        { name: '北京分公司(63万平米)' },
        { name: '北京房山分公司(63万平米)' },
        { name: '北京门头沟分公司(44万平米)' },
        { name: '北京通州分公司(51万平米)' },
        { name: '北京顺义分公司(13万平米)' },
        { name: '北京大兴分公司(10万平米)' },
        { name: '北京朝阳分公司(0万平米)' },
        { name: '北京第一分公司(0万平米)' },
        { name: '天津分公司(65万平米)' },
        { name: '保定分公司(43万平米)' },
        { name: '成都分公司(172万平米)' },
        { name: '武汉分公司(55万平米)' },
        { name: '西安分公司(0万平米)' },
        { name: '重庆分公司(0万平米)' },
        { name: '昆明分公司(0万平米)' },
        { name: '贵阳分公司(160万平米)' },
        { name: '贵安新区分公司(21万平米)' }
      ],
      opens: [
        { name: '长春分公司(64万平米)' },
        { name: '大连分公司(31万平米)' },
        { name: '延吉分公司(19万平米)' },
        { name: '济南分公司(0万平米)' },
        { name: '合肥分公司(206万平米)' },
        { name: '南京分公司(39万平米)' },
        { name: '徐州分公司(20万平米)' },
        { name: '苏州分公司(0万平米)' },
        { name: '上海分公司(30万平米)' },
        { name: '杭州分公司(58万平米)' },
        { name: '宁波分公司(0万平米)' },
        { name: '象山分公司(8万平米)' },
        { name: '嘉兴分公司(0万平米)' },
        { name: '福州分公司(0万平米)' },
        { name: '长沙分公司(80万平米)' },
        { name: '广州分公司(50万平米)' },
        { name: '佛山分公司(20万平米)' },
        { name: '南宁分公司(90万平)' }
      ],
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    async initChart() {
      const res = await axios.get(
        "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"
      );
      echarts.registerMap("china", res.data);
      var chartDom = document.getElementById('mainx');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          top: 10,
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        series: [{
          type: 'map',
          map: 'china',
          tooltip: {
            show: false
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 16
          },
          aspectScale: 0.75,
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: '118%',
          roam: true,
          geoIndex: 0,
          itemStyle: {
            normal: {
              borderColor: 'rgba(147, 235, 248, 0.6)',
              borderWidth: 0.8,
              areaColor: {
                type: 'linear-gradient',
                x: 0,
                y: 1200,
                x2: 1000,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: '#009DA1' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#005B9E' // 50% 处的颜色
                }],
                global: true // 缺省为 false
              },
            },
            emphasis: {
              areaColor: 'rgba(147, 235, 248, 0)'
            }
          },
          zlevel: 1
        }]
      };


      myChart.setOption(option);


    }
  }
}
</script>

<style>
.er {
  width: 779px;
  height: 555px;
  position: relative;
}

.a1 {
  font-size: 20px;
  color: #fff;
  width: 20rem;
  height: 6rem;
}

.left {
  width: 8rem;
  height: 13rem;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3;
  position: absolute;
}

.left p {
  font-size: 9px;
  color: #ccc;
  margin: 0px !important;
}

.right {
  width: 7rem;
  height: 13.9rem;
  float: right;
  /* margin-top: -13rem; */
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  right: 0px;
}

.right p {
  font-size: 9px;
  color: #ccc;
  margin: 0px !important;
}

.dikuang {
  position: absolute;
  bottom: 2rem;
  left: 3rem;
}

.dingkuai {
  position: absolute;
  left: 25%;
  top: 5%;
}
</style>