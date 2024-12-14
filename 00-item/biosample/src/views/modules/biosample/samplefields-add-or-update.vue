<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="样本ID" prop="samplesId">
      <el-input v-model="dataForm.samplesId" placeholder="样本ID"></el-input>
    </el-form-item>
    <el-form-item label="" prop="fieldCode">
      <el-input v-model="dataForm.fieldCode" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="fieldName">
      <el-input v-model="dataForm.fieldName" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="fieldValue">
      <el-input v-model="dataForm.fieldValue" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="createOn">
      <el-input v-model="dataForm.createOn" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="createBy">
      <el-input v-model="dataForm.createBy" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="modifiedOn">
      <el-input v-model="dataForm.modifiedOn" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="modifiedUserId">
      <el-input v-model="dataForm.modifiedUserId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="modifiedBy">
      <el-input v-model="dataForm.modifiedBy" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="remark">
      <el-input v-model="dataForm.remark" placeholder=""></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          samplesId: '',
          fieldCode: '',
          fieldName: '',
          fieldValue: '',
          createOn: '',
          createUserId: '',
          createBy: '',
          modifiedOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          remark: ''
        },
        dataRule: {
          samplesId: [
            { required: true, message: '样本ID不能为空', trigger: 'blur' }
          ],
          fieldCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          fieldName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          fieldValue: [
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
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/samplefields/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.samplesId = data.sampleFields.samplesId
                this.dataForm.fieldCode = data.sampleFields.fieldCode
                this.dataForm.fieldName = data.sampleFields.fieldName
                this.dataForm.fieldValue = data.sampleFields.fieldValue
                this.dataForm.createOn = data.sampleFields.createOn
                this.dataForm.createUserId = data.sampleFields.createUserId
                this.dataForm.createBy = data.sampleFields.createBy
                this.dataForm.modifiedOn = data.sampleFields.modifiedOn
                this.dataForm.modifiedUserId = data.sampleFields.modifiedUserId
                this.dataForm.modifiedBy = data.sampleFields.modifiedBy
                this.dataForm.remark = data.sampleFields.remark
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
              url: this.$http.adornUrl(`/biosample/samplefields/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'samplesId': this.dataForm.samplesId,
                'fieldCode': this.dataForm.fieldCode,
                'fieldName': this.dataForm.fieldName,
                'fieldValue': this.dataForm.fieldValue,
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
      }
    }
  }
</script>
