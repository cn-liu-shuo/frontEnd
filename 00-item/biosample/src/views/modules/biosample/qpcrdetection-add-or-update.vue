<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form size="small" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
      <el-form-item label="样本编码" prop="sampleCode">
        <el-input :readonly="true" v-model="dataForm.sampleCode" placeholder="样本编码"></el-input>
      </el-form-item>
      <el-form-item label="SMN1-7数值" prop="smn17">
        <el-input-number style="width:100%" v-model="dataForm.smn17" placeholder="SMN1-7数值"></el-input-number>
      </el-form-item>
      <el-form-item label="SMN1-7质控值" prop="qcValue17">
        <el-input-number style="width:100%" v-model="dataForm.qcValue17" placeholder="1-7质控值"></el-input-number>
      </el-form-item>
      <el-form-item label="SMN1-7结果" prop="result17">
        <el-select style="width:100%" v-model="dataForm.result17" placeholder="">
          <el-option :key="0" label="未突变" :value="0"></el-option>
          <el-option :key="1" label="杂合突变" :value="1"></el-option>
          <el-option :key="2" label="纯合突变" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SMN1-8数值" prop="smn18">
        <el-input-number style="width:100%" v-model="dataForm.smn18" placeholder="SMN1-8数值"></el-input-number>
      </el-form-item>
      <el-form-item label="SMN1-8质控值" prop="qcValue18">
        <el-input-number style="width:100%" v-model="dataForm.qcValue18" placeholder="1-8质控值"></el-input-number>
      </el-form-item>
      <el-form-item label="SMN1-8结果" prop="result18">
        <el-select style="width:100%" v-model="dataForm.result18" placeholder="">
          <el-option :key="0" label="未突变" :value="0"></el-option>
          <el-option :key="1" label="杂合突变" :value="1"></el-option>
          <el-option :key="2" label="纯合突变" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="质控数值" prop="qcValue">
        <el-input-number style="width:100%" v-model="dataForm.qcValue" placeholder="质控数值"></el-input-number>
      </el-form-item>
      <el-form-item label="结果" prop="result">
        <el-select style="width:100%" v-model="dataForm.result" placeholder="">
          <el-option :key="0" label="阴性" :value="0"></el-option>
          <el-option :key="1" label="阳性" :value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="dataFormSubmit()">确定</el-button>
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
          sampleId: '',
          sampleCode: '',
          smn17: '',
          qcValue17: '',
          result17: '',
          smn18: '',
          qcValue18: '',
          result18: '',
          qcValue: '',
          result: '',
          detectTime: '',
          detectUserId: '',
          detectUser: '',
          applyTime: '',
          applyUserId: '',
          applyUser: '',
          createOn: '',
          createUserId: '',
          createBy: '',
          modifiedOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          status: '',
          deleted: ''
        },
        dataRule: {
          sampleId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          sampleCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          smn17: [
            { required: true, message: 'SMN1-7数值不能为空', trigger: 'blur' }
          ],
          qcValue17: [
            { required: true, message: '1-7质控值不能为空', trigger: 'blur' }
          ],
          result17: [
            { required: true, message: '1-7结果：0 阴性，1阳性不能为空', trigger: 'blur' }
          ],
          smn18: [
            { required: true, message: 'SMN1-8数值不能为空', trigger: 'blur' }
          ],
          qcValue18: [
            { required: true, message: '1-8质控值不能为空', trigger: 'blur' }
          ],
          result18: [
            { required: true, message: '1-8结果：0阴性，1阳性不能为空', trigger: 'blur' }
          ],
          qcValue: [
            { required: true, message: '质控数值不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '结果：0 阴性，1阳性不能为空', trigger: 'blur' }
          ],
          detectTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          detectUserId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          detectUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          applyTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          applyUserId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          applyUser: [
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
          status: [
            { required: true, message: '0 未审核，1 审核通过，-1 审核未通过不能为空', trigger: 'blur' }
          ],
          deleted: [
            { required: true, message: '是否删除 0未删除 1删除不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/qpcrdetection/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sampleId = data.qpcrDetection.sampleId
                this.dataForm.sampleCode = data.qpcrDetection.sampleCode
                this.dataForm.smn17 = data.qpcrDetection.smn17
                this.dataForm.qcValue17 = data.qpcrDetection.qcValue17
                this.dataForm.result17 = data.qpcrDetection.result17
                this.dataForm.smn18 = data.qpcrDetection.smn18
                this.dataForm.qcValue18 = data.qpcrDetection.qcValue18
                this.dataForm.result18 = data.qpcrDetection.result18
                this.dataForm.qcValue = data.qpcrDetection.qcValue
                this.dataForm.result = data.qpcrDetection.result
                this.dataForm.detectTime = data.qpcrDetection.detectTime
                this.dataForm.detectUserId = data.qpcrDetection.detectUserId
                this.dataForm.detectUser = data.qpcrDetection.detectUser
                this.dataForm.applyTime = data.qpcrDetection.applyTime
                this.dataForm.applyUserId = data.qpcrDetection.applyUserId
                this.dataForm.applyUser = data.qpcrDetection.applyUser
                this.dataForm.createOn = data.qpcrDetection.createOn
                this.dataForm.createUserId = data.qpcrDetection.createUserId
                this.dataForm.createBy = data.qpcrDetection.createBy
                this.dataForm.modifiedOn = data.qpcrDetection.modifiedOn
                this.dataForm.modifiedUserId = data.qpcrDetection.modifiedUserId
                this.dataForm.modifiedBy = data.qpcrDetection.modifiedBy
                this.dataForm.status = data.qpcrDetection.status
                this.dataForm.deleted = data.qpcrDetection.deleted
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
              url: this.$http.adornUrl(`/biosample/qpcrdetection/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sampleId': this.dataForm.sampleId,
                'sampleCode': this.dataForm.sampleCode,
                'smn17': this.dataForm.smn17,
                'qcValue17': this.dataForm.qcValue17,
                'result17': this.dataForm.result17,
                'smn18': this.dataForm.smn18,
                'qcValue18': this.dataForm.qcValue18,
                'result18': this.dataForm.result18,
                'qcValue': this.dataForm.qcValue,
                'result': this.dataForm.result,
                'detectTime': this.dataForm.detectTime,
                'detectUserId': this.dataForm.detectUserId,
                'detectUser': this.dataForm.detectUser,
                'applyTime': this.dataForm.applyTime,
                'applyUserId': this.dataForm.applyUserId,
                'applyUser': this.dataForm.applyUser,
                'createOn': this.dataForm.createOn,
                'createUserId': this.dataForm.createUserId,
                'createBy': this.dataForm.createBy,
                'modifiedOn': this.dataForm.modifiedOn,
                'modifiedUserId': this.dataForm.modifiedUserId,
                'modifiedBy': this.dataForm.modifiedBy,
                'status': this.dataForm.status,
                'deleted': this.dataForm.deleted
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
