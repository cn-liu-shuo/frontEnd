<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="160px">
    <el-form-item label="出入库" prop="type">
      <!--<el-input v-model="dataForm.type" placeholder="1 入库，2 出库"></el-input>-->
      <el-radio v-model="dataForm.type" :label="1">入库</el-radio>
      <el-radio v-model="dataForm.type" :label="2">出库</el-radio>
    </el-form-item>
    <el-form-item label="是否转存" prop="changePosition">
      <!--<el-input v-model="dataForm.changePosition" placeholder="1 转存，0 非转存"></el-input>-->
      <el-radio v-model="dataForm.changePosition" :label="0">非转存</el-radio>
      <el-radio v-model="dataForm.changePosition" :label="1">转存</el-radio>
    </el-form-item>
    <el-form-item label="转存关联的入库单号" prop="changeStockId">
      <el-input v-model="dataForm.changeStockId" placeholder="转存关联的入库单号"></el-input>
    </el-form-item>
    <el-form-item label="主表ID" prop="sampleId">
      <el-input v-model="dataForm.sampleId" placeholder="主表ID"></el-input>
    </el-form-item>
    <el-form-item label="样本编码" prop="sampleCode">
      <el-input v-model="dataForm.sampleCode" placeholder="样本编码"></el-input>
    </el-form-item>
    <el-form-item label="样本条码" prop="barcode">
      <el-input v-model="dataForm.barcode" placeholder="样本条码"></el-input>
    </el-form-item>
    <el-form-item label="容器ID" prop="equipmentId">
      <el-input v-model="dataForm.equipmentId" placeholder="容器ID"></el-input>
    </el-form-item>
    <el-form-item label="冻存架Id" prop="shelfId">
      <el-input v-model="dataForm.shelfId" placeholder="冻存架Id"></el-input>
    </el-form-item>
    <el-form-item label="冻存盒Id" prop="boxId">
      <el-input v-model="dataForm.boxId" placeholder="冻存盒Id"></el-input>
    </el-form-item>
    <el-form-item label="冻存管所在行数(X轴)" prop="positionX">
      <el-input v-model="dataForm.positionX" placeholder="冻存管所在行数(X轴)"></el-input>
    </el-form-item>
    <el-form-item label="冻存管所在列数(Y轴)" prop="positionY">
      <el-input v-model="dataForm.positionY" placeholder="冻存管所在列数(Y轴)"></el-input>
    </el-form-item>
    <el-form-item label="内部编码" prop="innerCode">
      <el-input v-model="dataForm.innerCode" placeholder="内部编码"></el-input>
    </el-form-item>
    <!--<el-form-item label="" prop="createOn">-->
    <!--  <el-input v-model="dataForm.createOn" placeholder=""></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="" prop="createUserId">-->
    <!--  <el-input v-model="dataForm.createUserId" placeholder=""></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="" prop="createBy">-->
    <!--  <el-input v-model="dataForm.createBy" placeholder=""></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="" prop="modifiedOn">-->
    <!--  <el-input v-model="dataForm.modifiedOn" placeholder=""></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="" prop="modifiedUserId">-->
    <!--  <el-input v-model="dataForm.modifiedUserId" placeholder=""></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="" prop="modifiedBy">-->
    <!--  <el-input v-model="dataForm.modifiedBy" placeholder=""></el-input>-->
    <!--</el-form-item>-->
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
          type: '',
          changePosition: '',
          changeStockId: '',
          sampleId: '',
          sampleCode: '',
          barcode: '',
          equipmentId: '',
          shelfId: '',
          boxId: '',
          positionX: '',
          positionY: '',
          innerCode: '',
          createOn: '',
          createUserId: '',
          createBy: '',
          modifiedOn: '',
          modifiedUserId: '',
          modifiedBy: '',
          remark: ''
        },
        dataRule: {
          type: [
            { required: true, message: '1 入库，2 出库不能为空', trigger: 'blur' }
          ],
          changePosition: [
            { required: true, message: '1 转存，0 非转存不能为空', trigger: 'blur' }
          ],
          changeStockId: [
            { required: true, message: '转存关联的入库单号不能为空', trigger: 'blur' }
          ],
          sampleId: [
            { required: true, message: '主表ID不能为空', trigger: 'blur' }
          ],
          sampleCode: [
            { required: true, message: '样本编码不能为空', trigger: 'blur' }
          ],
          barcode: [
            { required: true, message: '样本条码不能为空', trigger: 'blur' }
          ],
          equipmentId: [
            { required: true, message: '容器ID不能为空', trigger: 'blur' }
          ],
          shelfId: [
            { required: true, message: '冻存架Id不能为空', trigger: 'blur' }
          ],
          boxId: [
            { required: true, message: '冻存盒Id不能为空', trigger: 'blur' }
          ],
          positionX: [
            { required: true, message: '冻存管位置: 代表第几行 X不能为空', trigger: 'blur' }
          ],
          positionY: [
            { required: true, message: '冻存管位置: 代表第几列 Y不能为空', trigger: 'blur' }
          ],
          innerCode: [
            { required: true, message: '内部编码不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/stockinout/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.type = data.stockInOut.type
                this.dataForm.changePosition = data.stockInOut.changePosition
                this.dataForm.changeStockId = data.stockInOut.changeStockId
                this.dataForm.sampleId = data.stockInOut.sampleId
                this.dataForm.sampleCode = data.stockInOut.sampleCode
                this.dataForm.barcode = data.stockInOut.barcode
                this.dataForm.equipmentId = data.stockInOut.equipmentId
                this.dataForm.shelfId = data.stockInOut.shelfId
                this.dataForm.boxId = data.stockInOut.boxId
                this.dataForm.positionX = data.stockInOut.positionX
                this.dataForm.positionY = data.stockInOut.positionY
                this.dataForm.innerCode = data.stockInOut.innerCode
                this.dataForm.createOn = data.stockInOut.createOn
                this.dataForm.createUserId = data.stockInOut.createUserId
                this.dataForm.createBy = data.stockInOut.createBy
                this.dataForm.modifiedOn = data.stockInOut.modifiedOn
                this.dataForm.modifiedUserId = data.stockInOut.modifiedUserId
                this.dataForm.modifiedBy = data.stockInOut.modifiedBy
                this.dataForm.remark = data.stockInOut.remark
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
              url: this.$http.adornUrl(`/biosample/stockinout/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'changePosition': this.dataForm.changePosition,
                'changeStockId': this.dataForm.changeStockId,
                'sampleId': this.dataForm.sampleId,
                'sampleCode': this.dataForm.sampleCode,
                'barcode': this.dataForm.barcode,
                'equipmentId': this.dataForm.equipmentId,
                'shelfId': this.dataForm.shelfId,
                'boxId': this.dataForm.boxId,
                'positionX': this.dataForm.positionX,
                'positionY': this.dataForm.positionY,
                'innerCode': this.dataForm.innerCode,
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
