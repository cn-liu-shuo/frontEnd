<template>
  <div>
    <!-- 表单 -->
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称">
        <el-row>
          <el-col :span="4">
            <el-input v-model="ruleForm.sourceIdCard" size="mini" placeholder="参数名" icon="el-icon-edit el-input__icon"
              clearable></el-input>
          </el-col>

          <el-col :span="6" style="margin-left: 12px;">
            <el-button size="mini" @click="WhGitList">查询</el-button>
            <el-button size="mini" type="success" @click="WhHandleAdd">新增</el-button>
            <el-button size="mini" type="danger" @click="dc">导出EXCEL</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column fixed prop="name" label="加系名称" width="155">
      </el-table-column>
      <el-table-column prop="sourceId" label="姓名" width="300">
      </el-table-column>
      <el-table-column prop="sourceIdCard" label="身份证号" width="120">
      </el-table-column>
      <el-table-column prop="midifiedBy" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="modifiedBy" label="修改时间" width="120">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="WhdelClue(scope.row)">添加新成员</el-button>
          <el-button type="text" size="small" @click="WhdelClues(scope.row)">查看成员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="WhHandleSizeChange" @current-change="WhhandleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 对话框  -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
      <el-form :model="ruleForms" :rules="rules" ref="ruleForms" label-width="100px" class="demo-ruleForms">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForms.name" size="mini" placeholder="家系名称" icon="el-icon-edit el-input__icon"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="来源姓名" prop="sourceId">
          <el-input v-model="ruleForms.sourceId" size="mini" placeholder="家系名称" icon="el-icon-edit el-input__icon"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="sourceIdCard">
          <el-input v-model="ruleForms.sourceIdCard" size="mini" placeholder="家系名称" icon="el-icon-edit el-input__icon"
            clearable></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ruleForms.remark" size="mini" placeholder="家系名称" icon="el-icon-edit el-input__icon"
            clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="WhSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 点击添加新成员对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisibles" width="50%">
      <el-form :model="ruleFormss" :rules="ruless" ref="ruleFormss" label-width="100px" class="demo-ruleForms">
        <el-row>
          <el-col style="margin-bottom: 20px;">
            <span>家系 {{ ruleFormsss.name }} &nbsp; ({{ ruleFormsss.sourceIdCard }})</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="ruleFormss.idCard" size="mini" placeholder="身份证号" icon="el-icon-edit el-input__icon"
                @blur="handleBlur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleFormss.name" size="mini" placeholder="姓名"
                icon="el-icon-edit el-input__icon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-radio v-model="ruleFormss.sex" label="1">男</el-radio>
              <el-radio v-model="ruleFormss.sex" label="2">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄">
              <el-input-number v-model="ruleFormss.age" :min="1" value="1" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="ruleFormss.telephone" size="mini" icon="el-icon-edit el-input__icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日">
              <div class="block">
                <el-date-picker v-model="ruleFormss.birthday" type="datetime" placeholder="选择日期时间"
                  style="width: 100%;">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="ruleFormss.email" size="mini" icon="el-icon-edit el-input__icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族">
              <el-input v-model="ruleFormss.nation" size="mini" icon="el-icon-edit el-input__icon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="居住地">
          <el-input v-model="ruleFormss.comeFrom" size="mini" icon="el-icon-edit el-input__icon"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="ruleFormss.homeAddress" size="mini" icon="el-icon-edit el-input__icon"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ruleFormss.remark" size="mini" placeholder="备注"
            icon="el-icon-edit el-input__icon"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibles = false">取 消</el-button>
        <el-button type="primary" @click="WhSubmits">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看成员对话框 -->
    <el-dialog :title="titles" :visible.sync="dialogVisibless" width="60%">
      <span class="spans">家系 &nbsp; {{ name}} ({{sfz}})</span>
      <el-table :data="tableDatas" border size="mini" style="width: 100%">
        <el-table-column prop="sourceIdCard" label="身份证号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
        <el-table-column prop="birthday" label="生日">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="nation" label="民族">
        </el-table-column>
        <el-table-column prop="homeAddress" label="居住地">
        </el-table-column>
        <el-table-column prop="homeAddress" label="家庭住址">
        </el-table-column>
        <el-table-column prop="familyName" label="家系名称">
        </el-table-column>
        <el-table-column prop="createOn" label="创建时间">
        </el-table-column>
        <el-table-column prop="createBy" label="创建人">
        </el-table-column>
        <el-table-column prop="modifiedOn" label="修改时间">
        </el-table-column>
        <el-table-column prop="modifiedBy" label="修改人">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
      </el-table>
      <span style="margin-left: 800px;">共 {{totals}} 条</span>
      <el-pagination
      :total="1"
      layout="prev, pager, next"
      style="display: inline-block;">
</el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import fileDownload from 'js-file-download'

