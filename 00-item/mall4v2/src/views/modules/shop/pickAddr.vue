<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search" v-if="isShow">
      <el-form ref="form" :model="page" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="自提点名称：">
              <el-input
                v-model="page.addrName"
                placeholder="请输入 自提点名称"
                clearable
              ></el-input>
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
        <el-button
          size="small"
          type="danger"
          :disabled="multipleSelection.length === 0"
          @click="onDeletes()"
          >批量删除</el-button
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
    <!-- 当前表格选项数 -->
    <div class="num">
      <el-tag
        >当前表格已选择
        <span style="font-size: 16px; font-weight: 700">{{
          multipleSelection.length
        }}</span>
        项
        <el-button
          @click="toggleSelection()"
          style="
            background-color: transparent;
            border: none;
            padding: 0;
            color: #02a1e9;
            font-size: 12px;
          "
          >清 空</el-button
        ></el-tag
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        border
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-removeAriaHidden
      >
        <el-table-column type="selection" width="50" align="center">
        </el-table-column>
        <el-table-column prop="addrName" label="自提点名称" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="province" label="省份" align="center">
        </el-table-column>
        <el-table-column prop="city" label="城市" align="center">
        </el-table-column>
        <el-table-column prop="area" label="区/县" align="center">
        </el-table-column>
        <el-table-column prop="addr" label="地址" align="center">
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template v-slot="scoped">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="onEdit(scoped.row.addrId)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="onDelete(scoped.row.addrId)"
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
          <el-form-item label="名称" prop="addrName">
            <el-input
              v-model="ruleForm.addrName"
              placeholder="自提点名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-row>
              <el-col :span="8">
                <el-form-item prop="province">
                  <el-select
                    v-model="ruleForm.provinceId"
                    placeholder="请选择"
                    @change="getCityList()"
                  >
                    <el-option
                      v-for="item in provincesList"
                      :key="item.areaId"
                      :label="item.areaName"
                      :value="item.areaId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="city">
                  <el-select
                    v-model="ruleForm.cityId"
                    placeholder="请选择"
                    @change="getAreaList()"
                  >
                    <el-option
                      v-for="item in cityList"
                      :key="item.areaId"
                      :label="item.areaName"
                      :value="item.areaId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="area">
                  <el-select v-model="ruleForm.areaId" placeholder="请选择">
                    <el-option
                      v-for="item in areaList"
                      :key="item.areaId"
                      :label="item.areaName"
                      :value="item.areaId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="ruleForm.addr" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="ruleForm.mobile"
              placeholder="手机号"
              maxlength="11"
            ></el-input>
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
export default {
  components: {
    pagination,
  },
  data() {
    // 手机号自定义校验
    var validatePhone = (rule, value, callback) => {
      const regex = /^1[3-9]\d{9}$/;
      if (value) {
        if (regex.test(value)) {
          callback();
        } else {
          callback(new Error("手机号格式错误"));
        }
      } else {
        callback(new Error("手机号不能为空"));
      }
    };
    return {
      /**
       * 搜索栏
       */
      isShow: true,
      /**
       * 新增与小按钮
       */
      ids: [],
      /**
       * 表格
       */
      tableData: [],
      loading: true,
      multipleSelection: [],
      /**
       * 分页
       */
      page: {
        total: 0,
        current: 1,
        size: 10,
        addrName: null,
      },
      /**
       * 模态框
       */
      dialogVisible: false,
      title: null,
      ruleForm: {
        addrName: null,
        province: null,
        provinceId: null,
        city: null,
        cityId: null,
        area: null,
        areaId: null,
        addr: null,
        mobile: null,
      },
      rules: {
        addrName: [
          { required: true, message: "自提点名称不能为空", trigger: "blur" },
        ],
        province: [
          { required: true, message: "省份不能为空", trigger: "blur" },
        ],
        city: [{ required: true, message: "城市不能为空", trigger: "blur" }],
        area: [{ required: true, message: "区/县不能为空", trigger: "blur" }],
        addr: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { required: true, validator: validatePhone, trigger: "blur" },
        ],
      },
      provincesList: [],
      cityList: [],
      areaList: [],
      value: "",
    };
  },

  created() {
    this.getTableDataList();
  },

  mounted() {},

  methods: {
    /**
     * 搜索栏
     */
    // 搜索按钮
    searchList() {
      this.getTableDataList();
    },
    // 清空按钮
    clearPage() {
      this.page = {
        total: 0,
        current: 1,
        size: 10,
        addrName: null,
      };
      this.getTableDataList();
    },
    /**
     * 新增与小按钮
     */
    // 新增
    onAdd() {
      this.dialogVisible = true;
      this.title = "新增";
      this.ruleForm = {
        addrName: null,
        province: null,
        provinceId: null,
        city: null,
        cityId: null,
        area: null,
        areaId: null,
        addr: null,
        mobile: null,
      };
      this.getProvinceList();
      try {
        this.$refs.ruleForm.resetFields();
      } catch {
        return true;
      }
    },
    // 获取省份列表
    getProvinceList() {
      let pid = 0;
      return this.$http({
        url: this.$http.adornUrl("/admin/area/listByPid"),
        method: "get",
        params: this.$http.adornParams({ pid }),
      }).then((res) => {
        if (res.code === "00000") {
          this.provincesList = res.data;
        }
      });
    },
    // 获取城市列表
    getCityList() {
      let pid = this.ruleForm.provinceId;
      return this.$http({
        url: this.$http.adornUrl("/admin/area/listByPid"),
        method: "get",
        params: this.$http.adornParams({ pid }),
      }).then((res) => {
        if (res.code === "00000") {
          this.cityList = res.data;
        }
      });
    },
    // 获取区域列表
    getAreaList() {
      let pid = this.ruleForm.cityId;
      return this.$http({
        url: this.$http.adornUrl("/admin/area/listByPid"),
        method: "get",
        params: this.$http.adornParams({ pid }),
      }).then((res) => {
        if ((res.code = "00000")) {
          this.areaList = res.data;
        }
      });
    },
    // 批量删除
    onDeletes() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.ids.push(this.multipleSelection[i].addrId);
          }
          this.$http({
            url: this.$http.adornUrl("/shop/pickAddr"),
            method: "delete",
            data: this.ids,
          }).then((res) => {
            if (res.code === "00000") {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.multipleSelection = [];
              this.getTableDataList();
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
    // 控制搜索栏显示隐藏
    searchShow() {
      this.isShow = !this.isShow;
    },
    // 控制表格刷新
    tableRefresh() {
      this.getTableDataList();
    },
    /**
     * 当前表格选项数
     */
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 表格
     */
    // 获取表格列表数据
    getTableDataList() {
      this.$http({
        url: this.$http.adornUrl("/shop/pickAddr/page"),
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 编辑
    onEdit(id) {
      this.dialogVisible = true;
      this.title = "修改";
      this.getProvinceList();
      this.$http({
        url: this.$http.adornUrl(`/shop/pickAddr/info/${id}`),
        method: "get",
        params: this.$http.adornParams(),
      }).then((res) => {
        this.ruleForm = res.data;
        this.getCityList();
        this.getAreaList();
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
          this.multipleSelection.push(id);
          this.$http({
            url: this.$http.adornUrl("/shop/pickAddr"),
            method: "delete",
            data: this.multipleSelection,
          }).then((res) => {
            if (res.code === "00000") {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.multipleSelection = [];
              this.getTableDataList();
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
    // 模态框
    submitForm(formName) {
      for (let i = 0; i < this.provincesList.length; i++) {
        if (this.provincesList[i].areaId === this.ruleForm.provinceId) {
          this.ruleForm.province = this.provincesList[i].areaName;
        }
      }
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].areaId === this.ruleForm.cityId) {
          this.ruleForm.city = this.cityList[i].areaName;
        }
      }
      for (let i = 0; i < this.areaList.length; i++) {
        if (this.areaList[i].areaId === this.ruleForm.areaId) {
          this.ruleForm.area = this.areaList[i].areaName;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/shop/pickAddr"),
            method: this.title === "新增" ? "post" : "put",
            data: this.$http.adornData(this.ruleForm),
          }).then((res) => {
            if (res.code === "00000") {
              if (this.title === "新增") {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              }
              this.dialogVisible = false;
              try {
                this.$refs.ruleForm.resetFields();
              } catch {
                return true;
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
/**
 * 新增与小按钮
 */
.add-and-small-btn {
  display: flex;
  justify-content: space-between;
}

/**
 * 当前表格选项数
 */
.num {
  margin: 10px 0;
}

/**
 * 表格
 */
.el-table {
  font-size: 12px;
  ::v-deep thead {
    color: #000;
  }
}

/**
 * 分页
 */
.pagination {
  margin-top: 10px;
}
</style>
