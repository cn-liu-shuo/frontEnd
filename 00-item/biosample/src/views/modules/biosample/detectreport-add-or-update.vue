<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="sampleId">
      <el-input v-model="dataForm.sampleId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="sampleCode">
      <el-input v-model="dataForm.sampleCode" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="报告生成时间" prop="reportTime">
      <el-input v-model="dataForm.reportTime" placeholder="报告生成时间"></el-input>
    </el-form-item>
    <el-form-item label="报告生成人ID" prop="reportUserId">
      <el-input v-model="dataForm.reportUserId" placeholder="报告生成人ID"></el-input>
    </el-form-item>
    <el-form-item label="报告生成人" prop="reportUser">
      <el-input v-model="dataForm.reportUser" placeholder="报告生成人"></el-input>
    </el-form-item>
    <el-form-item label="报告审批时间" prop="applyTime">
      <el-input v-model="dataForm.applyTime" placeholder="报告审批时间"></el-input>
    </el-form-item>
    <el-form-item label="报告审批人ID" prop="applyUserId">
      <el-input v-model="dataForm.applyUserId" placeholder="报告审批人ID"></el-input>
    </el-form-item>
    <el-form-item label="报告审批人" prop="applyUser">
      <el-input v-model="dataForm.applyUser" placeholder="报告审批人"></el-input>
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
    <el-form-item label="0 未审核，1 审核通过，-1 审核未通过" prop="status">
      <el-input v-model="dataForm.status" placeholder="0 未审核，1 审核通过，-1 审核未通过"></el-input>
    </el-form-item>
    <el-form-item label="是否删除 0未删除 1删除" prop="deleted">
      <el-input v-model="dataForm.deleted" placeholder="是否删除 0未删除 1删除"></el-input>
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
          sampleId: '',
          sampleCode: '',
          reportTime: '',
          reportUserId: '',
          reportUser: '',
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
          reportTime: [
            { required: true, message: '报告生成时间不能为空', trigger: 'blur' }
          ],
          reportUserId: [
            { required: true, message: '报告生成人ID不能为空', trigger: 'blur' }
          ],
          reportUser: [
            { required: true, message: '报告生成人不能为空', trigger: 'blur' }
          ],
          applyTime: [
            { required: true, message: '报告审批时间不能为空', trigger: 'blur' }
          ],
          applyUserId: [
            { required: true, message: '报告审批人ID不能为空', trigger: 'blur' }
          ],
          applyUser: [
            { required: true, message: '报告审批人不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/detectreport/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sampleId = data.detectReport.sampleId
                this.dataForm.sampleCode = data.detectReport.sampleCode
                this.dataForm.reportTime = data.detectReport.reportTime
                this.dataForm.reportUserId = data.detectReport.reportUserId
                this.dataForm.reportUser = data.detectReport.reportUser
                this.dataForm.applyTime = data.detectReport.applyTime
                this.dataForm.applyUserId = data.detectReport.applyUserId
                this.dataForm.applyUser = data.detectReport.applyUser
                this.dataForm.createOn = data.detectReport.createOn
                this.dataForm.createUserId = data.detectReport.createUserId
                this.dataForm.createBy = data.detectReport.createBy
                this.dataForm.modifiedOn = data.detectReport.modifiedOn
                this.dataForm.modifiedUserId = data.detectReport.modifiedUserId
                this.dataForm.modifiedBy = data.detectReport.modifiedBy
                this.dataForm.status = data.detectReport.status
                this.dataForm.deleted = data.detectReport.deleted
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
              url: this.$http.adornUrl(`/biosample/detectreport/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sampleId': this.dataForm.sampleId,
                'sampleCode': this.dataForm.sampleCode,
                'reportTime': this.dataForm.reportTime,
                'reportUserId': this.dataForm.reportUserId,
                'reportUser': this.dataForm.reportUser,
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
