<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="家系ID" prop="mainId">
      <el-input v-model="dataForm.mainId" placeholder="家系ID"></el-input>
    </el-form-item>
    <el-form-item label="0不是 1是" prop="isMainSource">
      <el-input v-model="dataForm.isMainSource" placeholder="0不是 1是"></el-input>
    </el-form-item>
    <el-form-item label="来源ID" prop="sourceId">
      <el-input v-model="dataForm.sourceId" placeholder="来源ID"></el-input>
    </el-form-item>
    <el-form-item label="来源Name" prop="sourceName">
      <el-input v-model="dataForm.sourceName" placeholder="来源Name"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="sourceIdCard">
      <el-input v-model="dataForm.sourceIdCard" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="关系名称" prop="relationName">
      <el-input v-model="dataForm.relationName" placeholder="关系名称"></el-input>
    </el-form-item>
    <el-form-item label="关系代码" prop="relationCode">
      <el-input v-model="dataForm.relationCode" placeholder="关系代码"></el-input>
    </el-form-item>
    <el-form-item label="关系描述" prop="description">
      <el-input v-model="dataForm.description" placeholder="关系描述"></el-input>
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
          mainId: '',
          isMainSource: '',
          sourceId: '',
          sourceName: '',
          sourceIdCard: '',
          relationName: '',
          relationCode: '',
          description: '',
          createOn: '',
          createUserId: '',
          createBy: '',
          modifiedOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          remark: ''
        },
        dataRule: {
          mainId: [
            { required: true, message: '家系ID不能为空', trigger: 'blur' }
          ],
          isMainSource: [
            { required: true, message: '0不是 1是不能为空', trigger: 'blur' }
          ],
          sourceId: [
            { required: true, message: '来源ID不能为空', trigger: 'blur' }
          ],
          sourceName: [
            { required: true, message: '来源Name不能为空', trigger: 'blur' }
          ],
          sourceIdCard: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          relationName: [
            { required: true, message: '关系名称不能为空', trigger: 'blur' }
          ],
          relationCode: [
            { required: true, message: '关系代码不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '关系描述不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/familymandetail/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.mainId = data.familyManDetail.mainId
                this.dataForm.isMainSource = data.familyManDetail.isMainSource
                this.dataForm.sourceId = data.familyManDetail.sourceId
                this.dataForm.sourceName = data.familyManDetail.sourceName
                this.dataForm.sourceIdCard = data.familyManDetail.sourceIdCard
                this.dataForm.relationName = data.familyManDetail.relationName
                this.dataForm.relationCode = data.familyManDetail.relationCode
                this.dataForm.description = data.familyManDetail.description
                this.dataForm.createOn = data.familyManDetail.createOn
                this.dataForm.createUserId = data.familyManDetail.createUserId
                this.dataForm.createBy = data.familyManDetail.createBy
                this.dataForm.modifiedOn = data.familyManDetail.modifiedOn
                this.dataForm.modifiedUserId = data.familyManDetail.modifiedUserId
                this.dataForm.modifiedBy = data.familyManDetail.modifiedBy
                this.dataForm.remark = data.familyManDetail.remark
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
              url: this.$http.adornUrl(`/biosample/familymandetail/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'mainId': this.dataForm.mainId,
                'isMainSource': this.dataForm.isMainSource,
                'sourceId': this.dataForm.sourceId,
                'sourceName': this.dataForm.sourceName,
                'sourceIdCard': this.dataForm.sourceIdCard,
                'relationName': this.dataForm.relationName,
                'relationCode': this.dataForm.relationCode,
                'description': this.dataForm.description,
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
