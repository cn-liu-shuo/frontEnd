<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" labelWidth="100px" size="mini" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="型号编码" prop="modeCode">
            <el-input v-model="dataForm.modeCode" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="型号名称" prop="modeName">
            <el-input v-model="dataForm.modeName" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型" prop="eqiupmentType">
            <!--<el-input v-model="dataForm.eqiupmentType" placeholder="类型，1冷藏冰箱，2冷冻冰箱，3深低温冰箱，4液氮罐；5冷库；6冷藏车；7低温；8血液保存；9医用冷藏；10冷藏冷冻；11超低温；12医用保存;13二氧化碳培养箱;14植物培养箱;15恒温培养箱；16血小板恒温保存箱；17其他;18:室内；19：贝尔Cryobiobank13K液氮罐；20：贝尔Cryobiobank13K_BloodBag液氮罐"></el-input>-->
            <el-select v-model="dataForm.eqiupmentType" style="width: 100%;" placeholder="请选择">
              <el-option
                v-for="item in eqiupmentTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="brands">
            <el-input v-model="dataForm.brands" placeholder="品牌"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="型号" prop="model">
            <el-input v-model="dataForm.model" placeholder="型号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结构" prop="structure">
            <el-input v-model="dataForm.structure" placeholder="结构"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="低温" prop="lowTemperature">
            <el-input v-model="dataForm.lowTemperature" placeholder="低温"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高温" prop="hightTemperature">
            <el-input v-model="dataForm.hightTemperature" placeholder="高温"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序码" prop="sortCode">
            <el-input-number v-model="dataForm.sortCode" placeholder=""></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否可用" prop="enabled">
            <el-radio v-model="dataForm.enabled" :label="1">可用</el-radio>
            <el-radio v-model="dataForm.enabled" :label="2">不可用</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="dataForm.remark" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图片" prop="photo">
            <el-tooltip class="item" effect="dark" content="点击选择样本图片,要求64*64的图" placement="top-start">
              <div style="width: 70px; height: 70px; border:2px solid #f0f0f0;cursor: hand;" @click="showPicSelect">
                <img :src="dataForm.photo" style="width: 100%; height: 100%; cursor: hand;" alt="" />
              </div>
            </el-tooltip>
            <!--<el-input v-model="dataForm.photo" placeholder="图片"></el-input>-->
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>

    <equipment-pic v-if="equipmentPicVisible" ref="equipmentPicDialog" @changePicture="changePicture"></equipment-pic>
  </el-dialog>
</template>

