<template>
  <div class="hello">
    <el-button @click="handle">点击</el-button>
    <span
      class="iconfont icon-gouwuche"
      style="font-size: 30px; color: green"
    ></span>
    <h1>打包命令 npm run build</h1>
    <h2 v-big="250">今天星期一真开心</h2>
    <h3 v-hi="hi"></h3>
    <input type="text" v-hi="hi" />

    <div id="my" style="height: 400px; width: 100%"></div>

    <el-upload
      class="avatar-uploader"
      action="http://joint.byesame.com/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div>{{ imageUrl }}</div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import world from "./world.json";
echarts.registerMap("hubei", world);
export default {
  name: "HelloWorld",
  data() {
    return {
      hi: "250",
      imageUrl: "",
    };
  },
  // 局部自定义指令
  directives: {
    big(element, value) {
      // element绑定元素
      // value传的值
      console.log(element, value);
      element.innerText = value.value;
    },
  },
  mounted() {
    this.handle();
  },
  methods: {
    handle() {
      let myChart = echarts.init(document.getElementById("my"));
      var mapName = "hubei";
      var mapDate = [
        { name: "鄂州市", value: 100 },
        { name: "恩施土家族苗族自治州", value: 33.33 },
        { name: "黄冈市", value: 16.67 },
        { name: "黄石市", value: 40 },
        { name: "荆门市", value: 6.67 },
        { name: "荆州市", value: 26.67 },
        { name: "潜江市", value: 33.33 },
        { name: "神农架林区", value: 23.33 },
        { name: "十堰市", value: 6.67 },
        { name: "随州市", value: 26.67 },
        { name: "天门市", value: 33.33 },
        { name: "武汉市", value: 83.33 },
        { name: "仙桃市", value: 100 },
        { name: "咸宁市", value: 16.67 },
        { name: "襄阳市", value: 60 },
        { name: "孝感市", value: 23.33 },
        { name: "宜昌市", value: 20 },
      ];
      // $.getJSON(mapJSON, (geoJson) => {
      // echarts.registerMap("hubei", geoJson);
      let option = {
        backgroundColor: "#000",
        visualMap: {
          show: true,
          bottom: 0,
          right: "5%",
          type: "piecewise",
          align: "left",
          orient: "vertical",
          inverse: true,
          textStyle: {
            color: "#95cfee",
            fontSize: 12,
          },
          itemGap: 10,
          pieces: [
            {
              gt: -1000,
              lte: 10,
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1.4, [
                {
                  offset: 0,
                  color: "rgba(35,227,202,0.7)",
                },
                {
                  offset: 0.4,
                  color: "rgba(35,227,202,0.1)",
                },
                {
                  offset: 0.5,
                  color: "rgba(35,227,202,0)",
                },
                {
                  offset: 1,
                  color: "rgba(35,227,202,0)",
                },
              ]),
              label: "0<x<10",
              symbol: "circle",
            },
            {
              gt: 10,
              lt: 20,
              // color: "rgba(82,127,239,0.5)",
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1.4, [
                {
                  offset: 0,
                  color: "rgba(82,127,239,0.7)",
                },
                {
                  offset: 0.4,
                  color: "rgba(82,127,239,0.1)",
                },
                {
                  offset: 0.5,
                  color: "rgba(82,127,239,0)",
                },
                {
                  offset: 1,
                  color: "rgba(82,127,239,0)",
                },
              ]),
              label: "10≤x<20",
              symbol: "circle",
            },
            {
              gt: 20,
              lte: 30,
              // color: "rgba(249,198,44,0.5)",
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1.4, [
                {
                  offset: 0,
                  color: "rgba(249,198,44,0.7)",
                },
                {
                  offset: 0.4,
                  color: "rgba(249,198,44,0.1)",
                },
                {
                  offset: 0.5,
                  color: "rgba(249,198,44,0)",
                },
                {
                  offset: 1,
                  color: "rgba(249,198,44,0)",
                },
              ]),
              label: "20≤x<30",
              symbol: "circle",
            },
            {
              gt: 30,
              colorAlpha: 1,
              opacity: 1,
              // color: "rgba(240,77,77,0.5)",
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1.4, [
                {
                  offset: 0,
                  color: "rgba(240,77,77,0.7)",
                },
                {
                  offset: 0.4,
                  color: "rgba(240,77,77,0.1)",
                },
                {
                  offset: 0.5,
                  color: "rgba(240,77,77,0)",
                },
                {
                  offset: 1,
                  color: "rgba(240,77,77,0)",
                },
              ]),
              label: "x≥30",
              symbol: "circle",
            },
          ],
        },
        tooltip: {
          trigger: "item",
        },
        geo: [
          {
            map: mapName,
            aspectScale: 0.8,
            zoom: 1,
            top: "12%",
            type: "map",
            z: 2,
            layoutCenter: ["50%", "42%"],
            layoutSize: "100%",
            show: true,
            roam: false,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                areaColor: {
                  type: "linear",
                  x: 60,
                  y: 10,
                  x2: 20,
                  y2: 110,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(38,58,207,0.8)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(74,133,225,0.8)", // 50% 处的颜色
                    },
                  ],
                  global: true, // 缺省为 false
                },
                borderColor: "#fff",
                borderWidth: 0.2,
              },
            },
          },
          {
            map: mapName,
            aspectScale: 0.8,
            zoom: 1,
            top: "12%",
            type: "map",
            layoutCenter: ["50%", "43%"],
            layoutSize: "100%",
            show: true,
            roam: false,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#4778C4",
                borderWidth: 1,
                shadowColor: "#8cd3ef",
                shadowOffsetY: 10,
                shadowBlur: 100,
                areaColor: "transparent",
              },
            },
          },
          {
            map: mapName,
            aspectScale: 0.8,
            zoom: 1,
            top: "12%",
            type: "map",
            layoutCenter: ["50%", "44%"],
            layoutSize: "100%",
            show: true,
            roam: false,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#4778C4",
                borderWidth: 1,
                shadowColor: "#8cd3ef",
                shadowOffsetY: 10,
                shadowBlur: 100,
                areaColor: "transparent",
              },
            },
          },
          {
            map: mapName,
            aspectScale: 0.8,
            zoom: 1,
            top: "12%",
            type: "map",
            layoutCenter: ["50%", "45%"],
            layoutSize: "100%",
            show: true,
            roam: false,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#4778C4",
                borderWidth: 1,
                shadowColor: "#8cd3ef",
                shadowOffsetY: 10,
                shadowBlur: 100,
                areaColor: "transparent",
              },
            },
          },
          {
            map: mapName,
            aspectScale: 0.8,
            zoom: 1,
            top: "12%",
            type: "map",
            layoutCenter: ["50%", "46%"],
            layoutSize: "100%",
            show: true,
            roam: false,
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#4778C4",
                borderWidth: 10,
                shadowColor: "rgba(121,149,250,1)",
                shadowOffsetY: 10,
                shadowBlur: 5,
                opacity: 0.2,
                areaColor: "rgba(121,149,250,0.1)",
              },
            },
          },
        ],
        series: [
          {
            name: mapName,
            type: "map",
            mapType: mapName,
            selectedMode: "false", //是否允许选中多个区域
            showLegendSymbol: true,
            roam: false,
            top: "8%",
            aspectScale: 0.8,
            layoutSize: "100%",
            layoutCenter: ["50%", "42%"],
            zoom: 0, //当前视角的缩放比例
            itemStyle: {
              normal: {
                areaColor: "transparent",
                borderColor: "#80AAE1",
                borderWidth: 2,
              },
              //选中样式
              emphasis: {
                disabled: true,
                borderWidth: 2,
                label: {
                  textStyle: {
                    fontSize: 12,
                    fontWeight: "bolder",
                    color: "#9CCDDC",
                    shadowColor: "rgba(39,76,193,0.4)",
                    shadowBlur: 2,
                    shadowOffsetX: 1,
                    shadowOffsetY: 1,
                  },
                },
                borderColor: "#80AAE1",
                areaColor: "transparent",
              },
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12,
                  fontWeight: "bolder",
                  color: "#9CCDDC",
                  shadowColor: "rgba(39,76,193,0.4)",
                  shadowBlur: 2,
                  shadowOffsetX: 1,
                  shadowOffsetY: 1,
                },
              },
            },
            data: mapDate,
          },
        ],
      };
      myChart.setOption(option);
      // });
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = res.data.path.replace(
        "http://localhost:3002",
        "http://joint.byesame.com/upload"
      );
      console.log(this.imageUrl, res);
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
::v-deep.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
