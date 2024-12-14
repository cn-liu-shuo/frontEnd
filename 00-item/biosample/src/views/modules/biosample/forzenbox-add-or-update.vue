<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form size="mini" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input v-model="dataForm.code" placeholder="编码不可重复"></el-input>
              <!--<el-input :readonly="true" v-model="dataForm.code" placeholder="编码自动生成">
                <el-button v-if="!dataForm.code" slot="append" @click="getBoxCode">生成</el-button>
              </el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="条形码" prop="barcode">
              <el-input v-model="dataForm.barcode" placeholder="条形码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二维码" prop="barcode2">
              <el-input v-model="dataForm.barcode2" placeholder="二维码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="硬件编码" prop="hardwareOde">
              <el-input v-model="dataForm.hardwareOde" placeholder="硬件Code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="存储容器" prop="equipmentId">
              <el-input :readonly="true" v-model="dataForm.equipmentName" placeholder="存储容器">
                <el-button slot="append" icon="el-icon-search" @click="showSelectEquipmentHandle"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="冻存架" prop="shelfId">
              <el-input :readonly="true" v-model="dataForm.shelfName" placeholder="冻存架">
                <el-button slot="append" icon="el-icon-search"  @click="showSelectShelfHandle"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第X行" prop="rowNo">
              <el-input-number style="width: 100%" :min="1" v-model="dataForm.rowNo" placeholder="位置 X代表第几行"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第Y列" prop="columnNo">
              <el-input-number style="width: 100%" :min="1" v-model="dataForm.columnNo" placeholder="位置 Y代表第几列"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="冻存盒规格" prop="boxTypeId">
              <el-input :readonly="true" v-model="dataForm.boxTypeName" placeholder="冻存盒规格">
                <el-button slot="append" icon="el-icon-search" @click="showSelectBoxTypeHandle"></el-button>
              </el-input>
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
        <el-button size="mini" type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <equipment-select-list @selectEquipment="selectEquipment" v-if="equipmentSelectListVisible" ref="equipmentSelectList"></equipment-select-list>
    <forzenshelf-select-list :equipmentId="dataForm.equipmentId" @selectShelf="selectShelf" v-if="forzenshelfSelectListVisible" ref="forzenshelfSelectList"></forzenshelf-select-list>
    <forzen-box-type-select-list @selectBoxType="selectBoxType" v-if="forzenBoxTypeSelectListVisible" ref="forzenBoxTypeSelectList"></forzen-box-type-select-list>
  </div>
</template>

