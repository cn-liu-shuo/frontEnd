<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="上一级目录ID" prop="parentId">
      <el-input v-model="dataForm.parentId" placeholder="上一级目录ID"></el-input>
    </el-form-item>
    <el-form-item label="文件名或文件夹名" prop="fileName">
      <el-input v-model="dataForm.fileName" placeholder="文件名或文件夹名"></el-input>
    </el-form-item>
    <el-form-item label="文件类型: 1文件夹 2文件" prop="fileType">
      <el-input v-model="dataForm.fileType" placeholder="文件类型: 1文件夹 2文件"></el-input>
    </el-form-item>
    <el-form-item label="文件服务器地址" prop="fileUrl">
      <el-input v-model="dataForm.fileUrl" placeholder="文件服务器地址"></el-input>
    </el-form-item>
    <el-form-item label="文件大小" prop="fileSize">
      <el-input v-model="dataForm.fileSize" placeholder="文件大小"></el-input>
    </el-form-item>
    <el-form-item label="文件扩展名" prop="fileExt">
      <el-input v-model="dataForm.fileExt" placeholder="文件扩展名"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="修改时间"></el-input>
    </el-form-item>
    <el-form-item label="" prop="deleted">
      <el-input v-model="dataForm.deleted" placeholder=""></el-input>
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
          parentId: '',
          fileName: '',
          fileType: '',
          fileUrl: '',
          fileSize: '',
          fileExt: '',
          createTime: '',
          updateTime: '',
          deleted: ''
        },
        dataRule: {
          parentId: [
            { required: true, message: '上一级目录ID不能为空', trigger: 'blur' }
          ],
          fileName: [
            { required: true, message: '文件名或文件夹名不能为空', trigger: 'blur' }
          ],
          fileType: [
            { required: true, message: '文件类型: 1文件夹 2文件不能为空', trigger: 'blur' }
          ],
          fileUrl: [
            { required: true, message: '文件服务器地址不能为空', trigger: 'blur' }
          ],
          fileSize: [
            { required: true, message: '文件大小不能为空', trigger: 'blur' }
          ],
          fileExt: [
            { required: true, message: '文件扩展名不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
          ],
          deleted: [
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
              url: this.$http.adornUrl(`/catalog/filecatalog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.parentId = data.fileCatalog.parentId
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
                'id': this.dataForm.id || undefined,
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
