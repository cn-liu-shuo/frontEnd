<template>
  <div class="clue">
    <div class="searchDiv">
      <el-form ref="form" :model="query" label-width="70px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="客户姓名">
              <el-input size="small" v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户手机">
              <el-input size="small" v-model="query.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属人">
              <el-input size="small" v-model="query.owner"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道来源">
              <el-select
                v-model="query.channelId"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.channelName"
                  :value="item.channelId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="线索状态">
              <el-select
                v-model="query.status"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="跟进时间">
              <el-date-picker
                size="small"
                v-model="query.dateRange"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
                format="yyyy-MM-dd hh:mm:ss"
                value-format="yyyy-MM-dd hh:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button size="small" type="primary" @click="handleSearch"
                >查询</el-button
              >
              <el-button size="small" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="tableDiv">
      <div class="btn" style="text-align: left">
        <el-button
          type="primary"
          size="small"
          plain
          icon="el-icon-search"
          @click="addShow"
          >新增</el-button
        >
        <el-button
          type="danger"
          size="small"
          plain
          icon="el-icon-search"
          :disabled="delId.length == 0"
          @click="delClue"
          >删除</el-button
        >
        <el-button
          type="success"
          size="small"
          :disabled="!(delId.length == 1)"
          @click="edit"
          plain
          icon="el-icon-search"
          >修改</el-button
        >
        <el-button type="warning" size="small" plain icon="el-icon-search" @click="exportClues"
          >导出</el-button
        >
      </div>
      <div class="tables">
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="50" label="线索编号">
          </el-table-column>
          <el-table-column prop="name" label="客户姓名" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号码" width="180">
          </el-table-column>
          <el-table-column prop="channelName" label="渠道来源">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="owner" label="线索归属"> </el-table-column>
          <el-table-column prop="status" label="线索状态">
            <template v-slot="scope">
              <!-- scope.row 获取当前行信息 -->
              <el-tag v-if="scope.row.status == 1">已分配</el-tag>
              <el-tag type="success" v-if="scope.row.status == 2"
                >已跟进</el-tag
              >
              <el-tag type="danger" v-if="scope.row.status == 3">回收</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="nextTime" label="下次根据时间">
          </el-table-column>
          <el-table-column label="操作"> </el-table-column>
        </el-table>
      </div>
      <pagination
        :total="total"
        :page="query.pageNum"
        @size="setSize"
        @current="setCurrent"
      ></pagination>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phone">
                <el-input
                  size="small"
                  maxlength="11"
                  show-word-limit
                  v-model="ruleForm.phone"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户姓名" prop="name">
                <el-input size="small" v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="渠道来源" prop="channelId">
                <el-select
                  v-model="ruleForm.channelId"
                  placeholder="请选择活动区域"
                  style="width: 100%"
                  size="small"
                  @change="channelIdChange"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.channelName"
                    :value="item.channelId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动信息" prop="activityId">
                <el-select
                  v-model="ruleForm.activityId"
                  placeholder="请选择活动区域"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    v-for="(item, index) in activeList"
                    :key="index"
                    :label="item.name"
                    :value="item.activityId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户性别" prop="gender">
                <el-radio-group v-model="ruleForm.gender">
                  <el-radio
                    :label="item.value"
                    v-for="(item, index) in sex"
                    :key="index"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户年龄" prop="age">
                <el-input-number
                  v-model="ruleForm.age"
                  :min="10"
                  :max="80"
                  label="描述文字"
                  size="small"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="微信号" prop="weixin">
                <el-input size="small" v-model="ruleForm.weixin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ号码" prop="qq">
                <el-input size="small" v-model="ruleForm.qq"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  channels,
  clueStatus,
  activity,
  clueAdd,
  deleteClue,
  summaryClue,
  updateClue,
  exportClue
} from "@/api/clue";
import pagination from "./pagination.vue";
export default {
  components: {
    pagination,
  },
  data() {
    // 自定义校验
    var validatePhone = (rule, value, callback) => {
      const regex = /^1[3-9]\d{9}$/;
      if (value) {
        if (regex.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的11位手机号"));
        }
      } else {
        callback(new Error("手机号不能为空"));
      }
    };
    return {
      options: [],
      statusList: [],
      tableData: [],
      activeList: [],
      delId: [],
      total: 0,
      dialogVisible: false,
      title: "",
      query: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        phone: null,
        owner: null,
        channelId: null,
        status: null,
        dateRange: [],
        params: {},
      },
      ruleForm: {
        name: "",
        gender: 0,
        phone: null,
        age: null,
        activityId: null,
        qq: "",
        weixin: "",
        channelId: null,
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
      },
      sex: [
        {
          label: "男",
          value: 0,
        },
        {
          label: "女",
          value: 1,
        },
        {
          label: "未知",
          value: 2,
        },
      ],
    };
  },
  created() {
    this.getList();
    this.getChannels();
    this.getStatus();
  },
  methods: {
    // 详情
    edit() {
      // 模态框
      this.dialogVisible = true;
      this.title = "编辑";
      summaryClue(this.delId).then(async (res) => {
        if (res.code == 200) {
          if (res.data.channelId) {
            this.ruleForm.channelId = res.data.channelId;
            // 再次调用活动列表
            await this.channelIdChange(res.data.channelId);
            this.ruleForm.activityId = res.data.activityId;
          }
          this.ruleForm.phone = res.data.phone;
          this.ruleForm.name = res.data.name;
          this.ruleForm.age = res.data.age;
          this.ruleForm.gender = res.data.gender;
          this.ruleForm.qq = res.data.qq;
          this.ruleForm.weixin = res.data.weixin;
        }
      });
    },
    // 活动来源
    channelIdChange(val) {
      console.log(val);
      this.ruleForm.activityId = null;
      activity(val).then((res) => {
        console.log(res, "huodong");
        if (res.code == 200) {
          this.activeList = res.data;
        }
      });
    },
    // 新增
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   新增
          if (this.title == "新增") {
            clueAdd(this.ruleForm)
              .then((res) => {
                if (res.code == 200) {
                  // 关闭模态框
                  this.dialogVisible = false;
                  // 提示信息
                  this.$message({
                    message: "新增成功",
                    type: "success",
                  });
                  // 列表刷新
                  this.getList();
                  // 重置表单信息及校验
                  this.$refs[formName].resetFields();
                }
              })
              .catch((err) => {
                // console.log(err)
                this.$message.error(err.msg);
              });
          }else{
            // 确认编辑
            let editData = {
              clueId: this.delId[0],
              ...this.ruleForm
            }
            updateClue(editData).then(res => {
              if (res.code == 200) {
                this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                this.dialogVisible = false
                this.getList()
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除
    delClue() {
      this.$confirm(
        `此操作将永久删除编号为${this.delId}的数据, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 点击确定
          deleteClue(this.delId).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
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
    // 多选
    handleSelectionChange(val) {
      this.delId = [];
      for (const item of val) {
        this.delId.push(item.clueId);
      }
    },
    // 新增模态框显示
    addShow() {
      this.dialogVisible = true;
      this.title = "新增";
      this.$nextTick(() => {
        // 如果还获取不到
        // if (this.$refs.ruleForm) {
        //     this.$refs['ruleForm'].resetFields();
        // }
        this.$refs["ruleForm"].resetFields();
      });
    },
    // 列表
    getList() {
      if (this.query.dateRange) {
        this.query.params.beginTime = this.query.dateRange[0];
        this.query.params.endTime = this.query.dateRange[1];
      }
      console.log(this.query);
      list(this.query)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.rows;
            this.total = res.total;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 渠道来源
    async getChannels() {
      // channels().then(res => {
      //     console.log(res, "qudao");
      // })
      try {
        const res = await channels();
        console.log(res, "qudao");
        this.options = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 线索状态
    async getStatus() {
      const res = await clueStatus();
      this.statusList = res.data;
    },
    // 查询
    handleSearch() {
      // 重置页码 从第一页开始查询
      this.query.pageNum = 1;
      this.getList();
    },
    // 重置
    reset() {
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.query.name = null;
      this.query.phone = null;
      this.query.owner = null;
      this.query.channelId = null;
      this.query.status = null;
      this.query.dateRange = [];
      this.query.params = {};
      this.getList();
    },
    // 子传父 分页
    setSize(val) {
      this.query.pageNum = 1;
      this.query.pageSize = val;
      this.getList();
    },
    // 子传父 分页
    setCurrent(val) {
      this.query.pageNum = val;
      this.getList();
    },
    // 关闭模态框
    handleClose(done) {
      done();
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 导出
    exportClues(){
      exportClue(this.query).then(res => {
        console.log(res, 111)
        // 创建一个blob对象,用于存储execl文件的数据
        var blob = new Blob([res])
        // 创建一个a标签
        const link = document.createElement('a')
        // URL.createObjectURL创建一个下载链接，并将其设置为a的href
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        // 设置文件名
        let nowTime = new Date()
        link.setAttribute('download', `线索导出${nowTime.getTime()}.xlsx`)
        // 将a标签添加到页面的boby上
        document.body.appendChild(link)
        // 触发点击事件
        link.click()
        // 移除a标签
        document.body.removeChild(link)
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.tables {
  padding: 20px 0;
}

::v-deep .el-table thead {
  background-color: #909399 !important;
}

::v-deep .el-table thead tr {
  background-color: #909399 !important;
}

::v-deep .el-table thead th {
  background-color: #f0f0f0 !important;
}
</style>