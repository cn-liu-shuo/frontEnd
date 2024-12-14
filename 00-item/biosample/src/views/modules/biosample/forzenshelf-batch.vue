<template>
  <div>
    <el-dialog
      title="生成分区(冻存架)"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form  size="mini" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="规格型号" prop="shelfTypeId">
              <el-input :readonly="true" v-model="dataForm.shelfTypeName" placeholder="规格型号">
                <el-button slot="append" icon="el-icon-search" @click="showSelectShelfHandle"></el-button>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="类型">
              <span v-if="dataForm.genType===1" style="color: #0bb2d4">按冰箱生成（{{this.equipmentRowNums * this.equipmentColumnNums}} 个）</span>
              <span v-if="dataForm.genType===2" style="color: #0bb2d4">按分区生成</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行数" prop="rowNums">
              <el-input :readonly="true" v-model="dataForm.rowNums" placeholder="行数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列数" prop="columnNums">
              <el-input :readonly="true" v-model="dataForm.columnNums" placeholder="列数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="dataForm.remark" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="visible = false">取消</el-button>
        <el-button size="mini" type="primary" :loading="submitLoading" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <forzen-shelf-type-select-list @selectShelfType="selectShelfType" v-if="forzenShelfTypeSelectListVisible" ref="forzenShelfTypeSelectList"></forzen-shelf-type-select-list>
  </div>
</template>

<script>
  import forzenShelfApi from '@/api/forzenshelf'
  import ForzenShelfTypeSelectList from './forzenshelftype-select-list'
  export default {
    components: {
      ForzenShelfTypeSelectList
    },
    data () {
      return {
        submitLoading: false,
        visible: false,
        forzenShelfTypeSelectListVisible: false,
        equipmentRowNums: 0,
        equipmentColumnNums: 0,
        dataForm: {
          genType: 1,
          equipmentId: 0,
          selectRow: 0,
          selectColumn: 0,
          rowNums: 0,
          columnNums: 0,
          shelfTypeId: '',
          shelfTypeName: '',
          remark: ''
        },
        dataRule: {
          shelfTypeId: [
            { required: true, message: '规格不能为空', trigger: 'blur' }
          ],
          shelfTypeName: [
            { required: true, message: '规格Name不能为空', trigger: 'blur' }
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
      init (genType, equipmentId, rowNums, colNums, selectRow, selectColumn) {
        this.dataForm.genType = genType
        this.dataForm.equipmentId = equipmentId
        this.dataForm.selectRow = selectRow
        this.dataForm.selectColumn = selectColumn
        this.equipmentRowNums = rowNums
        this.equipmentColumnNums = colNums
        this.visible = true
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            forzenShelfApi.batchAddShelf(this.dataForm).then(({data}) => {
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
      selectShelfType (row) {
        this.dataForm.shelfTypeId = row.id
        this.dataForm.shelfTypeName = row.name
        this.dataForm.rowNums = row.rowNums
        this.dataForm.columnNums = row.columnNums
      },
      showSelectShelfHandle () {
        this.forzenShelfTypeSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.forzenShelfTypeSelectList.init()
        })
      }
    }
  }
</script>
