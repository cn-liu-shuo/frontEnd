<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form size="small" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="行数" prop="rowNums">
      <el-input-number v-model="dataForm.rowNums" placeholder="行数"></el-input-number>
    </el-form-item>
    <el-form-item label="列数" prop="columnNums">
      <el-input-number v-model="dataForm.columnNums" placeholder="列数"></el-input-number>
    </el-form-item>
    <el-form-item label="位置编码" prop="encodingType">
      <el-select v-model="dataForm.encodingType" placeholder="请选择">
        <el-option
          v-for="item in positionTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="宽度" prop="width">
      <el-input-number v-model="dataForm.width" placeholder="宽度"></el-input-number>
    </el-form-item>
    <el-form-item label="高度" prop="height">
      <el-input-number v-model="dataForm.height" placeholder="高度"></el-input-number>
    </el-form-item>
    <!--<el-form-item label="" prop="createOn">
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
    </el-form-item>-->
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="" type="textarea"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        positionTypeOptions: [{
          value: 1,
          label: '纯数字'
        }, {
          value: 2,
          label: '混合'
        }],
        dataForm: {
          id: 0,
          name: '',
          rowNums: '',
          columnNums: '',
          encodingType: 1,
          width: '',
          height: '',
          createOn: '',
          createUserId: '',
          createBy: '',
          modifiedOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          remark: ''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          rowNums: [
            { required: true, message: '行数不能为空', trigger: 'blur' }
          ],
          columnNums: [
            { required: true, message: '列数不能为空', trigger: 'blur' }
          ],
          encodingType: [
            { required: true, message: '位置编码1纯数字 2混合不能为空', trigger: 'blur' }
          ],
          width: [
            { required: true, message: '宽度不能为空', trigger: 'blur' }
          ],
          height: [
            { required: true, message: '高度不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/forzenboxtype/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.forzenBoxType.name
                this.dataForm.rowNums = data.forzenBoxType.rowNums
                this.dataForm.columnNums = data.forzenBoxType.columnNums
                this.dataForm.encodingType = data.forzenBoxType.encodingType
                this.dataForm.width = data.forzenBoxType.width
                this.dataForm.height = data.forzenBoxType.height
                this.dataForm.createOn = data.forzenBoxType.createOn
                this.dataForm.createUserId = data.forzenBoxType.createUserId
                this.dataForm.createBy = data.forzenBoxType.createBy
                this.dataForm.modifiedOn = data.forzenBoxType.modifiedOn
                this.dataForm.modifiedUserId = data.forzenBoxType.modifiedUserId
                this.dataForm.modifiedBy = data.forzenBoxType.modifiedBy
                this.dataForm.remark = data.forzenBoxType.remark
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
              url: this.$http.adornUrl(`/biosample/forzenboxtype/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'rowNums': this.dataForm.rowNums,
                'columnNums': this.dataForm.columnNums,
                'encodingType': this.dataForm.encodingType,
                'width': this.dataForm.width,
                'height': this.dataForm.height,
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
