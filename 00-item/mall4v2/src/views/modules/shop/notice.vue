<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search" v-if="isShow">
      <el-form ref="form" :model="page" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="公告内容：">
              <el-input
                v-model="page.title"
                placeholder="请输入 公告内容"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态：">
              <el-select
                v-model="page.status"
                placeholder="请选择 状态"
                clearable
              >
                <el-option label="撤销" value="0"></el-option>
                <el-option label="公布" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否置顶：">
              <el-select
                v-model="page.isTop"
                placeholder="请选择 是否置顶"
                clearable
              >
                <el-option label="否" value="0"></el-option>
                <el-option label="是" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchList()"
              >搜索</el-button
            >
            <el-button icon="el-icon-delete" @click="clearPage()"
              >清空</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 新增与小按钮 -->
    <div class="add-and-small-btn">
      <div class="add">
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="onAdd()"
          >新增</el-button
        >
      </div>
      <div class="small-btn">
        <el-button
          size="small"
          icon="el-icon-refresh"
          circle
          @click="tableRefresh()"
        ></el-button>
        <el-button
          size="small"
          icon="el-icon-search"
          circle
          @click="searchShow()"
        ></el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="title" label="公告内容" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template v-slot="scoped">
            <el-tag size="mini" v-if="scoped.row.status === 1">公布</el-tag>
            <el-tag size="mini" v-if="scoped.row.status === 0" type="danger"
              >撤销</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="isTop" label="是否置顶" align="center">
          <template v-slot="scoped">
            <el-tag size="mini" v-if="scoped.row.isTop === 1">是</el-tag>
            <el-tag size="mini" v-if="scoped.row.isTop === 0">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scoped">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="onEdit(scoped.row.id)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="onDelete(scoped.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <pagination
        :total="page.total"
        :current="page.current"
        :size="page.size"
        @setCurrentChange="setCurrentChange"
        @setSizeChange="setSizeChange"
      ></pagination>
    </div>
    <!-- 模态框 -->
    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-click-modal="false"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公告标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="ruleForm.status" v-removeAriaHidden>
              <el-radio :label="1">公布</el-radio>
              <el-radio :label="0">撤销</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="置顶">
            <el-radio-group v-model="ruleForm.isTop" v-removeAriaHidden>
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公告内容">
            <tiny-mce v-model="ruleForm.content"></tiny-mce>
          </el-form-item>
          <el-form-item
            style="text-align: right; margin-top: 50px; margin-bottom: 0"
          >
            <el-button size="small" @click="resetForm('ruleForm')"
              >取消</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="submitForm('ruleForm')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 引入分页组件
import pagination from "@/components/pagination";
// 引入富文本组件
import tinyMce from "@/components/tiny-mce";
export default {
  components: {
    pagination,
    tinyMce,
  },
  data() {
    return {
      /**
       * 搜索栏
       */
      isShow: true,
      /**
       * 表格
       */
      tableData: [],
      loading: true,
      /**
       * 分页
       * @params page
       */
      page: {
        total: 0,
        current: 1,
        size: 10,
        title: null,
        status: null,
        isTop: null,
      },
      /**
       * 模态框
       */
      // 控制模态框显示隐藏
      dialogVisible: false,
      // 标题
      title: null,
      // 表单
      ruleForm: {
        id: null,
        title: null,
        status: 1,
        isTop: 0,
        content: null,
        url: null,
      },
      // 校验
      rules: {
        title: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    /**
     * 获取表格数据
     */
    this.getTableDataList();
  },

  mounted() {},

  methods: {
    /**
     * 搜索
     */
    // 搜索按钮
    searchList() {
      this.tableRefresh();
    },
    // 清空按钮
    clearPage() {
      this.page = {
        total: 0,
        current: 1,
        size: 10,
        title: null,
        status: null,
        isTop: null,
      };
      this.tableRefresh();
    },
    /**
     * 新增与小按钮
     */
    // 新增
    onAdd() {
      this.dialogVisible = true;
      this.title = "新增";
      this.ruleForm = {
        id: null,
        title: null,
        status: 1,
        isTop: 0,
        content: null,
        url: null,
      };
      try {
        this.$refs.ruleForm.clearValidate();
      } catch {
        return true;
      }
    },
    // 控制搜索栏显示隐藏
    searchShow() {
      this.isShow = !this.isShow;
    },
    // 控制表格刷新
    tableRefresh() {
      this.getTableDataList();
    },
    /**
     * 表格
     */
    // 获取表格数据
    getTableDataList() {
      this.$http({
        url: this.$http.adornUrl("/shop/notice/page"),
        method: "get",
        params: this.$http.adornParams(this.page),
      }).then((res) => {
        this.tableData = res.data.records;
        this.page.total = res.data.total;
        this.loading = false;
      });
    },
    // 修改
    onEdit(id) {
      this.dialogVisible = true;
      this.title = "修改";
      this.$http({
        url: this.$http.adornUrl(`/shop/notice/info/${id}`),
        method: "get",
      }).then((res) => {
        if (res.code === "00000") {
          this.ruleForm = res.data;
        }
      });
    },
    // 删除
    onDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/shop/notice/${id}`),
            method: "delete",
          }).then((res) => {
            if (res.code === "00000") {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.tableRefresh();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 分页
     */
    // 页数
    setCurrentChange(val) {
      this.page.current = val;
      this.tableRefresh();
    },
    // 条数
    setSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.tableRefresh();
    },
    /**
     * 模态框
     */
    // 取消
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    // 确定
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/shop/notice"),
            method: this.ruleForm.id === null ? "post" : "put",
            data: this.$http.adornData(this.ruleForm),
          }).then((res) => {
            if (res.code === "00000") {
              this.dialogVisible = false;
              if (this.ruleForm.id) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
              }
              this.tableRefresh();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
/**
 * 新增与小按钮
 */
.add-and-small-btn {
  display: flex;
  justify-content: space-between;
}

/**
 * 表格
 */
.table {
  margin-top: 10px;
  ::v-deep thead {
    color: #000;
  }
}

.el-table {
  font-size: 12px;
}

/**
 * 分页
 */
.pagination {
  margin-top: 10px;
}
</style>
