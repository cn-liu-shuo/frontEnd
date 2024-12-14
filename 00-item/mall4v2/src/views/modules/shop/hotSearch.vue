<template>
  <div class="mod-hotSearcch">
    <avue-crud
      ref="crudRef"
      :page="page"
      :data="dataList"
      :table-loading="dataListLoading"
      :option="tableOption"
      @search-change="onSearch"
      @on-load="getDataList"
      @refresh-change="refreshChange"
      @selection-change="selectionChange"
    >
      <template #menuLeft>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="onHotSearchUpdate()"
        >
          新增
        </el-button>
        <el-button
          size="small"
          type="danger"
          :disabled="dataListSelections.length <= 0"
          @click.stop="onDeconste"
        >
          批量删除
        </el-button>
      </template>

      <template #status="scope">
        <el-tag size="mini" v-if="scope.row.status === 0" type="danger">
          未启用
        </el-tag>
        <el-tag size="mini" v-else> 启用 </el-tag>
      </template>

      <template #menu="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="onHotSearchUpdate(scope.row.hotSearchId)"
        >
          修改
        </el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click.stop="onDeconste(scope.row, scope.index)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>

    <!-- 弹窗, 新增 / 修改 -->
    <hot-search-update
      v-if="hotSearchUpdateVisible"
      ref="hotSearchUpdateRef"
      @refreshDataList="getDataList"
    />
  </div>
</template>

<script>
import { tableOption } from "@/crud/shop/hotSearch.js";
import hotSearchUpdate from "./hotSearch-update";
export default {
  components: {
    hotSearchUpdate,
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
      dataListSelections: [],
      hotSearchUpdateVisible: false,
      hotSearchUpdateRef: null,
    };
  },

  created() {
    this.tableOption = tableOption;
  },

  mounted() {
    this.getDataList(this.page);
  },

  methods: {
    /**
     * 获取数据列表
     */
    getDataList(pageParam, params, done) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/admin/hotSearch/page"),
        method: "get",
        params: this.$http.adornParams(
          Object.assign(
            {
              current: pageParam ? pageParam.currentPage : 1,
              size: pageParam ? pageParam.pageSize : 20,
            },
            params
          )
        ),
      }).then(({ data }) => {
        this.page.total = data.total;
        this.page.size = data.size;
        this.page.current = data.current;
        this.dataList = data.records;
        this.dataListLoading = false;
        if (done) done();
      });
    },
    /**
     * 多选回调
     * @param list
     */
    selectionChange(list) {
      this.dataListSelections = list;
    },
    /**
     * 点击查询
     */
    onSearch(params, done) {
      this.getDataList(this.page, params, done);
    },
    /**
     * 新增 / 修改
     * @param id
     */
    onHotSearchUpdate(id) {
      this.hotSearchUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.hotSearchUpdateRef.init(id);
      });
    },
    /**
     * 删除
     */
    onDeconste(row) {
      const ids = row.hotSearchId
        ? [row.hotSearchId]
        : this.dataListSelections.map((item) => {
            return item.hotSearchId;
          });
      this.$confirm(
        `确定进行[${row.hotSearchId ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/admin/hotSearch"),
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
    refreshChange() {
      this.getDataList(this.page);
    },
  },
};
</script>
