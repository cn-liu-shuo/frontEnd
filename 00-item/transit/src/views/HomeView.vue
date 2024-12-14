<style scoped lang="scss">
.home {
  background-color: #040d2e;
  width: 100%;
  height: 100vh;
  .box {
    padding: 2.19rem 1rem 1rem 1rem;
    .left {
      width: 36.88rem;
      // 商品销售地区统计
      .merchandising-territory {
        height: 22.75rem;
      }
      // 累计订单量排名
      .cumulative-order {
        height: 2.81rem + 17.94rem;
        margin-top: 1.25rem;
      }
    }
    .center {
      width: 44.31rem;
      margin: 0 1.44rem 0 1.38rem;
    }
    .right {
      width: 34rem;
    }
  }
}
</style>

<template>
  <div class="home">
    <div class="box">
      <div class="left">
        <div class="merchandising-territory">
          <MerchandisingTerritory></MerchandisingTerritory>
        </div>
        <div class="cumulative-order">
          <CumulativeOrder></CumulativeOrder>
        </div>
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
// 引入商品销售地区统计
import MerchandisingTerritory from "@/components/MerchandisingTerritory";
// 引入累计订单量排名
import CumulativeOrder from "@/components/CumulativeOrder.vue";
export default {
  name: "JavaScriptHomeView",
  components: {
    MerchandisingTerritory,
    CumulativeOrder
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
