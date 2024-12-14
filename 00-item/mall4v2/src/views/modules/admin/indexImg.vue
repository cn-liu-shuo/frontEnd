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

      <template #imgUrl="scope">
        <img
          v-if="scope.row.imgUrl"
          alt=""
          :src="scope.row.imgUrl"
          width="100"
          height="100"
        />
        <img
          v-else
          alt=""
          src="~@/assets/img/def.png"
          width="100"
          height="100"
        />
      </template>
      <template #menu="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="onAddOrUpdate(scope.row.imgId)"
        >
          修改
        </el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="onDelete(scope.row.imgId)"
        >
          删除
        </el-button>
      </template>
    </avue-crud>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdateRef"
      @refreshDataList="getDataList"
    />
  </div>
</template>

<script>
import AddOrUpdate from "./indexImg-add-or-update.vue";
import { tableOption } from "@/crud/admin/indexImg.js";
export default {
  components: {
    AddOrUpdate,
  },
  data() {
    return {
      tableOption: null,
      resourcesUrl: null,
      dataList: [],
      dataListLoading: false,
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

  mounted() {
    this.resourcesUrl = process.env.VUE_APP_RESOURCES_URL;
  },

  methods: {
    /**
     * 获取数据列表
     */
    getDataList(pageParam, params, done) {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/admin/indexImg/page"),
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
        data.records.forEach((item) => {
          item.imgUrl = item.imgUrl ? this.resourcesUrl + item.imgUrl : "";
        });
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
        : this.dataListSelections.map((item) => {
            return item.imgId;
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl("/admin/indexImg"),
          method: "delete",
          data: this.$http.adornData(ids, false),
        }).then(() => {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.getDataList();
        });
      });
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
