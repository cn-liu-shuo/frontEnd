<style scoped lang="scss">
// 表
.ls-table {
  margin-top: 14px;
}

// 框
.el-date-editor.el-input {
  width: 134px;
}
</style>

<template>
  <div>
    <!-- 查 -->
    <div class="search">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input size="small" v-model="queryInfo.key" placeholder="样本编码/类型/姓名/身份证号" clearable></el-input>
        </el-col>
        <el-col :span="10">
          <el-button size="small" @click="lsOnSearch()">查询</el-button>
          <el-popover trigger="hover" placement="bottom" width="140" v-model="visible">
            <div style="text-align: center;margin: 0;">
              <el-button size="mini" @click="lsOnSearchDetail()">高级查询</el-button>
              <el-button size="mini" style="margin-left: 0;" @click="lsOnReset()">重置查询</el-button>
            </div>
            <el-button size="small" slot="reference" style="margin-left: -10px;border-left: none;">
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
          <el-button type="primary" size="small" @click="addOrEdit()">采集录入</el-button>
          <el-button type="primary" size="small" icon="el-icon-folder-add">审核入库</el-button>
          <el-button type="primary" size="small" icon="el-icon-folder-remove">出库</el-button>
          <el-button type="primary" size="small">导出EXCEL</el-button>
        </el-col>
      </el-row>
    </div>
    <!--  表  -->
    <div class="ls-table">
      <el-table v-loading="loading" size="mini" ref="multipleTable" :data="tableData" border tooltip-effect="dark"
        style="width: 100%" @selection-change="lsHandleSelectionChange">
        <el-table-column fixed type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="sampleCode" label="样本编码" width="120" align="center"></el-table-column>
        <el-table-column prop="sourceName" label="姓名" width="80" align="center"></el-table-column>
        <el-table-column prop="collectAddressName" label="采集地点" width="140" align="center"></el-table-column>
        <el-table-column prop="receiveDate" label="采集时间" width="140" align="center"></el-table-column>
        <el-table-column label="性别" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 1">男</span>
            <span v-if="scope.row.sex === 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="160" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80" align="center"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="120" align="center"></el-table-column>
        <el-table-column label="是否怀孕" width="75" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.pregnant === 0">否</span>
            <span v-if="scope.row.pregnant === 1" style="color: indianred;">是</span>
          </template>
        </el-table-column>
        <el-table-column prop="gestWeek" label="孕周" width="80" align="center"></el-table-column>
        <el-table-column prop="homeAddress" label="家庭住址" width="200" align="center"></el-table-column>
        <el-table-column prop="createBy" label="录入人员" width="140" align="center"></el-table-column>
        <el-table-column prop="createOn" label="录入时间" width="140" align="center"></el-table-column>
        <el-table-column prop="applyUser" label="审核人" width="140" align="center"></el-table-column>
        <el-table-column prop="sampleTypeName" label="样本类型" width="80" align="center"></el-table-column>
        <el-table-column prop="state" label="库存状态" width="75" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1" style="color: rgb(11, 178, 212)">入库</span>
            <span v-if="scope.row.state === 2">出库</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="90" align="center"></el-table-column>
        <el-table-column fixed="right" label="状态" width="60" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="点击审核入库" placement="top-start">
              <el-button v-if="scope.row.status === 0" type="text" style="color: #000;">未审</el-button>
            </el-tooltip>
            <el-button size="mini" disabled v-if="scope.row.status === 2" type="text"
              style="color: #008000;">已审</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini">修改</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  页  -->
    <div class="pagination">
      <pagination :total="total" :current-page="queryInfo.page" :page-size="queryInfo.limit"
        @handleSizeChange="lsHandleSizeChange" @handleCurrentChange="lsHandleCurrentChange"></pagination>
    </div>
    <!--  框  -->
    <div class="dialog">
      <el-dialog title="高级查询" :visible.sync="dialogVisible" width="50%">
        <el-form ref="form" :model="queryInfo" label-width="80px" size="mini">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="样本编码">
                <el-input v-model="queryInfo.sampleCode" placeholder="样本编码" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型名称">
                <el-input v-model="queryInfo.sampleTypeName" placeholder="类型名称" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="采集时间">
                <el-date-picker size="mini" v-model="queryInfo.receiveDateStart" type="date" placeholder="开始时间"
                  clearable></el-date-picker>-<el-date-picker v-model="queryInfo.receiveDateEnd" type="date"
                  placeholder="结束时间" clearable></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录入时间">
                <el-date-picker v-model="queryInfo.createOnStart" type="date" placeholder="开始时间"
                  clearable></el-date-picker>-<el-date-picker v-model="queryInfo.createOnEnd" type="date"
                  placeholder="结束时间" clearable></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年龄范围">
                <el-input style="width: 134px;" v-model="queryInfo.ageStart" placeholder="开始年龄"
                  clearable></el-input>-<el-input style="width: 134px;" v-model="queryInfo.ageEnd" placeholder="结束年龄"
                  clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="queryInfo.sourceName" placeholder="姓名" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性别">
                <el-select style="width: 100%;" v-model="queryInfo.sex" placeholder="性别" clearable>
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采集地点">
                <el-input v-model="queryInfo.collectAddressName" placeholder="请输入采集地点" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="身份证号">
                <el-input v-model="queryInfo.sourceIdCard" placeholder="身份证号" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="queryInfo.sourcePhone" placeholder="联系电话" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="库存状态">
                <el-select style="width: 100%;" v-model="queryInfo.state" placeholder="库存状态" clearable>
                  <el-option label="入库" value="1"></el-option>
                  <el-option label="出库" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="text-align: right;">
            <el-form-item style="margin-bottom: 0;">
              <el-button @click="lsOnReset()">重置</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="lsOnSubmit()">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
    <!-- 框 -->
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="addOrEditVisible" width="50%">
        <el-form :model="queryInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="样本编码" prop="name">
                <el-input v-model="queryInfo.name" placeholder="样本编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="样本类型" prop="name">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in allTypeList" :key="item.id" :label="item.code" :value="item.code">
                    <span style="float: left">{{ item.code }}</span>
                    <img style="float: right;" width="20" height="20" :src="item.photo" />
                  </el-option>
                </el-select>
                <img width="24"
                  src="https://th.bing.com/th/id/R.debd6f82e672585509f3403635fda4dc?rik=hNqKQeFKCj%2f0vg&pid=ImgRaw&r=0"
                  alt="" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="身份证号" prop="name">
                <el-input v-model="queryInfo.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="queryInfo.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="性别" prop="name">
                <el-radio-group v-model="queryInfo.resource">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="name">
                <el-input-number v-model="queryInfo" @change="handleChange" :min="1" label="描述文字"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input v-model="queryInfo.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭住址">
                <el-input v-model="queryInfo.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="采集时间" prop="name">
                <el-date-picker style="width: 258px;" v-model="ruleForm.samples.receiveDate" type="date"
                  placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采集地点" prop="name">
                <el-select style="width: 100%;" v-model="queryInfo.region" placeholder="采集地点">
                  <el-option v-for="item in dictList" :key="item.id" :label="item.itemName"
                    :value="item.itemValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否怀孕" prop="name">
                <el-radio-group v-model="queryInfo.resource">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="queryInfo"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item style="text-align: right;">
              <el-button @click="resetForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import samples from '../../../api/samples'
