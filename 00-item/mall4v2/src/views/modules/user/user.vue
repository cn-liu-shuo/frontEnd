<template>
  <div>
    <!-- 搜索 -->
    <div class="search" v-if="isShow">
      <el-form ref="form" :model="page" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户昵称：">
              <el-input
                v-model="page.nickName"
                placeholder="请输入 用户昵称"
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
                <el-option label="禁用" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="onSearch()"
                >搜索</el-button
              >
              <el-button icon="el-icon-delete" @click="onClear()"
                >清空</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 刷新 -->
    <div class="refresh">
      <el-button
        size="small"
        icon="el-icon-refresh"
        circle
        @click="onRefresh()"
      ></el-button>
      <el-button
        size="small"
        icon="el-icon-search"
        circle
        @click="onShow()"
      ></el-button>
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
        <el-table-column prop="nickName" label="用户昵称"> </el-table-column>
        <el-table-column prop="pic" label="用户头像">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" width="40" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.status === 1">正常</el-tag>
            <el-tag size="mini" v-if="scope.row.status === 0" type="danger"
              >禁用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="userRegtime" label="注册时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="onEdit(scope.row.userId)"
              >编辑</el-button
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
      <el-dialog title="修改" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户头像">
            <img :src="ruleForm.pic" alt=" " />
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="ruleForm.nickName" disabled></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="ruleForm.status" v-removeAriaHidden>
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">正常</el-radio>
            </el-radio-group>
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
import pagination from "@/components/pagination";
export default {
  components: {
    pagination,
  },
  data() {
    return {
      // 搜索
      isShow: true,
      // 表格
      tableData: [],
      loading: true,
      page: {
        total: 0,
        current: 1,
        size: 10,
        nickName: null,
        status: null,
      },
      // 模态框
      dialogVisible: false,
      // 表单
      ruleForm: {
        pic: null,
        nickName: null,
        status: null,
        userId: null,
      },
      rules: {
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.getTabelDataList();
  },

  mounted() {},

  methods: {
    // 搜索
    onSearch() {
      this.getTabelDataList();
    },
    onClear() {
      this.onRefresh();
    },
    // 刷新
    onRefresh() {
      this.page = {
        total: 0,
        current: 1,
        size: 10,
        nickName: null,
        status: null,
      };
      this.getTabelDataList();
    },
    onShow() {
      this.isShow = !this.isShow;
    },
    // 表格
    getTabelDataList() {
      this.$http({
        url: this.$http.adornUrl("/admin/user/page"),
        method: "get",
        params: this.$http.adornParams(this.page),
      }).then((res) => {
        if (res.code === "00000") {
          this.tableData = res.data.records;
          this.page.total = res.data.total;
          this.loading = false;
        }
      });
    },
    onEdit(id) {
      this.dialogVisible = true;
      this.$http({
        url: this.$http.adornUrl(`/admin/user/info/${id}`),
        method: "get",
        params: this.$http.adornParams(),
      }).then((res) => {
        if (res.code === "00000") {
          this.ruleForm = res.data;
        }
      });
    },
    // 表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/admin/user"),
            method: "put",
            data: this.$http.adornData(this.ruleForm),
          }).then((res) => {
            if (res.code === "00000") {
              this.dialogVisible = false;
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.onRefresh();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // 分页
    setCurrentChange(val) {
      this.page.current = val;
      this.getTabelDataList();
    },
    setSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getTabelDataList();
    },
  },
};
</script>

<style lang="scss" scoped>
// 刷新
.refresh {
  text-align: right;
  margin: 10px 0;
}

// 表格
.table {
  .el-table {
    font-size: 12px;

    ::v-deep thead {
      color: #000;
    }

    ::v-deep .el-table__cell {
      text-align: center;
    }
  }
}

// 分页
.pagination {
  margin-top: 10px;
}
</style>
