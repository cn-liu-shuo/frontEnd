<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" size="small" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="类别" prop="categoryId">
            <span style="font-weight: bold; color: lightgreen">{{this.categoryName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编码" prop="itemCode">
            <el-input v-model="dataForm.itemCode" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="itemName">
            <el-input v-model="dataForm.itemName" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="值" prop="itemValue">
            <el-input v-model="dataForm.itemValue" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="简写码" prop="itemShortCode">
            <el-input v-model="dataForm.itemShortCode" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否可用" prop="enabled">
            <el-radio v-model="dataForm.enabled" :label="1">是</el-radio>
            <el-radio v-model="dataForm.enabled" :label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序码" prop="sortCode">
            <el-input-number :min="0" v-model="dataForm.sortCode" placeholder=""></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="dataForm.remark" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      categoryId: {
        type: Number,
        default: null
      },
      categoryName: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          categoryId: '',
          parentId: 0,
          itemCode: '',
          itemName: '',
          itemValue: '',
          itemShortCode: '',
          isInput: 1,
          isStatistic: 1,
          useItemCode: 1,
          useItemName: 1,
          useItemValue: 1,
          enabled: 1,
          allowEdit: 1,
          allowDelete: 1,
          sortCode: 1,
          remark: '',
          createUserId: 0,
          createdBy: '',
          createdOn: '',
          modifiedUserId: 0,
          modifiedBy: '',
          modifiedOn: ''
        },
        dataRule: {
          categoryId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          itemCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          itemName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          itemValue: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          enabled: [
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
        this.dataForm.categoryId = this.categoryId
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/biosample/sysitemdetails/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.categoryId = data.sysItemdetails.categoryId
                this.dataForm.parentId = data.sysItemdetails.parentId
                this.dataForm.itemCode = data.sysItemdetails.itemCode
                this.dataForm.itemName = data.sysItemdetails.itemName
                this.dataForm.itemValue = data.sysItemdetails.itemValue
                this.dataForm.itemShortCode = data.sysItemdetails.itemShortCode
                this.dataForm.isInput = data.sysItemdetails.isInput
                this.dataForm.isStatistic = data.sysItemdetails.isStatistic
                this.dataForm.useItemCode = data.sysItemdetails.useItemCode
                this.dataForm.useItemName = data.sysItemdetails.useItemName
                this.dataForm.useItemValue = data.sysItemdetails.useItemValue
                this.dataForm.enabled = data.sysItemdetails.enabled
                this.dataForm.allowEdit = data.sysItemdetails.allowEdit
                this.dataForm.allowDelete = data.sysItemdetails.allowDelete
                this.dataForm.sortCode = data.sysItemdetails.sortCode
                this.dataForm.remark = data.sysItemdetails.remark
                this.dataForm.createUserId = data.sysItemdetails.createUserId
                this.dataForm.createdBy = data.sysItemdetails.createdBy
                this.dataForm.createdOn = data.sysItemdetails.createdOn
                this.dataForm.modifiedUserId = data.sysItemdetails.modifiedUserId
                this.dataForm.modifiedBy = data.sysItemdetails.modifiedBy
                this.dataForm.modifiedOn = data.sysItemdetails.modifiedOn
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
              url: this.$http.adornUrl(`/biosample/sysitemdetails/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'categoryId': this.dataForm.categoryId,
                'parentId': this.dataForm.parentId,
                'itemCode': this.dataForm.itemCode,
                'itemName': this.dataForm.itemName,
                'itemValue': this.dataForm.itemValue,
                'itemShortCode': this.dataForm.itemShortCode,
                'isInput': this.dataForm.isInput,
                'isStatistic': this.dataForm.isStatistic,
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
