<template>
  <div class="mod-prod-prodTag">
    <avue-crud
      ref="crudRef"
      :page="page"
      :data="dataList"
      :table-loading="dataListLoading"
      :option="tableOption"
      @search-change="onSearch"
      @on-load="getDataList"
      @refresh-change="refreshChange"
    >
      <template #menuLeft>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="onProdTagUpdate()"
        >
          新增
        </el-button>
      </template>
      <template #title="scope">
        {{ scope.row.title || "-" }}
      </template>
      <template #status="scope">
        <el-tag size="mini" v-if="scope.row.status === 0" type="danger">
          禁用
        </el-tag>
        <el-tag size="mini" v-else> 正常 </el-tag>
      </template>

      <template #isDfault="scope">
        <el-tag size="mini" v-if="scope.row.isDefault === 0">
          自定义类型
        </el-tag>
        <el-tag size="mini" v-else> 默认类型 </el-tag>
      </template>

      <template #menu="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="onProdTagUpdate(scope.row.id)"
        >
          修改
        </el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click.stop="onDelete(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>
    <prodTagUpdate
      v-if="prodTagUpdateVisible"
      ref="prodTagUpdateRef"
      @refreshDataList="refreshChange"
    />
  </div>
</template>

<script>
import { tableOption } from "@/crud/prod/prodTag.js";
import prodTagUpdate from "./prodTag-update";
export default {
  components: {
    prodTagUpdate,
  },
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
      prodTagUpdateVisible: false,
      prodTagUpdateRef: null,
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
        url: this.$http.adornUrl("/prod/prodTag/page"),
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
        this.page.total = data.total;
        this.dataListLoading = false;
        if (done) done();
      });
    },
    /**
     * 新增 / 修改
     * @param id
     */
    onProdTagUpdate(id) {
      this.prodTagUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.prodTagUpdateRef.init(id);
      });
    },
    // 删除
    onDelete(id) {
      this.$confirm("确定进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/prod/prodTag/" + id),
            method: "delete",
            data: this.$http.adornData({}),
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
     * 刷新回调
     */
    refreshChange() {
      this.getDataList(this.page);
    },
    onSearch(params, done) {
      this.getDataList(this.page, params, done);
    },
  },
};
</script>

<style lang="scss" scoped></style>