import familyman from '@/api/familyman'
export default {
  data () {
    return {
      tableData: [],
      ruleForm: {
        name: '',
        sourceId: '',
        sourceIdCard: ''
      },
      totals: null,
      title: '',
      dialogVisible: false,
      sfz: null,
      name: '',
      ruleForms: {
        name: '',
        sourceId: '',
        sourceIdCard: '',
        remark: '',
        id: ''
      },
      dialogVisibless: false,
      titles: '',
      ruleFormss: {
        num: null,
        sex: '1',
        isCard: '',
        remark: '',
        telephone: '',
        birthday: '',
        age: null,
        nation: '',
        comeFrom: '',
        homeAddress: '',
        idCard: '',
        name: '',
        email: '',
        id: ''
      },
      currentPage1: '',
      ruleFormsss: {
        name: '',
        sourceIdCard: ''
      },
      tableDatas: [],
      page: 1,
      limit: 10,
      total: null,
      t: new Date().getTime(),
      key: '',
      familyId: '',
      dialogVisibles: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        sourceId: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        sourceIdCard: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      ruless: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '不能为空', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    sex (newVal, oldVal) {
      (this.ruleForm.sex) / 2 !== 0 ? this.ruleForm.sex = '男' : this.ruleForm.sex = '女'
    }
  },
  created () {
    this.WhList()
  },
  methods: {
    handleBlur (event) {
      if ((event.target.value).length === 18) {
        // console.log(event.target.value, '222')
        familyman.jianT(this.ruleFormss.idCard)
          .then(res => {
            if (res.data.code === 0) {
              console.log(res, '999')
              this.ruleFormss.name = res.data.donorsInfo.name
              this.ruleFormss.sex = res.data.donorsInfo.sex
              this.ruleFormss.age = res.data.donorsInfo.age
              this.ruleFormss.birthday = res.data.donorsInfo.birthday
              this.ruleFormss.remark = res.data.donorsInfo.remark
              this.ruleFormss.telephone = res.data.donorsInfo.telephone
              this.ruleFormss.nation = res.data.donorsInfo.nation
              this.ruleFormss.comeFrom = res.data.donorsInfo.comeFrom
              this.ruleFormss.homeAddress = res.data.donorsInfo.homeAddress
              this.ruleFormss.idCard = res.data.donorsInfo.idCard
              this.ruleFormss.email = res.data.donorsInfo.email
              this.ruleFormss.id = res.data.donorsInfo.id
            }
          })
        console.log('sss')
      }
    },
    // 添加新成员确定按钮
    WhSubmits () {
      familyman.newAdd(this.ruleFormss).then(res => {
        if (res.data.code === 0) {
          this.$message.success('添加成功')
          this.dialogVisibles = false
          this.WhList()
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    // 确定按钮
    WhSubmit () {
      console.log('确定按钮')
      if (this.title === '新增') {
        familyman.getADD(this.ruleForms).then(res => {
          if (res.data.code === 0) {
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.WhList()
          } else {
            this.$message.error('添加失败')
          }
        })
      } else if (this.title === '编辑') {
        familyman.xiugai(this.ruleForms).then(res => {
          if (res.data.code === 0) {
            this.$message.success('修改成功')
            this.WhList()
            this.dialogVisible = false
          }
        })
      } else {
        console.log('查看详情')
      }
    },
    // 渲染
    WhList () {
      const params = {
        t: this.t,
        limit: this.limit,
        page: this.page,
        key: this.ruleForm.sourceIdCard
        // sourceIdCard: this.ruleForm.sourceIdCard
      }
      familyman.getList(params)
        .then(res => {
          if (res.data.code === 0) {
            console.log(111)
            console.log(res, '222')
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
    // 点击新增
    WhHandleAdd () {
      console.log('点击新增')
      this.dialogVisible = true
      this.title = '新增'
    },
    WhGitList () {
      console.log('查询')
      this.page = 1
      this.WhList()
    },
    handleClick (row) {
      console.log('点击编辑', row)
      this.ruleForms = row
      this.dialogVisible = true
      this.title = '编辑'
      familyman.getId(this.ruleForms.id)
        .then(res => {
          if (res.data.code === 0) {
            this.ruleForms = res.data.familyMan
          } else {
            this.$message.error('获取数据失败')
          }
        })
    },
    // 查看成员
    WhdelClues (row) {
      console.log(row)
      const params = {
        t: this.t,
        limit: this.limit,
        page: this.page,
        familyId: row.id
      }
      familyman.kId(row.id).then(res => {
        if (res.data.code === 0) {
          this.sfz = res.data.familyMan.sourceIdCard
          this.name = res.data.familyMan.name
        }
        this.dialogVisibless = true
        familyman.lookI(params).then(res => {
          console.log(res)
          this.tableDatas = res.data.page.list
          this.totals = res.data.page.totalCount
        })
      })
    },
    // 添加新成员
    WhdelClue (row) {
      console.log('添加新成员', row)
      this.dialogVisibles = true
      this.ruleFormsss.sourceIdCard = row.sourceIdCard
      this.ruleFormsss.name = row.name
    },
    // 分页
    WhHandleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.WhList()
    },
    WhhandleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.WhList()
    },
    dc () {
      this.exportExcel()
    },
    // 导出
    exportExcel () {
      this.$http({
        url: this.$http.adornUrl('/biosample/donorsinfo/export-excel-donorsinfo'),
        method: 'get',
        responseType: 'blob',
        withCredentials: false,
        params: this.query
      }).then(response => {
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        fileDownload(blob, '样本来源' + Date.parse(new Date()) + '.xlsx')
      })
    }
  }
}
</script>
<style>
.el-dialog__body {
  padding-bottom: 15px;
}
.spans{
  margin-bottom: 15px;
}
</style>