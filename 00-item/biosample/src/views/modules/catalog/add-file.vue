<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">

      <el-upload
        class="upload-demo"
        drag
        :headers="uploadHeaders"
        :with-credentials="true"
        :action="baseUrl + '/catalog/filecatalog/upload-file'"
        :data="dataForm"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">且不超过500kb</div>
      </el-upload>

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
        baseUrl: window.SITE_CONFIG.baseUrl,
        dataForm: {
          id: 0,
          parentId: '0',
          fileName: '',
          fileType: '2',
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
        },
        uploadHeaders: {
          token: this.$cookie.get('token')
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
        this.visible = false
        this.$emit('refreshDataList')
      }
    }
  }
</script>
