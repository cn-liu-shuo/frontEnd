<template>
  <div class="mod-order-order">
    <el-form :inline="true" :model="dataForm" @keyup.enter="getDataList(page)">
      <el-form-item label="订单编号:">
        <el-input
          v-model="dataForm.orderNumber"
          placeholder="订单编号"
          clearable
        />
      </el-form-item>
      <el-form-item label="下单时间:">
        <!-- <el-date-picker v-model="dateRange" type="datetimerange" range-separator="至" value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始日期" end-placeholder="结束日期" /> -->
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态:">
        <el-select
          v-model="dataForm.status"
          clearable
          placeholder="请选择订单状态"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getDataList()">
          查询
        </el-button>
        <el-button type="primary" @click="showConsignmentInfo()">
          导出待发货订单
        </el-button>
        <el-button type="primary" @click="getSoldExcel()">
          导出销售记录
        </el-button>
        <el-button @click="clearDatas()"> 清空 </el-button>
      </el-form-item>
    </el-form>
    <div class="main">
      <div class="content">
        <div class="tit">
          <el-row style="width: 100%">
            <el-col :span="10">
              <span class="item product">商品</span>
            </el-col>
            <el-col :span="3">
              <span class="item">成交单价/购买数量</span>
            </el-col>
            <el-col :span="3">
              <span class="item">实付金额</span>
            </el-col>
            <el-col :span="3">
              <span class="item">支付方式</span>
            </el-col>
            <el-col :span="3">
              <span class="item">订单状态</span>
            </el-col>
            <el-col :span="2">
              <span class="item">操作</span>
            </el-col>
          </el-row>
        </div>
        <div v-for="order in dataList" :key="order.orderId" class="prod">
          <div class="prod-tit">
            <span>订单编号：{{ order.orderNumber }}</span>
            <span>下单时间：{{ order.createTime }}</span>
          </div>
          <div class="prod-cont">
            <el-row style="width: 100%">
              <el-col :span="12">
                <div class="prod-item">
                  <div
                    v-for="orderItem in order.orderItems"
                    :key="orderItem.orderItemId"
                    class="items name"
                  >
                    <div class="prod-image">
                      <img
                        alt=""
                        :src="resourcesUrl + orderItem.pic"
                        style="height: 100px; width: 100px"
                      />
                    </div>
                    <div class="prod-name">
                      <span>{{ orderItem.prodName }}</span>
                      <span class="prod-info">{{ orderItem.skuName }}</span>
                    </div>
                    <div class="prod-price">
                      <span>￥{{ orderItem.price }}</span>
                      <span>×{{ orderItem.prodCount }}</span>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="3" style="height: 100%">
                <div class="item">
                  <div>
                    <span class="totalprice">￥{{ order.actualTotal }}</span>
                    <span v-if="order.freightAmount"
                      >（含运费：￥{{ order.freightAmount }}）</span
                    >
                    <span>共{{ order.productNums }}件</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="3" style="height: 100%">
                <div class="item">
                  <div>
                    <span v-if="order.payType === 1">微信支付</span>
                    <span v-else-if="order.payType === 2">支付宝</span>
                    <span v-else>手动代付</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="3" style="height: 100%">
                <div class="item">
                  <span v-if="order.status === 1" type="danger">待付款</span>
                  <span v-else-if="order.status === 2" type="danger"
                    >待发货</span
                  >
                  <span v-else-if="order.status === 3" type="danger"
                    >待收货</span
                  >
                  <span v-else-if="order.status === 4" type="danger"
                    >待评价</span
                  >
                  <span v-else-if="order.status === 5" type="danger">成功</span>
                  <span v-else>失败</span>
                </div>
              </el-col>
              <el-col :span="3" style="height: 100%">
                <div class="item">
                  <div class="operate">
                    <el-button
                      type="text"
                      @click="onAddOrUpdate(order.orderNumber)"
                    >
                      查看
                    </el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="remark">
            <div class="buyer-remark">
              <span>备注:{{ order.remarks }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 空 -->
    <div v-if="!dataList.length" class="empty-tips">暂无数据</div>
    <pagination
      :total="page.total"
      :current="page.current"
      :size="page.size"
      @setCurrentChange="setCurrentChange"
      @setSizeChange="setSizeChange"
    ></pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdateRef"
      @refresh-data-list="getDataList"
    />
    <consignment-info
      v-if="consignmentInfoVisible"
      ref="consignmentInfoRef"
      @inputCallback="getWaitingConsignmentExcel"
    />
  </div>
</template>

<style lang="scss" scoped>
.mod-order-order {
  .tit {
    display: flex;
    height: 45px;
    align-items: center;
  }

  .tit {
    .item {
      padding: 0 10px;
      width: 10%;
      text-align: center;
    }

    .product {
      width: 25%;
    }
  }

  .prod-tit {
    padding: 10px;
    background: #f8f8f9;
    border-left: 1px solid #dddee1;
    border-top: 1px solid #dddee1;
    border-right: 1px solid #dddee1;

    span {
      margin-right: 15px;
    }
  }

  .prod-cont {
    display: flex;
    border-top: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    border-left: 1px solid #dddee1;
    color: #495060;

    .item {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-right: 1px solid #dddee1;
      text-align: center;
      height: 100%;

      span {
        display: block;
      }
    }

    .prod-item {
      display: flex;
      flex-direction: column;
      border-right: 1px solid #dddee1;
    }

    .items.name {
      display: flex;
      position: relative;
      padding: 20px;
      border-bottom: 1px solid #dddee1;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .prod-name {
    width: 55%;
    text-align: left;

    .prod-info {
      display: block;
      color: #80848f;
      margin-top: 30px;
    }
  }

  .prod-price {
    position: absolute;
    right: 40px;
    text-align: right;

    span {
      display: block;
      margin-bottom: 10px;
    }
  }

  .prod-image {
    margin-right: 20px;
    width: 100px;
    height: 100px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  .item {
    span {
      display: block;
      margin-bottom: 10px;
    }

    .operate {
      color: #2d8cf0;
    }

    .totalprice {
      color: #c00;
    }
  }

  .prod {
    .remark {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: #e8f7f6;
      border-left: 1px solid #dddee1;
      border-right: 1px solid #dddee1;
      border-bottom: 1px solid #dddee1;
      margin-bottom: 20px;
    }
  }

  .buyer-remark {
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .empty-tips {
    display: block;
    width: 100%;
    text-align: center;
    margin: 50px 0;
    color: #999;
  }
}
</style>

<script>
import pagination from "@/components/pagination";
import consignmentInfo from "./consignment-info.vue";
import AddOrUpdate from "./order-info.vue";
export default {
  components: {
    pagination,
    consignmentInfo,
    AddOrUpdate,
  },
  data() {
    return {
      resourcesUrl: null,
      dataForm: {},
      dateRange: [],
      options: [
        {
          value: 1,
          label: "待付款",
        },
        {
          value: 2,
          label: "待发货",
        },
        {
          value: 3,
          label: "待收货",
        },
        {
          value: 4,
          label: "待评价",
        },
        {
          value: 5,
          label: "成功",
        },
        {
          value: 6,
          label: "失败",
        },
      ],
      dataList: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      addOrUpdateRef: null,
      addOrUpdateVisible: false,
      consignmentInfoRef: null,
      consignmentInfoVisible: false,
    };
  },
  mounted() {
    this.getDataList(this.page);
    this.resourcesUrl = process.env.VUE_APP_RESOURCES_URL;
  },
  methods: {
    // 表格
    getDataList(pageParam, params, done) {
      pageParam = pageParam === undefined ? this.page : pageParam;
      this.$http({
        url: this.$http.adornUrl("/order/order/page"),
        method: "get",
        params: this.$http.adornParams(
          Object.assign(
            {
              current:
                pageParam == null ? this.page.current : pageParam.currentPage,
              size: pageParam == null ? this.page.size : pageParam.pageSize,
              orderNumber: this.dataForm.orderNumber,
              status: this.dataForm.status,
              startTime: this.dateRange === null ? null : this.dateRange[0], // 开始时间
              endTime: this.dateRange === null ? null : this.dateRange[1], // 结束时间
            },
            params
          ),
          false
        ),
      }).then(({ data }) => {
        this.dataList = data.records;
        this.page.total = data.total;
        if (done) done();
      });
    },
    // 清除数据
    clearDatas() {
      this.dataForm = {};
      this.dateRange = [];
      this.getDataList(this.page);
    },
    setCurrentChange(val) {
      this.page.current = val;
      this.getDataList(page);
    },
    setSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getDataList(page);
    },
    // 查看
    onAddOrUpdate(val) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdateRef.init(val);
      });
    },
    showConsignmentInfo() {
      this.consignmentInfoVisible = true;
      this.$nextTick(() => {
        this.$refs.consignmentInfoRef.init();
      });
    },
    // 导出表格
    getWaitingConsignmentExcel(consignmentInfo) {
      this.$http({
        url: this.$http.adornUrl("/order/order/waitingConsignmentExcel"),
        method: "get",
        params: this.$http.adornParams({
          consignmentName: consignmentInfo.consignmentName,
          consignmentMobile: consignmentInfo.consignmentMobile,
          consignmentAddr: consignmentInfo.consignmentAddr,
          startTime: this.dateRange === null ? null : this.dateRange[0], // 开始时间
          endTime: this.dateRange === null ? null : this.dateRange[1], // 结束时间
        }),
        responseType: "blob", // 解决文件下载乱码问题
      }).then(({ data }) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        const fileName = "待发货信息整理.xls";
        const elink = document.createElement("a");
        if ("download" in elink) {
          // 非IE下载
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    getSoldExcel() {
      this.$http({
        url: this.$http.adornUrl("/order/order/soldExcel"),
        method: "get",
        params: this.$http.adornParams({
          startTime: this.dateRange === null ? null : this.dateRange[0], // 开始时间
          endTime: this.dateRange === null ? null : this.dateRange[1], // 结束时间
        }),
        responseType: "blob", // 解决文件下载乱码问题
      }).then(({ data }) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        const fileName = "销售信息整理.xls";
        const elink = document.createElement("a");
        if ("download" in elink) {
          // 非IE下载
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
  },
};
</script>
