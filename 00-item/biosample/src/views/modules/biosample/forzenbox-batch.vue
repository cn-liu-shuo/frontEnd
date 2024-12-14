<template>
  <div>
    <el-dialog
      title="批量生成冻存盒"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form size="mini" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="冻存盒规格" prop="boxTypeId">
              <el-input :readonly="true" v-model="dataForm.boxTypeName" placeholder="冻存盒规格">
                <el-button slot="append" icon="el-icon-search" @click="showSelectBoxTypeHandle"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型">
              <span v-if="dataForm.genType===1" style="color: #0bb2d4">按冰箱生成（{{this.equipmentRowNums * this.equipmentColumnNums * this.shelfRowNums * this.shelfColumnNums}} 个）</span>
              <span v-if="dataForm.genType===2" style="color: #0bb2d4">按分区生成</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行数" prop="rowNums">
              <el-input :readonly="true" style="width: 100%" :min="1" v-model="dataForm.rowNums" placeholder="行数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列数" prop="columnNums">
              <el-input :readonly="true" style="width: 100%" :min="1" v-model="dataForm.columnNums" placeholder="列数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="dataForm.remark" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-form-item label="样本类型" prop="sampleTypes">
          <el-input v-model="dataForm.sampleTypes" placeholder="样本类型；分隔"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible = false">取消</el-button>
        <el-button size="mini" :loading="submitLoading" type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <forzen-box-type-select-list @selectBoxType="selectBoxType" v-if="forzenBoxTypeSelectListVisible" ref="forzenBoxTypeSelectList"></forzen-box-type-select-list>
  </div>
</template>

<script>
  import forzenBoxApi from '@/api/forzenbox'
  import ForzenBoxTypeSelectList from './forzenboxtype-select-list'

  export default {
    components: {
      ForzenBoxTypeSelectList
    },
    data () {
      return {
        submitLoading: false,
        visible: false,
        forzenBoxTypeSelectListVisible: false,
        equipmentRowNums: 0,
        equipmentColumnNums: 0,
        shelfRowNums: 0,
        shelfColumnNums: 0,
        dataForm: {
          genType: 1,
          equipmentId: 0,
          selectRow: 0,
          selectColumn: 0,
          rowNums: 0,
          columnNums: 0,
          boxTypeId: '',
          boxTypeName: '',
          remark: ''
        },
        dataRule: {
          boxTypeId: [
            { required: true, message: '冻存盒规格不能为空', trigger: 'blur' }
          ],
          boxTypeName: [
            { required: true, message: '冻存盒规格Name不能为空', trigger: 'blur' }
          ],
          rowNums: [
            { required: true, message: '行数不能为空', trigger: 'blur' }
          ],
          columnNums: [
            { required: true, message: '列数不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (genType, equipmentId, rowNums, colNums, selectRow, selectColumn, shelfRowNums, shelfColumnNums) {
        this.dataForm.genType = genType
        this.dataForm.equipmentId = equipmentId
        this.dataForm.selectRow = selectRow
        this.dataForm.selectColumn = selectColumn
        this.equipmentRowNums = rowNums
        this.equipmentColumnNums = colNums
        this.shelfRowNums = shelfRowNums
        this.shelfColumnNums = shelfColumnNums
        this.visible = true
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            forzenBoxApi.batchAddBox(this.dataForm).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '批量生成成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.submitLoading = false
                    this.visible = false
                    this.$emit('refreshDataList', this.dataForm.equipmentId)
                  }
                })
              } else {
                this.submitLoading = false
                this.$message.error(data.msg)
              }
            }).catch(err => {
              this.submitLoading = false
              console.error(err)
            })
          }
        })
      },
      selectBoxType (row) {
        this.dataForm.boxTypeId = row.id
        this.dataForm.boxTypeName = row.name
        this.dataForm.columnNums = row.columnNums
        this.dataForm.rowNums = row.rowNums
      },
      showSelectBoxTypeHandle () {
        this.forzenBoxTypeSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.forzenBoxTypeSelectList.init()
        })
      }
    }
  }
</script>
