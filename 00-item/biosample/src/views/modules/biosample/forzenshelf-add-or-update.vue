<template>
  <div>
    <!-- -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="60%">
      <el-form size="mini" :module="ruleForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="编码">
              <el-input v-model="ruleForm.code" placeholder="编码不可重复"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="条形码">
              <el-input v-model="ruleForm.barcode" placeholder="条形码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="硬件编码">
              <el-input v-model="ruleForm.hardcode" placeholder="硬件Code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="存储容器">
              <el-input v-model="ruleForm.name" readonly placeholder="设备">
                <template slot="append">
                  <el-button icon="el-icon-search"></el-button>
                </template>>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第X行">
              <el-input-number v-model="ruleForm.rowNo" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="第Y列">
              <el-input-number v-model="ruleForm.columnNo" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="规格型号">
              <el-input readonly v-model="ruleForm.shelfTypeId" placeholder="规格型号">
                <template slot="append">
                  <el-button icon="el-icon-search" @click="lsOpenShelfType()"></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行数">
              <el-input readonly v-model="ruleForm.rowNums" placeholder="行数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="列数">
              <el-input readonly v-model="ruleForm.columnNums" placeholder="列数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <forzenshelf-select-list v-if="forzenshelfAddOrUpdateVisible" ref="forzenshelfAddOrUpdateRef" @selectShelf="selectShelf"></forzenshelf-select-list>
  </div>
</template>

<script>
import forzenshelfSelectList from './forzenshelf-select-list.vue'
export default {
  components: {
    forzenshelfSelectList
  },
  data () {
    return {
      forzenshelfAddOrUpdateVisible: false,
      dialogVisible: false,
      ruleForm: {
        code: '',
        barcode: '',
        hardcode: '',
        name: '',
        rowNo: 1,
        columnNo: 1,
        shelfTypeId: '',
        rowNums: null,
        columnNums: null,
        remark: ''
      }
    }
  },

  mounted () {

  },

  methods: {
    lsInit (id) {
      this.dialogVisible = true
    },
    lsOpenShelfType () {
      this.forzenshelfAddOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.forzenshelfAddOrUpdateRef.init()
      })
    },
    selectShelf (row) {
      console.log(row)
    }
  }
}
</script>