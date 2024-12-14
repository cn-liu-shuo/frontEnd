<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-row>
          <el-col :span="4">
            <el-input
              v-model="form.name"
              size="mini"
              placeholder="参数名"
              icon="el-icon-edit el-input__icon"
            ></el-input>
          </el-col>

          <el-col :span="6" style="margin-left: 12px;">
            <el-button size="mini" @click="WhGitList">查询</el-button>
            <el-button size="mini" type="success" @click="WhHandleAdd"
              >新增</el-button
            >
            <el-button size="mini" type="danger" disabled>批量删除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="任务编码" width="120">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>
      <el-table-column prop="name" label="任务姓名" width="120">
      </el-table-column>
      <el-table-column prop="createOn" label="创建时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createBy" label="创建人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="modifiedOn" label="修改时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="modifiedBy" label="修改人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="WhHandleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="WhDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="WhHandleSizeChange"
      @current-change="WhhandleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框 -->

    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="任务编码">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="WhSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getList, getAd, delApp, bianji } from '@/api/task'
export default {
  data () {
    return {
      form: {
        name: ''
        // region:''
      },
      tableData: [],
      t: new Date().getTime(),
      page: 1,
      limit: 10,
      total: 0,
      key: '',
      title: '',
      ruleForm: {
        code: '',
        createBy: '',
        createOn: '',
        createUserId: null,
        modifiedBy: '',
        modifiedOn: '',
        modifiedUserId: null,
        name: '',
        remark: '',
        t: new Date().getTime()
      },
      dialogVisible: false
    }
  },
  created () {
    this.WhGtt()
  },
  methods: {
    // 删除
    WhDel (id) {
      this.$confirm('此操作将永久删除该热搜项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delApp([id])
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.WhGtt()
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 新增
    WhHandleAdd () {
      this.dialogVisible = true
      this.title = '新增'
    },
    WhSubmit () {
      if (this.title === '新增') {
        getAd(this.ruleForm)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success('删除成功')
              this.dialogVisible = false
              this.WhGtt()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        bianji(this.ruleForm)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success('修改成功')
              this.WhGtt()
              this.dialogVisible = false
            }
          })
          .catch(err => {
            this.$message.error('编辑失败')
            console.log(err)
          })
      }
    },
    WhHandleClick (row) {
      console.log(row)
      this.ruleForm = row
      this.dialogVisible = true
      this.title = '编辑'
    },
    WhHandleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.WhGtt()
    },
    WhhandleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.WhGtt()
    },
    WhGtt () {
      const params = {
        t: this.t,
        page: this.page,
        limit: this.limit,
        key: this.form.name
      }
      getList(params)
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.page.list
            this.total = res.data.page.totalCount
          } else {
            this.$message.error('获取数据失败', res.message)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    WhGitList () {
      this.page = 1
      this.WhGtt()
    }
  }
}
</script>
<style lang="scss" scoped></style>
