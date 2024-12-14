<template>
  <div>
    <!-- 项目管理 -->
    <el-input v-model="searchParam" size="mini" placeholder="参数名" style="width: 200px; margin-right: 10px;"></el-input>
    <el-button type="" @click="chaxun" size="mini">查询</el-button>
    <el-button type="primary" @click="hychandleAdd" size="mini">新增</el-button>
    <el-button type="danger" @click="hycbatchDelete" size="mini">批量删除</el-button>

    <el-table :data="tableData" style="width: 100%; margin-top: 20px" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="code" label="项目编码" width="220"></el-table-column>
      <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="createOn" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="createBy" label="创建人" width="120"></el-table-column>
      <el-table-column prop="modifiedOn" label="修改时间" width="180"></el-table-column>
      <el-table-column prop="modifiedBy" label="修改人" width="120"></el-table-column>
      <el-table-column prop="remark" label="备注" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="hychandleEdit(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="hycDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="项目编码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="hychandleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { hyclist, hycaddlist, hychandleDelete, hycxiugai } from '../../../api/project'

export default {
  data () {
    return {
      dialogFormVisible: false,
      searchParam: '',
      tableData: [],
      total: 0,
      page: 1,
      limit: 10,
      formLabelWidth: '120px',
      title: '',
      form: {
        name: '',
        remark: '',
        code: ''
      },
      selectedRows: []
    }
  },
  mounted () {
    this.hycgetList()
  },
  methods: {
    handleSizeChange (val) {
      this.limit = val
      this.hycgetList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.hycgetList()
    },
    // 获取列表数据
    hycgetList () {
      hyclist({
        page: this.page,
        limit: this.limit,
        key: this.searchParam
      }).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.page.list
          this.total = res.data.page.totalCount
        } else {
          console.error('获取数据失败', res.message)
        }
      }).catch(err => {
        console.error('请求错误', err)
      })
    },
    chaxun () {
      this.page = 1 // 重置为第一页
      this.hycgetList() // 重新获取列表
    },
    // 新增
    hychandleAdd () {
      this.title = '新增'
      this.dialogFormVisible = true // 显示弹窗
      this.resetForm() // 重置表单
    },
    // 修改
    hychandleEdit (row) {
      this.dialogFormVisible = true
      this.form = { ...row } // 将选中行的数据赋值给form
      this.title = '修改' // 设置标题为修改
    },
    // 批量删除
    hycbatchDelete () {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请至少选择一项进行删除')
        return
      }
      this.$confirm('此操作将会删除选中的项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = this.selectedRows.map(row => row.id) // 获取选中行的ID
        hychandleDelete(ids).then(res => {
          if (res.data.code === 0) {
            this.$message.success('删除成功')
            this.hycgetList() // 刷新列表
          } else {
            this.$message.error('删除失败')
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 删除
    hycDelete (id) {
      this.$confirm('此操作将会删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hychandleDelete([id]).then(res => {
          if (res.data.code === 0) {
            this.$message.success('删除成功')
            this.hycgetList()
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 提交表单
    hychandleSubmit () {
      const apiCall = this.title === '新增' ? hycaddlist : hycxiugai
      apiCall(this.form).then(res => {
        if (res.data.code === 0) {
          this.$message.success(`${this.title}成功`)
          this.dialogFormVisible = false // 关闭弹窗
          this.hycgetList() // 重新获取列表
        } else {
          this.$message.error(`${this.title}失败`)
        }
      }).catch(err => {
        console.error('请求错误', err)
        this.$message.error('请求失败')
      })
    },
    // 处理表格选择变化
    handleSelectionChange (selection) {
      this.selectedRows = selection // 更新选中的行
    },
    // 重置表单
    resetForm () {
      this.form = {
        name: '',
        remark: '',
        code: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
