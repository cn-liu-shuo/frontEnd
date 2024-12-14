<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form size="mini" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="90px">
    <!--<el-form-item label="模板ID" prop="mainId">
      <el-input v-model="dataForm.mainId" placeholder="模板ID"></el-input>
    </el-form-item>
    <el-form-item label="模板Name" prop="mainName">
      <el-input v-model="dataForm.mainName" placeholder="模板Name"></el-input>
    </el-form-item>-->
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="类型编码" prop="code">
            <el-input v-model="dataForm.code" placeholder="编码 账户内不可重复"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类型名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="名称 账户内不可重复"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-form-item label="默认容量" prop="defaultCapacity">
            <el-input-number style="width:100%" v-model="dataForm.defaultCapacity" placeholder="默认容量"></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="单位" prop="unit">
            <el-input v-model="dataForm.unit" placeholder="单位"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="分装份数" prop="subPackageNum">
            <el-input-number style="width:100%" v-model="dataForm.subPackageNum" placeholder="分装份数"></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="分装容量" prop="subPackageCapacity">
            <el-input-number style="width:100%" v-model="dataForm.subPackageCapacity" placeholder="分装容量"></el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="有效期" prop="validityHours">
            <el-input v-model="dataForm.validityHours" placeholder="有效期 单位 小时">
              <template slot="append">小时</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="提前预警" prop="waningHours">
            <el-input v-model="dataForm.waningHours" placeholder="提前预警 单位 小时  备用">
              <template slot="append">小时</template>
            </el-input>
          </el-form-item>
        </el-col>

        <!--<el-col :span="12">
          <el-form-item label="序列号" prop="seriesNumber">
            <el-input-number style="width:100%" v-model="dataForm.seriesNumber" placeholder="序列号"></el-input-number>
          </el-form-item>
        </el-col>-->

        <el-col :span="12">
          <el-form-item label="排序码" prop="sortCode">
            <el-input-number style="width:100%" v-model="dataForm.sortCode" placeholder="排序码"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="dataForm.remark" placeholder="备注" type="textarea" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="样本图片" prop="photo">
            <el-tooltip class="item" effect="dark" content="点击选择样本图片,要求64*64的图" placement="top-start">
              <div style="width: 68px; height: 68px; border:2px solid #f0f0f0;cursor: hand;" @click="showPicSelect">
                <img :src="dataForm.photo" style="width: 100%; height: 100%; cursor: hand;" alt="" />
              </div>
            </el-tooltip>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>

    <sample-pic v-if="samplePicVisible" ref="samplePicDialog" @changePicture="changePicture"></sample-pic>
  </el-dialog>
</template>

<script>
  import samplePic from '../picture/sample-pic'
  export default {
    components: {
      samplePic
    },
    data () {
      return {
        visible: false,
        samplePicVisible: false,
        dataForm: {
          id: 0,
          mainId: '',
          mainName: '',
          code: '',
          name: '',
          defaultCapacity: '',
          unit: '',
          validityHours: '',
          waningHours: '',
          subPackageNum: '',
          subPackageCapacity: '',
          sortCode: '',
          photo: '',
          photoType: '',
          seriesNumber: '',
          /* createOn: new Date(),
          createUserId: '',
          createBy: '',
          modifiedOn: new Date(),
          modifiedUserId: '',
          modifiedBy: '', */
          remark: ''
        },
        dataRule: {
          /* mainId: [
            { required: true, message: '模板ID不能为空', trigger: 'blur' }
          ],
          mainName: [
            { required: true, message: '模板Name不能为空', trigger: 'blur' }
          ], */
          code: [
            { required: true, message: '类型编码不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '类型名称不能为空', trigger: 'blur' }
          ],
          defaultCapacity: [
            { required: true, message: '默认容量不能为空', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '单位不能为空', trigger: 'blur' }
          ],
          validityHours: [
            { required: true, message: '有效期不能为空', trigger: 'blur' }
          ],
          waningHours: [
            { required: true, message: '提前预警不能为空', trigger: 'blur' }
          ],
          subPackageNum: [
            { required: true, message: '分装份数不能为空', trigger: 'blur' }
          ],
          subPackageCapacity: [
            { required: true, message: '分装容量不能为空', trigger: 'blur' }
          ],
          sortCode: [
            { required: true, message: '排序码', trigger: 'blur' }
          ],
          photo: [
            { required: true, message: '样本图片不能为空', trigger: 'blur' }
          ],
          /* photoType: [
            { required: true, message: '样本图片不能为空', trigger: 'blur' }
          ], */
          seriesNumber: [
            { required: true, message: '序列号不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/sampletype/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.mainId = data.sampleType.mainId
                this.dataForm.mainName = data.sampleType.mainName
                this.dataForm.code = data.sampleType.code
                this.dataForm.name = data.sampleType.name
                this.dataForm.defaultCapacity = data.sampleType.defaultCapacity
                this.dataForm.unit = data.sampleType.unit
                this.dataForm.validityHours = data.sampleType.validityHours
                this.dataForm.waningHours = data.sampleType.waningHours
                this.dataForm.subPackageNum = data.sampleType.subPackageNum
                this.dataForm.subPackageCapacity = data.sampleType.subPackageCapacity
                this.dataForm.sortCode = data.sampleType.sortCode
                this.dataForm.photo = data.sampleType.photo
                this.dataForm.photoType = data.sampleType.photoType
                this.dataForm.seriesNumber = data.sampleType.seriesNumber
                this.dataForm.createOn = data.sampleType.createOn
                this.dataForm.createUserId = data.sampleType.createUserId
                this.dataForm.createBy = data.sampleType.createBy
                this.dataForm.modifiedOn = data.sampleType.modifiedOn
                this.dataForm.modifiedUserId = data.sampleType.modifiedUserId
                this.dataForm.modifiedBy = data.sampleType.modifiedBy
                this.dataForm.remark = data.sampleType.remark
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
              url: this.$http.adornUrl(`/biosample/sampletype/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'mainId': this.dataForm.mainId,
                'mainName': this.dataForm.mainName,
                'code': this.dataForm.code,
                'name': this.dataForm.name,
                'defaultCapacity': this.dataForm.defaultCapacity,
                'unit': this.dataForm.unit,
                'validityHours': this.dataForm.validityHours,
                'waningHours': this.dataForm.waningHours,
                'subPackageNum': this.dataForm.subPackageNum,
                'subPackageCapacity': this.dataForm.subPackageCapacity,
                'sortCode': this.dataForm.sortCode,
                'photo': this.dataForm.photo,
                'photoType': this.dataForm.photoType,
                'seriesNumber': this.dataForm.seriesNumber,
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
      showPicSelect () {
        this.samplePicVisible = true
        this.$nextTick(() => {
          this.$refs.samplePicDialog.init()
        })
      },
      changePicture (picUrl) {
        this.dataForm.photo = picUrl
      }
    }
  }
</script>