<script>
  import equipmentPic from '../picture/equipment-pic.vue'
  export default {
    components: {
      equipmentPic
    },
    data () {
      return {
        visible: false,
        equipmentPicVisible: false,
        eqiupmentTypeOptions: [{
          value: 1,
          label: '冷藏冰箱'
        }, {
          value: 2,
          label: '冷冻冰箱'
        }, {
          value: 3,
          label: '深低温冰箱'
        }, {
          value: 4,
          label: '液氮罐'
        }, {
          value: 5,
          label: '冷库'
        }, {
          value: 6,
          label: '冷藏车'
        }, {
          value: 7,
          label: '低温'
        }, {
          value: 8,
          label: '血液保存'
        }, {
          value: 9,
          label: '医用冷藏'
        }, {
          value: 10,
          label: '冷藏冷冻'
        }, {
          value: 11,
          label: '超低温'
        }, {
          value: 12,
          label: '医用保存'
        }, {
          value: 13,
          label: '二氧化碳培养箱'
        }, {
          value: 14,
          label: '植物培养箱'
        }, {
          value: 15,
          label: '恒温培养箱'
        }, {
          value: 16,
          label: '血小板恒温保存箱'
        }, {
          value: 17,
          label: '其他'
        }, {
          value: 18,
          label: '室内'
        }, {
          value: 19,
          label: '贝尔Cryobiobank13K液氮罐'
        }, {
          value: 20,
          label: '贝尔Cryobiobank13K_BloodBag液氮罐'
        }],
        dataForm: {
          id: 0,
          modeCode: '',
          modeName: '',
          eqiupmentType: '',
          eqiupmentTypeName: '',
          brands: '',
          model: '',
          structure: '',
          photo: '',
          lowTemperature: '',
          hightTemperature: '',
          sortCode: '',
          enabled: 1,
          createOn: '',
          createUserId: '',
          createBy: '',
          modifiedOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          remark: '',
          spareData: ''
        },
        dataRule: {
          modeCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          modeName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          eqiupmentType: [
            { required: true, message: '类型，1冷藏冰箱，2冷冻冰箱，3深低温冰箱，4液氮罐；5冷库；6冷藏车；7低温；8血液保存；9医用冷藏；10冷藏冷冻；11超低温；12医用保存;13二氧化碳培养箱;14植物培养箱;15恒温培养箱；16血小板恒温保存箱；17其他;18:室内；19：贝尔Cryobiobank13K液氮罐；20：贝尔Cryobiobank13K_BloodBag液氮罐不能为空', trigger: 'blur' }
          ],
          eqiupmentTypeName: [
            { required: true, message: '类型，1冷藏冰箱，2冷冻冰箱，3深低温冰箱，4液氮罐；5冷库；6冷藏车；7低温；8血液保存；9医用冷藏；10冷藏冷冻；11超低温；12医用保存;13二氧化碳培养箱;14植物培养箱;15恒温培养箱；16血小板恒温保存箱；17其他;18:室内；19：贝尔Cryobiobank13K液氮罐；20：贝尔Cryobiobank13K_BloodBag液氮罐不能为空', trigger: 'blur' }
          ],
          brands: [
            { required: true, message: '品牌不能为空', trigger: 'blur' }
          ],
          model: [
            { required: true, message: '型号不能为空', trigger: 'blur' }
          ],
          structure: [
            { required: true, message: '结构不能为空', trigger: 'blur' }
          ],
          photo: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          lowTemperature: [
            { required: true, message: '低温不能为空', trigger: 'blur' }
          ],
          hightTemperature: [
            { required: true, message: '高温不能为空', trigger: 'blur' }
          ],
          sortCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          enabled: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createOn: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createBy: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          modifiedOn: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          modifiedUserId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          modifiedBy: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          /* remark: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ], */
          spareData: [
            { required: true, message: '备用信息不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/equipmentmodel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.modeCode = data.equipmentModel.modeCode
                this.dataForm.modeName = data.equipmentModel.modeName
                this.dataForm.eqiupmentType = data.equipmentModel.eqiupmentType
                this.dataForm.eqiupmentTypeName = data.equipmentModel.eqiupmentTypeName
                this.dataForm.brands = data.equipmentModel.brands
                this.dataForm.model = data.equipmentModel.model
                this.dataForm.structure = data.equipmentModel.structure
                this.dataForm.photo = data.equipmentModel.photo
                this.dataForm.lowTemperature = data.equipmentModel.lowTemperature
                this.dataForm.hightTemperature = data.equipmentModel.hightTemperature
                this.dataForm.sortCode = data.equipmentModel.sortCode
                this.dataForm.enabled = data.equipmentModel.enabled
                this.dataForm.createOn = data.equipmentModel.createOn
                this.dataForm.createUserId = data.equipmentModel.createUserId
                this.dataForm.createBy = data.equipmentModel.createBy
                this.dataForm.modifiedOn = data.equipmentModel.modifiedOn
                this.dataForm.modifiedUserId = data.equipmentModel.modifiedUserId
                this.dataForm.modifiedBy = data.equipmentModel.modifiedBy
                this.dataForm.remark = data.equipmentModel.remark
                this.dataForm.spareData = data.equipmentModel.spareData
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/biosample/equipmentmodel/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'modeCode': this.dataForm.modeCode,
                'modeName': this.dataForm.modeName,
                'eqiupmentType': this.dataForm.eqiupmentType,
                'eqiupmentTypeName': this.dataForm.eqiupmentTypeName,
                'brands': this.dataForm.brands,
                'model': this.dataForm.model,
                'structure': this.dataForm.structure,
                'photo': this.dataForm.photo,
                'lowTemperature': this.dataForm.lowTemperature,
                'hightTemperature': this.dataForm.hightTemperature,
                'sortCode': this.dataForm.sortCode,
                'enabled': this.dataForm.enabled,
                'createOn': this.dataForm.createOn,
                'createUserId': this.dataForm.createUserId,
                'createBy': this.dataForm.createBy,
                'modifiedOn': this.dataForm.modifiedOn,
                'modifiedUserId': this.dataForm.modifiedUserId,
                'modifiedBy': this.dataForm.modifiedBy,
                'remark': this.dataForm.remark,
                'spareData': this.dataForm.spareData
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
      showPicSelect () {
        this.equipmentPicVisible = true
        this.$nextTick(() => {
          this.$refs.equipmentPicDialog.init()
        })
      },
      changePicture (picUrl) {
        this.dataForm.photo = picUrl
      }
    }
  }
</script>