import pagination from '../../../components/pagination'
import samplesType from '../../../api/samplesType'
export default {
  components: {
    pagination
  },
  data () {
    return {
      // 查
      visible: false,
      // 表
      tableData: [],
      multipleSelection: [],
      loading: null,
      // 页
      total: null,
      // 请求参数
      queryInfo: {
        key: null,
        sampleCode: null,
        sampleTypeName: null,
        collectAddressName: null,
        receiveDateStart: null,
        receiveDateEnd: null,
        createOnStart: null,
        createOnEnd: null,
        ageStart: null,
        ageEnd: null,
        state: null,
        sex: null,
        sourceName: null,
        sourceIdCard: null,
        telephone: null,
        page: 1,
        limit: 10
      },
      // 框
      dialogVisible: false,
      addOrEditVisible: false,
      title: null,
      ruleForm: {
        donorsInfo: {
          admissionNumber: '',
          age: null,
          back11: '',
          back12: '',
          back13: '',
          back14: '',
          back15: '',
          back16: '',
          back17: '',
          back18: '',
          back19: '',
          back20: '',
          back21: '',
          back22: '',
          back23: '',
          back24: '',
          back25: '',
          back26: '',
          back27: '',
          back28: '',
          back29: '',
          back30: '',
          back31: '',
          back32: '',
          back33: '',
          back34: '',
          back35: '',
          back36: '',
          back37: '',
          back38: '',
          back39: '',
          birthday: '2000-12-12 00:00:00 00:00:00',
          checkNum: '',
          checkPoint: '',
          clinicNum: '',
          clinicalDiagnosis: '',
          comeFrom: '',
          companyName: '',
          createBy: '',
          createOn: '2024-11-22 16:55:21',
          createUserId: '',
          department: '',
          diagnosticTime: '',
          duty: '',
          email: '',
          familyId: '',
          familyState: '',
          homeAddress: 'homes',
          idCard: '150428200012120001',
          illnessName: '',
          innerNo: '',
          isInFormed: '',
          maritalStatus: '',
          mobile: '',
          modifiedBy: '',
          modifiedOn: '2024-11-22 16:55:21',
          modifiedUserId: '',
          name: 'devname',
          nation: '',
          pathologicalNum: '',
          remark: '',
          sampleCode: 'devcode',
          sex: 2,
          telephone: 'tphone',
          xisNum: '',
          xpublicState: ''
        },
        samples: {
          applyUser: '',
          applyUserId: '',
          collectAddress: '2',
          collectAddressName: '潍城婚检',
          createBy: '',
          createOn: '2024-11-22 16:55:21',
          createUserId: '',
          gestWeek: '',
          modifiedBy: '',
          modifiedOn: '2024-11-22 16:55:21',
          modifiedUserId: '',
          name: 'lp | devcode',
          pregnant: 0,
          receiveDate: '2024-11-22 16:55:21',
          remark: 'teatarea',
          sampleCode: 'devcode',
          sampleType: 354,
          sampleTypeName: 'lp',
          samplingOrgan: '',
          samplingOrganName: '',
          samplingSite: '',
          samplingSiteName: '',
          serialNum: '',
          sourceId: 0,
          sourceIdCard: '150428200012120001',
          sourceName: '',
          status: ''
        },
        t: null
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      dictList: [],
      allTypeList: []
    }
  },
  created () {
    this.lsGetTableList()
  },
  methods: {
    // 查
    lsOnSearch () {
      this.lsGetTableList()
    },
    lsOnReset () {
      this.queryInfo = {
        key: null,
        sampleCode: null,
        sampleTypeName: null,
        collectAddressName: null,
        receiveDateStart: null,
        receiveDateEnd: null,
        createOnStart: null,
        createOnEnd: null,
        ageStart: null,
        ageEnd: null,
        state: null,
        sex: null,
        sourceName: null,
        sourceIdCard: null,
        telephone: null,
        page: 1,
        limit: 10
      }
      this.lsGetTableList()
    },
    lsOnSubmit () {
      this.dialogVisible = false
      this.lsGetTableList()
    },
    addOrEdit () {
      this.title = '样本采集录入'
      this.addOrEditVisible = true
      samples.getDictList().then(({ data }) => {
        this.dictList = data.items
      })
      samplesType.getAllSampleTypes().then(({ data }) => {
        this.allTypeList = data.list
      })
    },
    handleChange (value) {
      console.log(value)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.addOrEditVisible = false
    },
    // 表
    lsGetTableList () {
      this.loading = true
      samples.getTableList(this.queryInfo).then(({ data }) => {
        if (data.code === 0) {
          console.log(data)
          this.tableData = data.page.list
          this.total = data.page.totalCount
          this.loading = false
        }
      })
    },
    lsHandleSelectionChange (val) {
      this.multipleSelection = val
    },
    lsOnSearchDetail () {
      this.dialogVisible = true
    },
    // 页
    lsHandleSizeChange (val) {
      this.queryInfo.limit = val
      this.queryInfo.page = 1
      this.lsGetTableList()
    },
    lsHandleCurrentChange (val) {
      this.queryInfo.page = val
      this.lsGetTableList()
    }
  }
}
</script>
