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
    <el-form-item label="" prop="sampleType">
      <el-input v-model="dataForm.sampleType" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="sampleTypeName">
      <el-input v-model="dataForm.sampleTypeName" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="采集地点" prop="collectAddress">
      <el-input v-model="dataForm.collectAddress" placeholder="采集地点"></el-input>
    </el-form-item>
    <el-form-item label="采集地点名称" prop="collectAddressName">
      <el-input v-model="dataForm.collectAddressName" placeholder="采集地点名称"></el-input>
    </el-form-item>
    <el-form-item label="采集时间" prop="receiveDate">
      <el-input v-model="dataForm.receiveDate" placeholder="采集时间"></el-input>
    </el-form-item>
    <el-form-item label="来源ID" prop="sourceId">
      <el-input v-model="dataForm.sourceId" placeholder="来源ID"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="idCard">
      <el-input v-model="dataForm.idCard" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别：1 男，2 女" prop="sex">
      <el-input v-model="dataForm.sex" placeholder="性别：1 男，2 女"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="dataForm.age" placeholder="年龄"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="telephone">
      <el-input v-model="dataForm.telephone" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="DNA浓度（ng/μL）" prop="dnaConsi">
      <el-input v-model="dataForm.dnaConsi" placeholder="DNA浓度（ng/μL）"></el-input>
    </el-form-item>
    <el-form-item label="" prop="extractTime">
      <el-input v-model="dataForm.extractTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="extractUserId">
      <el-input v-model="dataForm.extractUserId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="extractUser">
      <el-input v-model="dataForm.extractUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="dnaApplyTime">
      <el-input v-model="dataForm.dnaApplyTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="dnaApplyUserId">
      <el-input v-model="dataForm.dnaApplyUserId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="dnaApplyUser">
      <el-input v-model="dataForm.dnaApplyUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="dnaCreateOn">
      <el-input v-model="dataForm.dnaCreateOn" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="dnaCreateUserId">
      <el-input v-model="dataForm.dnaCreateUserId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="dnaCreateBy">
      <el-input v-model="dataForm.dnaCreateBy" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="SMN1-7数值" prop="smn17">
      <el-input v-model="dataForm.smn17" placeholder="SMN1-7数值"></el-input>
    </el-form-item>
    <el-form-item label="1-7质控值" prop="qcValue17">
      <el-input v-model="dataForm.qcValue17" placeholder="1-7质控值"></el-input>
    </el-form-item>
    <el-form-item label="1-7结果：0 阴性，1阳性" prop="result17">
      <el-input v-model="dataForm.result17" placeholder="1-7结果：0 阴性，1阳性"></el-input>
    </el-form-item>
    <el-form-item label="SMN1-8数值" prop="smn18">
      <el-input v-model="dataForm.smn18" placeholder="SMN1-8数值"></el-input>
    </el-form-item>
    <el-form-item label="1-8质控值" prop="qcValue18">
      <el-input v-model="dataForm.qcValue18" placeholder="1-8质控值"></el-input>
    </el-form-item>
    <el-form-item label="1-8结果：0阴性，1阳性" prop="result18">
      <el-input v-model="dataForm.result18" placeholder="1-8结果：0阴性，1阳性"></el-input>
    </el-form-item>
    <el-form-item label="质控数值" prop="qcValue">
      <el-input v-model="dataForm.qcValue" placeholder="质控数值"></el-input>
    </el-form-item>
    <el-form-item label="结果：0 阴性，1阳性" prop="result">
      <el-input v-model="dataForm.result" placeholder="结果：0 阴性，1阳性"></el-input>
    </el-form-item>
    <el-form-item label="" prop="detectTime">
      <el-input v-model="dataForm.detectTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="detectUserId">
      <el-input v-model="dataForm.detectUserId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="detectUser">
      <el-input v-model="dataForm.detectUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="applyTime">
      <el-input v-model="dataForm.applyTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="applyUserId">
      <el-input v-model="dataForm.applyUserId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="applyUser">
      <el-input v-model="dataForm.applyUser" placeholder=""></el-input>
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
          sampleType: '',
          sampleTypeName: '',
          collectAddress: '',
          collectAddressName: '',
          receiveDate: '',
          sourceId: '',
          idCard: '',
          name: '',
          sex: '',
          age: '',
          telephone: '',
          dnaConsi: '',
          extractTime: '',
          extractUserId: '',
          extractUser: '',
          dnaApplyTime: '',
          dnaApplyUserId: '',
          dnaApplyUser: '',
          dnaCreateOn: '',
          dnaCreateUserId: '',
          dnaCreateBy: '',
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
          sampleType: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          sampleTypeName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          collectAddress: [
            { required: true, message: '采集地点不能为空', trigger: 'blur' }
          ],
          collectAddressName: [
            { required: true, message: '采集地点名称不能为空', trigger: 'blur' }
          ],
          receiveDate: [
            { required: true, message: '采集时间不能为空', trigger: 'blur' }
          ],
          sourceId: [
            { required: true, message: '来源ID不能为空', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别：1 男，2 女不能为空', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '年龄不能为空', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          dnaConsi: [
            { required: true, message: 'DNA浓度（ng/μL）不能为空', trigger: 'blur' }
          ],
          extractTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          extractUserId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          extractUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dnaApplyTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dnaApplyUserId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dnaApplyUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dnaCreateOn: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dnaCreateUserId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dnaCreateBy: [
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
              url: this.$http.adornUrl(`/biosample/wxreport/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sampleId = data.wxReport.sampleId
                this.dataForm.sampleCode = data.wxReport.sampleCode
                this.dataForm.sampleType = data.wxReport.sampleType
                this.dataForm.sampleTypeName = data.wxReport.sampleTypeName
                this.dataForm.collectAddress = data.wxReport.collectAddress
                this.dataForm.collectAddressName = data.wxReport.collectAddressName
                this.dataForm.receiveDate = data.wxReport.receiveDate
                this.dataForm.sourceId = data.wxReport.sourceId
                this.dataForm.idCard = data.wxReport.idCard
                this.dataForm.name = data.wxReport.name
                this.dataForm.sex = data.wxReport.sex
                this.dataForm.age = data.wxReport.age
                this.dataForm.telephone = data.wxReport.telephone
                this.dataForm.dnaConsi = data.wxReport.dnaConsi
                this.dataForm.extractTime = data.wxReport.extractTime
                this.dataForm.extractUserId = data.wxReport.extractUserId
                this.dataForm.extractUser = data.wxReport.extractUser
                this.dataForm.dnaApplyTime = data.wxReport.dnaApplyTime
                this.dataForm.dnaApplyUserId = data.wxReport.dnaApplyUserId
                this.dataForm.dnaApplyUser = data.wxReport.dnaApplyUser
                this.dataForm.dnaCreateOn = data.wxReport.dnaCreateOn
                this.dataForm.dnaCreateUserId = data.wxReport.dnaCreateUserId
                this.dataForm.dnaCreateBy = data.wxReport.dnaCreateBy
                this.dataForm.smn17 = data.wxReport.smn17
                this.dataForm.qcValue17 = data.wxReport.qcValue17
                this.dataForm.result17 = data.wxReport.result17
                this.dataForm.smn18 = data.wxReport.smn18
                this.dataForm.qcValue18 = data.wxReport.qcValue18
                this.dataForm.result18 = data.wxReport.result18
                this.dataForm.qcValue = data.wxReport.qcValue
                this.dataForm.result = data.wxReport.result
                this.dataForm.detectTime = data.wxReport.detectTime
                this.dataForm.detectUserId = data.wxReport.detectUserId
                this.dataForm.detectUser = data.wxReport.detectUser
                this.dataForm.applyTime = data.wxReport.applyTime
                this.dataForm.applyUserId = data.wxReport.applyUserId
                this.dataForm.applyUser = data.wxReport.applyUser
                this.dataForm.createOn = data.wxReport.createOn
                this.dataForm.createUserId = data.wxReport.createUserId
                this.dataForm.createBy = data.wxReport.createBy
                this.dataForm.modifiedOn = data.wxReport.modifiedOn
                this.dataForm.modifiedUserId = data.wxReport.modifiedUserId
                this.dataForm.modifiedBy = data.wxReport.modifiedBy
                this.dataForm.status = data.wxReport.status
                this.dataForm.deleted = data.wxReport.deleted
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
              url: this.$http.adornUrl(`/biosample/wxreport/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sampleId': this.dataForm.sampleId,
                'sampleCode': this.dataForm.sampleCode,
                'sampleType': this.dataForm.sampleType,
                'sampleTypeName': this.dataForm.sampleTypeName,
                'collectAddress': this.dataForm.collectAddress,
                'collectAddressName': this.dataForm.collectAddressName,
                'receiveDate': this.dataForm.receiveDate,
                'sourceId': this.dataForm.sourceId,
                'idCard': this.dataForm.idCard,
                'name': this.dataForm.name,
                'sex': this.dataForm.sex,
                'age': this.dataForm.age,
                'telephone': this.dataForm.telephone,
                'dnaConsi': this.dataForm.dnaConsi,
                'extractTime': this.dataForm.extractTime,
                'extractUserId': this.dataForm.extractUserId,
                'extractUser': this.dataForm.extractUser,
                'dnaApplyTime': this.dataForm.dnaApplyTime,
                'dnaApplyUserId': this.dataForm.dnaApplyUserId,
                'dnaApplyUser': this.dataForm.dnaApplyUser,
                'dnaCreateOn': this.dataForm.dnaCreateOn,
                'dnaCreateUserId': this.dataForm.dnaCreateUserId,
                'dnaCreateBy': this.dataForm.dnaCreateBy,
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
