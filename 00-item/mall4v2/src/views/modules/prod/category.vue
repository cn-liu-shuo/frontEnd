<template>
  <div class="mod-category">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="onCategoryUpdate()"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border row-key="categoryId" style="width: 100%">
      <el-table-column
        prop="categoryName"
        header-align="center"
        tree-key="categoryId"
        width="150"
        label="分类名称"
      />
      <el-table-column
        prop="pic"
        header-align="center"
        align="center"
        label="图片"
      >
        <template #default="scope">
          <img alt="" :src="resourcesUrl + scope.row.pic" />
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态"
      >
        <template #default="scope">
          <el-tag size="mini" v-if="scope.row.status === 0" type="danger">
            下线
          </el-tag>
          <el-tag size="mini" v-else> 正常 </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="seq"
        header-align="center"
        align="center"
        label="排序号"
      />
      <el-table-column header-align="center" align="center" label="操作">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            @click="onCategoryUpdate(scope.row.categoryId)"
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="onDelete(scope.row.categoryId)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <categoryUpdate
      v-if="categoryUpdateVisible"
      ref="categoryUpdateRef"
      @refreshDataList="getDataList"
      @close="categoryUpdateVisible = false"
    />
  </div>
</template>

<script>
import { treeDataTranslate } from "@/utils";
import categoryUpdate from "./category-update";
export default {
  components: {
    categoryUpdate,
  },
  data() {
    return {
      resourcesUrl: null,
      dataForm: {},
      dataList: [],
      dataListLoading: false,
      categoryUpdateVisible: false,
      categoryUpdateRef: null,
    };
  },

  mounted() {
    this.getDataList();
    this.resourcesUrl = process.env.VUE_APP_RESOURCES_URL;
  },

  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/prod/category/table"),
        method: "get",
        params: this.$http.adornParams(),
      }).then(({ data }) => {
        (this.dataList = treeDataTranslate(data, "categoryId", "parentId")),
          (this.dataListLoading = false);
      });
    },
    /**
     * 新增 / 修改
     * @param id
     */
    onCategoryUpdate(id) {
      this.categoryUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.categoryUpdateRef.init(id);
      });
    },
    /**
     * 删除
     * @param id
     */
    onDelete(id) {
      this.$confirm("确定进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(`/prod/category/${id}`),
          method: "delete",
        }).then(() => {
          this.$message({
            message: "操作成功",
            type: "success",
          });
          this.getDataList();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mod-category {
  img {
    height: 80px;
    width: 200px;
  }
}
</style>
