<template>
  <div class="mod-prod">
    <avue-crud
      ref="crudRef"
      :page="page"
      :data="dataList"
      :option="tableOption"
      @search-change="onSearch"
      @on-load="getDataList"
    >
      <template #prodPropValues="scope">
        <el-tag
          size="mini"
          v-for="item in scope.row.prodPropValues"
          :key="item.valueId"
        >
          {{ item.propValue }}
        </el-tag>
      </template>
      <template #menuLeft>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click.stop="onSpecUpdate()"
        >
          新增
        </el-button>
      </template>
      <template #menu="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click.stop="onSpecUpdate(scope.row)"
        >
          编辑
        </el-button>

        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click.stop="onDelete(scope.row.propId)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <spec-update
      v-if="specUpdateVisible"
      ref="specUpdateRef"
      @refreshDataList="getDataList"
    />
  </div>
</template>

<script>
import { tableOption } from "@/crud/prod/spec.js";
import specUpdate from "./spec-update";
export default {
  components: {
    specUpdate,
  },
  data() {
    return {
      tableOption: null,
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      page: {
        total: 0,
        current: 1,
        page: 10,
      },
      specUpdateVisible: false,
      specUpdateRef: null,
    };
  },

  created() {
    this.tableOption = tableOption;
  },

  mounted() {},

  methods: {
    /**
     * 获取数据列表
     */
    getDataList(pageParam, params, done) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/prod/spec/page"),
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
     * @param val
     */
    onSpecUpdate(val) {
      this.specUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.specUpdateRef.init(val);
      });
    },
    /**
     * 删除
     * @param id
     */
    onDelete(id) {
      const ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.propId;
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/prod/spec/${ids}`),
            method: "delete",
            data: this.$http.adornData(ids, false),
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
    onSearch(params, done) {
      this.getDataList(this.page, params, done);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep.prop-value {
  display: inline-block;
  margin: 0 3px 3px 0;
}
</style>
