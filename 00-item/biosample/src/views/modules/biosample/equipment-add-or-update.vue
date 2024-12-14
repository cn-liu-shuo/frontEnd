<template>
  <div>
    <!-- -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="容器型号" prop="modeName">
              <el-input v-model="ruleForm.modeName" placeholder="设备型号">
                <el-button slot="append" icon="el-icon-search" @click="lsOnSearchDialog()"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="容器组" prop="name">
              <el-input v-model="ruleForm.name" placeholder="容器组">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="容器编码" prop="name">
              <el-input v-model="ruleForm.name" placeholder="编码 不可重复"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="容器名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="名称 不可重复"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="ruleForm.brand" placeholder="品牌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="容器型号" prop="modelVersion">
              <el-input v-model="ruleForm.modelVersion" placeholder="型号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="类型" prop="name">
              <el-select style="width: 100%;" v-model="ruleForm.name" placeholder="类型">
                <el-option label="立式" value="shanghai"></el-option>
                <el-option label="卧式" value="beijing"></el-option>
                <el-option label="液氮罐" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="位置码类型" prop="name">
              <el-select style="width: 100%;" v-model="ruleForm.name" placeholder="类型">
                <el-option label="纯数字" value="shanghai"></el-option>
                <el-option label="混合" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span=12>
            <el-form-item label="层数" prop="name">
              <el-input-number v-model="ruleForm.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="列数" prop="name">
              <el-input-number v-model="ruleForm.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span=12>
            <el-form-item label="宽度" prop="name">
              <el-input-number v-model="ruleForm.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="深度" prop="name">
              <el-input-number v-model="ruleForm.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span=12>
            <el-form-item label="高度" prop="name">
              <el-input-number v-model="ruleForm.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="条形码">
              <el-input v-model="ruleForm.name" placeholder="条形码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="二维码">
              <el-input v-model="ruleForm.name" placeholder="二维码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="硬件编码">
              <el-input v-model="ruleForm.name" placeholder="硬件编码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="生产日期" prop="name">
              <el-date-picker style="width: 100%;" v-model="ruleForm.name" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用日期" prop="name">
              <el-date-picker style="width: 100%;" v-model="ruleForm.name" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="有效日期" prop="name">
              <el-date-picker style="width: 100%;" v-model="ruleForm.name" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="是否大规格" prop="name">
              <el-select style="width: 100%;" v-model="ruleForm.name" placeholder="类型">
                <el-option label="普通" value="shanghai"></el-option>
                <el-option label="大规格" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="状态" prop="name">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁用"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="排序码" prop="name">
              <el-input-number v-model="ruleForm.name" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="text-align: right;">
              <el-button>取消</el-button>
              <el-button type="primary">确定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="SearchVisible" width="50%">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-input size="mini" v-model="page.key" placeholder="参数名"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" @click="lsOnSearch()">查询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table v-loading="loading" :data="tableData" style="width: 100%" size="mini">
              <el-table-column label="图片" align="center" width="80">
                <template slot-scope="scope">
                  <img :src="scope.row.photo" alt="" width="35" height="35"></img>
                </template>
              </el-table-column>
              <el-table-column prop="modeCode" label="型号编码" align="center" width="160"></el-table-column>
              <el-table-column prop="modeName" label="型号名称" align="center" width="160"></el-table-column>
              <el-table-column prop="eqiupmentTypeName" label="设备类型" align="center" width="200"></el-table-column>
              <el-table-column prop="brands" label="品牌" align="center" width="120"></el-table-column>
              <el-table-column prop="model" label="型号" align="center" width="120"></el-table-column>
              <el-table-column prop="structure" label="结构" align="center" width="80"></el-table-column>
              <el-table-column prop="lowTemperature" label="低温" align="center" width="80"></el-table-column>
              <el-table-column prop="hightTemperature" label="高温" align="center" width="80"></el-table-column>
              <el-table-column prop="remark" label="备注" align="center" width="80"></el-table-column>
              <el-table-column prop="spareData" label="备用信息" align="center" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center"  width="90">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="lsOnChoose(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-pagination layout="prev, pager, next" :total="total"></el-pagination>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import equipment from '@/api/equipment'
export default {
  data () {
    return {
      total: null,
      loading: false,
      page: {
        page: 1,
        limit: 12,
        key: null
      },
      title: null,
      SearchVisible: false,
      dialogVisible: false,
      ruleForm: {
        modeName: null,
        brand: null,
        modelVersion: null,
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        modelVersion: [
          { required: true, message: 'equiment_model表ID不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  mounted () {},

  methods: {
    init () {
      this.dialogVisible = true
    },
    // 容器型号
    lsOnSearchDialog () {
      this.SearchVisible = true
      this.title = '选择容器型号'
      this.loading = true
      equipment.lsGetEquipmentmodelList(this.page).then(({data}) => {
        if (data.code === 0) {
          this.tableData = data.page.list
          this.total = data.page.totalCount
          this.loading = false
        }
      })
    },
    // 查询
    lsOnSearch () {
      this.lsOnSearchDialog()
    },
    // 选择
    lsOnChoose (row) {
      this.ruleForm.modeName = row.modeName
      this.ruleForm.brand = row.brands
      this.ruleForm.modelVersion = row.model
      this.SearchVisible = false
    },
    handleChange (value) {
      console.log(value)
    }
  }
}
</script>
