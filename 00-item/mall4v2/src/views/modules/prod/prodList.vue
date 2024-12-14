<template>
  <div class="mod-prod">
    <avue-crud
      ref="crudRef"
      :page="page"
      :data="dataList"
      :table-loading="dataListLoading"
      :option="tableOption"
      @search-change="onSearch"
      @selection-change="selectionChange"
      @on-load="getDataList"
    >
      <template #menuLeft>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click.stop="onAddOrUpdate()"
        >
          新增
        </el-button>

        <el-button
          size="small"
          type="danger"
          :disabled="dataListSelections.length <= 0"
          @click="onDelete()"
        >
          批量删除
        </el-button>
      </template>

      <template #status="scope">
        <el-tag size="mini" v-if="scope.row.status === 1"> 上架 </el-tag>
        <el-tag size="mini" v-else> 未上架 </el-tag>
      </template>

      <template #menu="scope">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-edit"
          @click="onAddOrUpdate(scope.row.prodId)"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="onDelete(scope.row.prodId)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { tableOption } from "@/crud/prod/prodList.js";
export default {
  data() {
    return {
      tableOption: null,
      dataList: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      dataListLoading: false,
      dataListSelections: [],
    };
  },

  created() {
    this.tableOption = tableOption;
  },

  mounted() {},

  methods: {
    // 表格
    getDataList(pageParam, params, done) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/prod/prod/page"),
        method: "get",
        params: this.$http.adornParams(
          Object.assign(
            {
              current:
                pageParam == null ? this.page.current : pageParam.currentPage,
              size: pageParam == null ? this.page.size : pageParam.pageSize,
            },
            params
          )
        ),
      }).then(({ data }) => {
        this.dataList = data.records;
        for (const key in this.dataList) {
          // eslint-disable-next-line no-prototype-builtins
          if (this.dataList.hasOwnProperty(key)) {
            const element = this.dataList[key];
            element.imgs = element.imgs.split(",")[0];
          }
        }
        this.page.total = data.total;
        this.dataListLoading = false;
        if (done) done();
      });
    },
    /**
     * 新增 / 修改
     * @param id
     */
    onAddOrUpdate(id) {
      this.$router.push({
        path: "/prodInfo",
        query: { prodId: id },
      });
    },
    /**
     * 删除和批量删除
     * @param id
     */
    onDelete(id) {
      const prodIds = this.getSeleProdIds();
      if (id) {
        prodIds.push(id);
      }
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/prod/prod"),
            method: "delete",
            data: this.$http.adornData(prodIds, false),
          }).then(() => {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.getDataList(this.page);
          });
        })
        .catch(() => {});
    },
    /**
     * 条件查询
     * @param params
     * @param done
     */
    onSearch(params, done) {
      this.getDataList(this.page, params, done);
    },
    /**
     * 多选变化
     * @param val
     */
    selectionChange(val) {
      this.dataListSelections = val;
    },
    /**
     * 获取选中的商品Id列表
     */
    getSeleProdIds() {
      return this.dataListSelections.map((item) => {
        return item.prodId;
      });
    },
  },
};
</script>
