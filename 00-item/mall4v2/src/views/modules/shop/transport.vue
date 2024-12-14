<template>
  <div class="mod-transport">
    <avue-crud
      ref="crudRef"
      :page="page"
      :data="dataList"
      :option="tableOption"
      @search-change="onSearch"
      @selection-change="selectionChange"
      @on-load="getDataList"
    >
      <template #prod-prop-values="scope">
        <el-tag v-for="item in scope.row.prodPropValues" :key="item.valueId">
          {{ item.propValue }}
        </el-tag>
      </template>
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

      <template #menu="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click.stop="onAddOrUpdate(scope.row.transportId)"
        >
          修改
        </el-button>

        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click.stop="onDelete(scope.row.transportId)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdateRef"
      @refresh-data-list="getDataList"
    />
  </div>
</template>

<script>
import addOrUpdate from "./transport-update";
import { tableOption } from "@/crud/shop/transport";
export default {
  components: {
    addOrUpdate,
  },
  data() {
    return {
      tableOption: null,
      dataList: [],
      dataListSelections: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      addOrUpdateVisible: false,
      addOrUpdateRef: null,
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
      this.$http({
        url: this.$http.adornUrl("/shop/transport/page"),
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
        if (done) done();
      });
    },
    /**
     * 新增 / 修改
     * @param id
     */
    onAddOrUpdate(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdateRef.init(id);
      });
    },
    /**
     * 删除
     * @param id
     */
    onDelete(id) {
      const ids = id
        ? [id]
        : dataListSelections.value?.map((item) => item.transportId);
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/shop/transport"),
            method: "delete",
            data: this.$http.adornData(ids, false),
          }).then(() => {
            this.$message({
              message: "操作成功",
              type: "success",
            });
            this.getDataList();
          });
        })
        .catch(() => {});
    },
    /**
     * 条件查询
     */
    onSearch(params, done) {
      this.getDataList(this.page, params, done);
    },
    /**
     * 多选变化
     */
    selectionChange(val) {
      this.dataListSelections = val;
    },
  },
};
</script>
