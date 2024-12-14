<template>
  <div>
    <!-- 随访记录 -->
    <el-input size="mini" v-model="search" placeholder="姓名，身份证号，家系名" style="width: 300px; margin-bottom: 10px;"></el-input>
    <el-button type="primary" @click="hycsearchData" size="mini">查询</el-button>
    <el-button type="primary" @click="openAddDialog" size="mini">新增</el-button>
    <el-button type="danger" @click="hycbatchDelete" size="mini">批量删除</el-button>

    <el-table size="mini" :data="tableData" style="width: 100%; margin-top: 20px;" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="planId" label="计划ID" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="计划标题" width="80" align="center"></el-table-column>
      <el-table-column prop="sourceId" label="样本来源" width="80" align="center"></el-table-column>
      <el-table-column prop="planDate" label="计划时间" width="120" align="center"></el-table-column>
      <el-table-column prop="realDate" label="实际时间" width="160" align="center"></el-table-column>
      <el-table-column prop="department" label="随访部门" width="160" align="center"></el-table-column>
      <el-table-column prop="doctor" label="随访医生" width="160" align="center"></el-table-column>
      <el-table-column prop="nation" label="随访方式" width="160" align="center"></el-table-column>
      <el-table-column prop="content" label="随访记录" width="160" align="center"></el-table-column>
      <el-table-column prop="createOn" label="创建时间" width="160" align="center"></el-table-column>
      <el-table-column prop="createBy" label="创建人" width="160" align="center"></el-table-column>
      <el-table-column prop="modifiedOn" label="修改时间" width="160" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" width="160" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="hychandleEdit(scope.row)" type="text" size="mini">修改</el-button>
          <el-button type="text" size="mini" @click="hycDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="10"
      layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <!-- 新增/修改弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="this.form" :rules="formRules" ref="form" label-width="80px">
        <el-form-item label="计划Id" prop="planId">
          <el-select v-model="form.planId" placeholder="请选择活动区域" style="width: 100%" size="mini">
            <el-option v-for="(item, index) in activeList" :key="index" :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="样本来源" prop="sourceId">
          <el-input v-model="form.sourceId" :value="form.sourceId"></el-input>
        </el-form-item>

        <el-form-item label="计划时间" prop="planDate">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="form.planDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="实际时间" prop="realDate">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="form.realDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="随访部门" prop="department">
          <el-input v-model="form.department"></el-input>
        </el-form-item>

        <el-form-item label="随访医生" prop="doctor">
          <el-input v-model="form.doctor"></el-input>
        </el-form-item>

        <el-form-item label="随访方式" prop="nation">
          <el-radio-group v-model="form.nation">
            <el-radio label="电话随访">电话随访</el-radio>
            <el-radio label="上门随访">上门随访</el-radio>
            <el-radio label="问卷随访">问卷随访</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="随访记录" prop="content">
          <el-input v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="hychandleSubmit">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { hyclist, hycaddlist, hychandleDelete, hycxiugai } from '../../../api/fluprecord'

export default {
  data () {
    return {
      formRules: {
        sourceId: [
          { required: true, message: '样本来源不能为空', trigger: 'blur' }
        ],
        planDate: [
          { required: true, message: '样本来源不能为空', trigger: 'blur' }
        ],
        realDate: [
          { required: true, message: '随访部门不能为空', trigger: 'blur' }
        ],
        doctor: [
          { required: true, message: '随访医生不能为空', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '随访方式不能为空', trigger: 'change' }
        ],
        content: [
          { required: true, message: '随访记录不能为空', trigger: 'blur' }
        ]
      },
      activeList: [],
      search: '',
      total: 0,
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      dialogFormVisible: false,
      title: '',
      form: {
        createBy: '',
        content: '',
        createOn: '',
        createUserId: '',
        department: '',
        doctor: '',
        item: null,
        modifiedBy: '',
        modifiedOn: '',
        modifiedUserId: '',
        name: '',
        planDate: '',
        planId: '',
        realDate: '',
        remark: '',
        sourceId: '',
        t: new Date().getTime()
      },
      selectedRows: []
    }
  },
  mounted () {
    this.hycgetList()
    this.hycjiaxi()
  },
  methods: {
    hycjiaxi () {
      this.$http({
        url: this.$http.adornUrl('/biosample/flupplan/AllList'),
        method: 'get',
        params: this.$http.adornParams(this.query)
      }).then((res) => {
        this.activeList = res.data.AllList
        console.log(this.activeList)
      })
    },
    // 修改
    hychandleEdit (row) {
      this.dialogFormVisible = true
      this.form = { ...row }
      this.title = '修改'
    },

    // 新增或保存修改
    hychandleSubmit () {
      console.log(this.form)
      // this.hycgetList()
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.title === '新增') {
            hycaddlist(this.form)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success('新增成功')
                this.dialogFormVisible = false // 关闭弹窗
                this.hycgetList() // 重新获取列表
              } else {
                this.$message.success('新增成功')
                this.dialogFormVisible = false // 关闭弹窗
                this.hycgetList() // 重新获取列表
              }
            }).catch(err => {
              console.error('请求错误', err)
              this.$message.error('请求失败')
            })
          } else {
            hycxiugai(this.form)
              .then(res => {
                if (res.data.code === 0) {
                  this.$message.success('修改成功')
                  this.dialogFormVisible = false // 关闭弹窗
                  this.hycgetList() // 重新获取列表
                } else {
                  this.$message.error('修改失败')
                }
              }).catch(err => {
                console.error('请求错误', err)
                this.$message.error('请求失败')
              })
          }
        } else {
          return false
        }
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
    // 打开新增弹窗
    openAddDialog () {
      this.dialogFormVisible = true
      this.resetForm()
      this.title = '新增'
    },
    // 重置表单
    resetForm () {
      this.form = {
        id: '',
        planId: '',
        createBy: '',
        content: '',
        createOn: '',
        createUserId: '',
        department: '',
        doctor: '',
        item: null,
        modifiedBy: '',
        modifiedOn: '',
        modifiedUserId: '',
        name: '',
        planDate: '',
        realDate: '',
        remark: '',
        sourceId: '',
        t: new Date().getTime()
      }
    },
    // 获取列表数据
    hycgetList () {
      hyclist({
        page: this.currentPage,
        limit: this.pageSize,
        key: this.search
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
    // 查询
    hycsearchData () {
      this.currentPage = 1
      this.hycgetList()
    },
    // 处理表格选择变化
    handleSelectionChange (selection) {
      this.selectedRows = selection
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
        const ids = this.selectedRows.map(row => row.id)
        hychandleDelete(ids).then(res => {
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
    handleSizeChange (val) {
      this.pageSize = val
      this.hycgetList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.hycgetList()
    }
  }
}
</script>

<style scoped></style>