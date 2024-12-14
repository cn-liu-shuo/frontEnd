<template>
  <div class="home">
    <el-row>
      <el-col :span="24">
        <div class="tit">
          <span>物业数据平台</span>
        </div>
      </el-col>
    </el-row>
    <!-- 第一行 -->
    <el-row :gutter="5">
      <el-col :span="6">
        <div class="bg">
          <revenue></revenue>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg">
          <netProfit></netProfit>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg">
          <grow></grow>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bg">
          <confiscate></confiscate>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding: 5px 0;">
      <el-col :span="6">
        <el-row style="margin-right: 5px;">
          <el-col :span="24">
            <div class="bg">
              <staff></staff>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-right: 5px;">
          <el-col :span="24" style="margin: 5px 0;">
            <div class="bg">
              <satisfaction></satisfaction>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-right: 5px;">
          <el-col :span="24">
            <div class="bg">
              <energy></energy>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <div class="bg" style="height: 555px;">
              <chinamap></chinamap>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row style="margin-left: 5px;">
          <el-col :span="24">
            <div class="bg">
              <price></price>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-left: 5px;">
          <el-col :span="24" style="margin: 5px 0">
            <div class="bg">
              <advance></advance>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-left: 5px;">
          <el-col :span="24">
            <div class="bg">
              <operate></operate>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 营业收入
import revenue from '@/components/revenue.vue';
// 净利润
import netProfit from '@/components/netProfit.vue';
// 引入规模成长
import grow from '@/components/grow.vue';
// 物业费收缴
import confiscate from '@/components/confiscate.vue';
// 引入人员数量
import staff from '@/components/staff.vue';
// 引入客户满意度
import satisfaction from '@/components/satisfaction.vue';
// 引入公区能耗
import energy from '@/components/energy.vue';
// 引入物业费单价
import price from '@/components/price.vue';
// 引入物业费预收
import advance from '@/components/advance.vue';
// 引入多种经营
import operate from '@/components/operate.vue';
// 引入地图
import chinamap from '@/components/chinamap.vue';
export default {
  components: {
    revenue,
    netProfit,
    grow,
    confiscate,
    staff,
    satisfaction,
    energy,
    price,
    advance,
    operate,
    chinamap
  },
  data() {
    return {

    };
  },

  mounted() {

  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.home {
  background-image: url(../assets/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  padding: 0 10px;
}

.tit {
  height: 45px;
  line-height: 45px;
  text-align: center;

  span {
    font-size: 14px;
    color: #fff;
  }
}

.bg {
  background: rgba(10, 18, 44, .65);
  height: 100%;
}

.on {
  background-color: pink;
  height: 222px;
}
</style>