<script>
  import codecApi from '@/api/codecSequence'
  import EquipmentSelectList from './equipment-select-list'
  import ForzenshelfSelectList from './forzenshelf-select-list'
  import ForzenBoxTypeSelectList from './forzenboxtype-select-list'

  export default {
    components: {
      EquipmentSelectList,
      ForzenshelfSelectList,
      ForzenBoxTypeSelectList
    },
    data () {
      return {
        visible: false,
        equipmentSelectListVisible: false,
        forzenshelfSelectListVisible: false,
        forzenBoxTypeSelectListVisible: false,
        dataForm: {
          id: 0,
          equipmentId: '',
          equipmentName: '',
          shelfId: '',
          shelfName: '',
          code: '',
          boxTypeId: '',
          boxTypeName: '',
          rowNo: '',
          columnNo: '',
          barcode: '',
          barcode2: '',
          hardwareOde: '',
          rowNums: '',
          columnNums: '',
          sampleTypes: '',
          createOn: '',
          createUserId: '',
          createBy: '',
          modifiedOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          remark: ''
        },
        dataRule: {
          equipmentId: [
            { required: true, message: '冰箱不能为空', trigger: 'blur' }
          ],
          shelfId: [
            { required: true, message: '冻存架不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '编码 自动生成，不显示 编码规则：B+年月日6位+6位流水号不能为空', trigger: 'blur' }
          ],
          boxTypeId: [
            { required: true, message: '冻存盒规格不能为空', trigger: 'blur' }
          ],
          boxTypeName: [
            { required: true, message: '冻存盒规格Name不能为空', trigger: 'blur' }
          ],
          rowNo: [
            { required: true, message: '位置 X代表第几列不能为空', trigger: 'blur' }
          ],
          columnNo: [
            { required: true, message: '位置 Y代表第几行不能为空', trigger: 'blur' }
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
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/biosample/forzenbox/box-detail-info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.equipmentId = data.forzenBox.equipmentId
                this.dataForm.equipmentName = data.forzenBox.equipmentName
                this.dataForm.shelfId = data.forzenBox.shelfId
                this.dataForm.shelfName = data.forzenBox.shelfName
                this.dataForm.code = data.forzenBox.code
                this.dataForm.boxTypeId = data.forzenBox.boxTypeId
                this.dataForm.boxTypeName = data.forzenBox.boxTypeName
                this.dataForm.rowNo = data.forzenBox.rowNo
                this.dataForm.columnNo = data.forzenBox.columnNo
                this.dataForm.barcode = data.forzenBox.barcode
                this.dataForm.barcode2 = data.forzenBox.barcode2
                this.dataForm.hardwareOde = data.forzenBox.hardwareOde
                this.dataForm.rowNums = data.forzenBox.rowNums
                this.dataForm.columnNums = data.forzenBox.columnNums
                this.dataForm.sampleTypes = data.forzenBox.sampleTypes
                this.dataForm.createOn = data.forzenBox.createOn
                this.dataForm.createUserId = data.forzenBox.createUserId
                this.dataForm.createBy = data.forzenBox.createBy
                this.dataForm.modifiedOn = data.forzenBox.modifiedOn
                this.dataForm.modifiedUserId = data.forzenBox.modifiedUserId
                this.dataForm.modifiedBy = data.forzenBox.modifiedBy
                this.dataForm.remark = data.forzenBox.remark
              }
            })
          }
        })
      },

      condAddInit (equipmentId, equipmentName, shelfId, shelfName, selectRow, selectColumn) {
        this.dataForm.id = 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.dataForm.equipmentId = equipmentId
          this.dataForm.equipmentName = equipmentName
          this.dataForm.shelfId = shelfId
          this.dataForm.shelfName = shelfName
          this.dataForm.rowNo = selectRow
          this.dataForm.columnNo = selectColumn
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/biosample/forzenbox/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'equipmentId': this.dataForm.equipmentId,
                'shelfId': this.dataForm.shelfId,
                'code': this.dataForm.code,
                'boxTypeId': this.dataForm.boxTypeId,
                'boxTypeName': this.dataForm.boxTypeName,
                'rowNo': this.dataForm.rowNo,
                'columnNo': this.dataForm.columnNo,
                'barcode': this.dataForm.barcode,
                'barcode2': this.dataForm.barcode2,
                'hardwareOde': this.dataForm.hardwareOde,
                'rowNums': this.dataForm.rowNums,
                'columnNums': this.dataForm.columnNums,
                'sampleTypes': this.dataForm.sampleTypes,
                'createOn': this.dataForm.createOn,
                'createUserId': this.dataForm.createUserId,
                'createBy': this.dataForm.createBy,
                'modifiedOn': this.dataForm.modifiedOn,
                'modifiedUserId': this.dataForm.modifiedUserId,
                'modifiedBy': this.dataForm.modifiedBy,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      selectEquipment (row) {
        this.dataForm.equipmentId = row.id
        this.dataForm.equipmentName = row.name
      },
      selectShelf (row) {
        this.dataForm.shelfId = row.id
        this.dataForm.shelfName = row.code
      },
      selectBoxType (row) {
        this.dataForm.boxTypeId = row.id
        this.dataForm.boxTypeName = row.name
        this.dataForm.columnNums = row.columnNums
        this.dataForm.rowNums = row.rowNums
      },
      showSelectEquipmentHandle () {
        this.equipmentSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.equipmentSelectList.init()
        })
      },
      showSelectShelfHandle () {
        if (!this.dataForm.equipmentId) {
          this.$message.warning('请先选择容器')
          return false
        }
        this.forzenshelfSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.forzenshelfSelectList.init()
        })
      },
      showSelectBoxTypeHandle () {
        this.forzenBoxTypeSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.forzenBoxTypeSelectList.init()
        })
      },
      getBoxCode () {
        codecApi.getBoxSequence().then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.code = data.boxSequence
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>
