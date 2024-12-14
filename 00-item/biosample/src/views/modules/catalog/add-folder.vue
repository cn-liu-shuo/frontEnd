<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">

      <el-form-item label="文件夹名称" prop="fileName">
        <el-input v-model="dataForm.fileName" placeholder="文件夹名称"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import timeUtil from '@/utils/timeUtil.js'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          parentId: '0',
          fileName: '',
          fileType: '1',
          fileUrl: '',
          fileSize: '',
          fileExt: '',
          createTime: timeUtil.formatDate(new Date()),
          updateTime: timeUtil.formatDate(new Date()),
          deleted: 0
        },
        dataRule: {
          fileName: [
            { required: true, message: '文件夹名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id, parentId) {
        this.dataForm.id = id || 0
        this.dataForm.parentId = parentId
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/catalog/filecatalog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                // this.dataForm.parentId = data.fileCatalog.parentId
                this.dataForm.fileName = data.fileCatalog.fileName
                this.dataForm.fileType = data.fileCatalog.fileType
                this.dataForm.fileUrl = data.fileCatalog.fileUrl
                this.dataForm.fileSize = data.fileCatalog.fileSize
                this.dataForm.fileExt = data.fileCatalog.fileExt
                this.dataForm.createTime = data.fileCatalog.createTime
                this.dataForm.updateTime = data.fileCatalog.updateTime
                this.dataForm.deleted = data.fileCatalog.deleted
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
              url: this.$http.adornUrl(`/catalog/filecatalog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || 0,
                'parentId': this.dataForm.parentId,
                'fileName': this.dataForm.fileName,
                'fileType': this.dataForm.fileType,
                'fileUrl': this.dataForm.fileUrl,
                'fileSize': this.dataForm.fileSize,
                'fileExt': this.dataForm.fileExt,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
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
