<template>
  <div>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-row>
          <el-col :span="4">
            <el-input v-model="form.key" size="mini" placeholder="参数名" icon="el-icon-edit el-input__icon"
              clearable></el-input>
          </el-col>

          <el-col :span="6" style="margin-left: 12px;">
            <el-button size="mini" @click="WhGitList">查询</el-button>
            <el-button size="mini" type="success" @click="WhHandleAdd">新增</el-button>
            <el-button size="mini" type="danger" :disabled="delId.length === 0" @click="WhDel">批量删除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
    <el-table :data="tableData" border style="width: 100%" @selection-change="Whchoose">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column fixed prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column prop="code" label="随访编码" width="120">
      </el-table-column>
      <el-table-column prop="name" label="随访标题" width="120">
      </el-table-column>
      <el-table-column prop="sourceId" label="样本来源" width="120">
      </el-table-column>
      <el-table-column prop="beginDate" label="开始时间" width="300">
      </el-table-column>
      <el-table-column prop="endDate" label="结束时间" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="随访频率" width="120">
      </el-table-column>
      <el-table-column prop="department" label="随访部门" width="120">
      </el-table-column>
      <el-table-column prop="doctor" label="随访医生" width="120">
      </el-table-column>
      <el-table-column prop="status" label="随访状态" width="120">
      </el-table-column>
      <el-table-column prop="lastFlupDate" label="最后随访时间" width="120">
      </el-table-column>
      <el-table-column prop="sumNum" label="随访总次数" width="120">
      </el-table-column>
      <el-table-column prop="modifiedOn" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="createOn" label="创建人" width="120">
      </el-table-column>
      <el-table-column prop="modifiedOn" label="修改时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="WhdelClue(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="WhHandleSizeChange" @current-change="WhhandleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="55%">
      <el-form size="mini" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="随访编码" prop="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随访标题" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="样本来源">
              <el-input v-model="tableData.sourceId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间" prop="beginDate">
              <div class="block">
                <el-date-picker v-model="ruleForm.beginDate" placeholder="选择日期时间" style="width: 100%;">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endDate">
              <div class="block">
                <el-date-picker v-model="ruleForm.endDate" placeholder="选择日期时间" style="width: 100%;">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随访频率" prop="rateNum">
              <el-input-number v-model="ruleForm.rateNum" :min="1" value="1" label="描述文字"
                style="width: 100%;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="频率单位" prop="rateUnit">
              <el-select v-model="ruleForm.rateUnit" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="随访部门" prop="department">
              <el-input v-model="ruleForm.department"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随访医生" prop="doctor">
              <el-input v-model="ruleForm.doctor" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="随访状态" prop="status">
              <el-select v-model="ruleForm.state" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in options2" :key="item.value2" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最后随访时间" prop="lastFlupDate">
              <div class="block">
                <el-date-picker v-model="ruleForm.lastFlupDate" placeholder="选择日期时间" style="width: 100%;">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="随访总次数" prop="sunNum">
              <el-input-number v-model="ruleForm.sunNum" label="描述文字" style="width: 100%;"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Whsubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Whlist, Whadd, Whdell, Whxiugai } from '@/api/flupplan'
export default {
  data () {
    return {
      form: {
        key: ''
      },
      total: 0,
      limit: 10,
      page: 1,
      key: '',
      tableData: [],
      t: new Date().getTime(),
      title: '',
      dialogVisible: false,
      ruleForm: {
        beginDate: '',
        code: '',
        createOn: '',
        creareUserId: '',
        deletionStateCode: '',
        t: new Date().getTime(),
        department: '',
        doctor: '',
        endDate: '',
        lastFlupDate: '',
        modifiedBy: '',
        modifiedOn: '',
        modifiedUserId: '',
        name: '',
        rateNum: null,
        rateUnit: '',
        remark: '',
        sourceId: null,
        status: null,
        sunNum: null
      },
      delId: [],
      rules: {
        code: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        name: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
        sourceId: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        beginDate: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'blur'
          }
        ],
        endDate: [
          {
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'blur'
          }
        ],
        rateNum: [
          { required: true, message: '请选择活动资源', trigger: 'blur' }
        ],
        rateUnit: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        doctor: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        lastFlupDate: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        sunNum: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        remark: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      options: [
        {
          value: '1',
          label: '日'
        },
        {
          value: '2',
          label: '周'
        },
        {
          value: '3',
          label: '月'
        },
        {
          value: '4',
          label: '年'
        }
      ],
      options2: [
        {
          value: '1',
          label: '进行'
        },
        {
          value: '2',
          label: '失访'
        },
        {
          value: '3',
          label: '延期'
        },
        {
          value: '4',
          label: '死亡'
        }
      ],
      cities: [
        {
          value: 'Beijing',
          label: '北京'
        },
        {
          value: '5',
          label: '上海'
        },
        {
          value: '4',
          label: '南京'
        },
        {
          value: '3',
          label: '成都'
        },
        {
          value: '2',
          label: '深圳'
        },
        {
          value: '1',
          label: '广州'
        }
      ],
      value: '',
      value1: '',
      value2: ''
    }
  },
  created () {
    this.WhList()
  },
  methods: {
    // 删除
    WhdelClue (id) {
      this.$confirm('此操作将永久删除该自提点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          Whdell([id])
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.WhList()
              }
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(() => {
          this.$message({
            message: '已取消删除',
            type: 'info'
          })
        })
    },

    // 批量删除
    WhDel () {
      console.log(1)

      this.$confirm('此操作将永久删除该自提点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Whdell(this.delId).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.WhList()
          }
        })
      })
    },
    // 删除-多选
    Whchoose (val) {
      console.log(val)

      this.delId = []
      for (const item of val) {
        this.delId.push(item.id)
      }
      this.num = this.delId.length
    },

    // 渲染
    WhList () {
      const params = {
        t: this.t,
        limit: this.limit,
        page: this.page,
        key: this.form.key,
        code: this.ruleForm.code
      }
      Whlist(params)
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
    // 查询
    WhGitList () {
      console.log('查询')
      this.page = 1
      this.WhList()
    },
    // 点击新增
    WhHandleAdd () {
      // console.log("新增");
      this.title = '新增'
      this.dialogVisible = true
    },
    // 点击确定 新增和编辑
    Whsubmit () {
      if (this.title === '新增') {
        Whadd(this.ruleForm)
          .then(res => {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.dialogVisible = false
              this.WhList()
            } else {
              this.$message.error('添加失败')
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        Whxiugai(this.ruleForm)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success('修改成功')
              this.WhList()
              this.dialogVisible = false
            }
          })
      }
    },
    // 点击编辑
    handleClick (row) {
      console.log(row)
      this.title = '编辑'
      this.ruleForm = row
      this.dialogVisible = true
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
    }
  }
}
</script>
