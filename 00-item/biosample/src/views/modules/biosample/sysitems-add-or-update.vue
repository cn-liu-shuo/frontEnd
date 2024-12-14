<template>
  <el-dialog
    size="small"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="编码" prop="code">
      <el-input v-model="dataForm.code" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="fullName">
      <el-input v-model="dataForm.fullName" placeholder=""></el-input>
    </el-form-item>
    <!--<el-form-item label="排序码" prop="sortCode">
      <el-input-number :min="0" v-model="dataForm.sortCode" placeholder=""></el-input-number>
    </el-form-item>-->
    <el-form-item label="备注" prop="remark">
      <el-input type="textarea" v-model="dataForm.remark" placeholder=""></el-input>
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
          parentId: 0,
          code: '',
          fullName: '',
          targetTable: '',
          isTree: 0,
          useItemCode: 1,
          useItemName: 1,
          useItemValue: 1,
          enabled: 1,
          allowEdit: 1,
          allowDelete: 1,
          sortCode: 1,
          remark: '',
          createUserId: '',
          createdBy: '',
          createdOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          modifiedOn: ''
        },
        dataRule: {
          parentId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          fullName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          targetTable: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          isTree: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          useItemCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          useItemName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          useItemValue: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          enabled: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          allowEdit: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          allowDelete: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          sortCode: [
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
              url: this.$http.adornUrl(`/biosample/sysitems/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.parentId = data.sysItems.parentId
                this.dataForm.code = data.sysItems.code
                this.dataForm.fullName = data.sysItems.fullName
                this.dataForm.targetTable = data.sysItems.targetTable
                this.dataForm.isTree = data.sysItems.isTree
                this.dataForm.useItemCode = data.sysItems.useItemCode
                this.dataForm.useItemName = data.sysItems.useItemName
                this.dataForm.useItemValue = data.sysItems.useItemValue
                this.dataForm.enabled = data.sysItems.enabled
                this.dataForm.allowEdit = data.sysItems.allowEdit
                this.dataForm.allowDelete = data.sysItems.allowDelete
                this.dataForm.sortCode = data.sysItems.sortCode
                this.dataForm.remark = data.sysItems.remark
                this.dataForm.createUserId = data.sysItems.createUserId
                this.dataForm.createdBy = data.sysItems.createdBy
                this.dataForm.createdOn = data.sysItems.createdOn
                this.dataForm.modifiedUserId = data.sysItems.modifiedUserId
                this.dataForm.modifiedBy = data.sysItems.modifiedBy
                this.dataForm.modifiedOn = data.sysItems.modifiedOn
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
              url: this.$http.adornUrl(`/biosample/sysitems/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'parentId': this.dataForm.parentId,
                'code': this.dataForm.code,
                'fullName': this.dataForm.fullName,
                'targetTable': this.dataForm.targetTable,
                'isTree': this.dataForm.isTree,
                'useItemCode': this.dataForm.useItemCode,
                'useItemName': this.dataForm.useItemName,
                'useItemValue': this.dataForm.useItemValue,
                'enabled': this.dataForm.enabled,
                'allowEdit': this.dataForm.allowEdit,
                'allowDelete': this.dataForm.allowDelete,
                'sortCode': this.dataForm.sortCode,
                'remark': this.dataForm.remark,
                'createUserId': this.dataForm.createUserId,
                'createdBy': this.dataForm.createdBy,
                'createdOn': this.dataForm.createdOn,
                'modifiedUserId': this.dataForm.modifiedUserId,
                'modifiedBy': this.dataForm.modifiedBy,
                'modifiedOn': this.dataForm.modifiedOn
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
