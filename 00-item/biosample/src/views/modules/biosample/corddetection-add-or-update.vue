<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form size="mini" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="样本编码" prop="sampleCode">
            {{dataForm.sampleCode + 'aa'}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="sampleCode">
            {{dataForm.name}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" prop="sampleCode">
            {{dataForm.idCard}}
          </el-form-item>
        </el-col>
        <!--<el-col :span="12">
          <el-form-item label-width="80px" label="采集地点" prop="sampleCode">
            {{dataForm.collectAddressName}}
          </el-form-item>
        </el-col>-->
      </el-row>
    </el-form>
    <el-form size="mini" label-position="top" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label-width="80px" label="CD105" prop="cd105">
            <el-row :gutter="2">
              <el-col :span="18">
                <el-input v-model="dataForm.cd105">
                  <template slot="append">%</template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text">&gt;=90%</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="CD90" prop="cd90">
            <el-row :gutter="2">
              <el-col :span="18">
                <el-input v-model="dataForm.cd90">
                  <template slot="append">%</template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text">&gt;=90%</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="CD73" prop="cd73">
            <el-row :gutter="2">
              <el-col :span="18">
                <el-input v-model="dataForm.cd73">
                  <template slot="append">%</template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text">&gt;=90%</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="CD34" prop="cd34">
            <el-row :gutter="2">
              <el-col :span="18">
                <el-input v-model="dataForm.cd34">
                  <template slot="append">%</template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text">&gt;=90%</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="HLA-DR" prop="hlaDr">
            <el-row :gutter="2">
              <el-col :span="18">
                <el-input v-model="dataForm.hlaDr">
                  <template slot="append">%</template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text">&gt;=90%</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="细胞冻存数量" prop="cellNum">
            <el-input v-model="dataForm.cellNum" placeholder="细胞冻存数量">
              <template slot="append">*10^7</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="冻存前细胞活率" prop="cellLiveNum">
            <el-input v-model="dataForm.cellLiveNum" placeholder="冻存前细胞活率">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="乙肝表面抗原(HbsAg)" prop="hbs">
            <el-input v-model="dataForm.hbs" placeholder="乙肝表面抗原(HbsAg)"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="丙肝抗体(Anti-HCV)" prop="hcv">
            <el-input v-model="dataForm.hcv" placeholder="丙肝抗体(Anti-HCV)"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="艾滋病抗体Anti-HIV" prop="hiv">
            <el-input v-model="dataForm.hiv" placeholder="艾滋病抗体Anti-HIV"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="梅毒抗体(Anti-TP)" prop="tp">
            <el-input v-model="dataForm.tp" placeholder="梅毒抗体(Anti-TP)"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="巨细胞病毒抗体" prop="bigCell">
            <el-input v-model="dataForm.bigCell" placeholder="巨细胞病毒抗体"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="细菌/真菌" prop="germ">
            <el-input v-model="dataForm.germ" placeholder="细菌/真菌"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="支原体" prop="mycoplama">
            <el-input v-model="dataForm.mycoplama" placeholder="支原体"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ALT" prop="alt">
            <el-row :gutter="5">
              <el-col :span="18">
                <el-input v-model="dataForm.alt" placeholder="0~40 U/L">
                  <template slot="append">U/L</template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text">0~40 U/L</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-form-item label="" prop="detectTime">
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
      </el-form-item>-->
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
          cd105: '',
          cd90: '',
          cd73: '',
          cd34: '',
          hlaDr: '',
          cellNum: '',
          cellLiveNum: '',
          hbs: '',
          hcv: '',
          hiv: '',
          tp: '',
          bigCell: '',
          germ: '',
          mycoplama: '',
          alt: '',
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
          cd105: [
            { required: true, message: 'cd105不能为空', trigger: 'blur' }
          ],
          cd90: [
            { required: true, message: 'cd90不能为空', trigger: 'blur' }
          ],
          cd73: [
            { required: true, message: 'cd73不能为空', trigger: 'blur' }
          ],
          cd34: [
            { required: true, message: 'cd34不能为空', trigger: 'blur' }
          ],
          hlaDr: [
            { required: true, message: 'HLA-DR不能为空', trigger: 'blur' }
          ],
          cellNum: [
            { required: true, message: '细胞冻存数量*10^7不能为空', trigger: 'blur' }
          ],
          cellLiveNum: [
            { required: true, message: '冻存前细胞活率不能为空', trigger: 'blur' }
          ],
          hbs: [
            { required: true, message: '乙肝表面抗原(HbsAg)不能为空', trigger: 'blur' }
          ],
          hcv: [
            { required: true, message: '丙肝抗体(Anti-HCV)不能为空', trigger: 'blur' }
          ],
          hiv: [
            { required: true, message: '艾滋病抗体Anti-HIV不能为空', trigger: 'blur' }
          ],
          tp: [
            { required: true, message: '梅毒抗体(Anti-TP)不能为空', trigger: 'blur' }
          ],
          bigCell: [
            { required: true, message: '巨细胞病毒抗体不能为空', trigger: 'blur' }
          ],
          germ: [
            { required: true, message: '细菌/真菌不能为空', trigger: 'blur' }
          ],
          mycoplama: [
            { required: true, message: '支原体不能为空', trigger: 'blur' }
          ],
          alt: [
            { required: true, message: 'ALT (0~40 U/L)不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/corddetection/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sampleId = data.cordDetection.sampleId
                this.dataForm.sampleCode = data.cordDetection.sampleCode
                this.dataForm.cd105 = data.cordDetection.cd105
                this.dataForm.cd90 = data.cordDetection.cd90
                this.dataForm.cd73 = data.cordDetection.cd73
                this.dataForm.cd34 = data.cordDetection.cd34
                this.dataForm.hlaDr = data.cordDetection.hlaDr
                this.dataForm.cellNum = data.cordDetection.cellNum
                this.dataForm.cellLiveNum = data.cordDetection.cellLiveNum
                this.dataForm.hbs = data.cordDetection.hbs
                this.dataForm.hcv = data.cordDetection.hcv
                this.dataForm.hiv = data.cordDetection.hiv
                this.dataForm.tp = data.cordDetection.tp
                this.dataForm.bigCell = data.cordDetection.bigCell
                this.dataForm.germ = data.cordDetection.germ
                this.dataForm.mycoplama = data.cordDetection.mycoplama
                this.dataForm.alt = data.cordDetection.alt
                this.dataForm.detectTime = data.cordDetection.detectTime
                this.dataForm.detectUserId = data.cordDetection.detectUserId
                this.dataForm.detectUser = data.cordDetection.detectUser
                this.dataForm.applyTime = data.cordDetection.applyTime
                this.dataForm.applyUserId = data.cordDetection.applyUserId
                this.dataForm.applyUser = data.cordDetection.applyUser
                this.dataForm.createOn = data.cordDetection.createOn
                this.dataForm.createUserId = data.cordDetection.createUserId
                this.dataForm.createBy = data.cordDetection.createBy
                this.dataForm.modifiedOn = data.cordDetection.modifiedOn
                this.dataForm.modifiedUserId = data.cordDetection.modifiedUserId
                this.dataForm.modifiedBy = data.cordDetection.modifiedBy
                this.dataForm.status = data.cordDetection.status
                this.dataForm.deleted = data.cordDetection.deleted
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
              url: this.$http.adornUrl(`/biosample/corddetection/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'sampleId': this.dataForm.sampleId,
                'sampleCode': this.dataForm.sampleCode,
                'cd105': this.dataForm.cd105,
                'cd90': this.dataForm.cd90,
                'cd73': this.dataForm.cd73,
                'cd34': this.dataForm.cd34,
                'hlaDr': this.dataForm.hlaDr,
                'cellNum': this.dataForm.cellNum,
                'cellLiveNum': this.dataForm.cellLiveNum,
                'hbs': this.dataForm.hbs,
                'hcv': this.dataForm.hcv,
                'hiv': this.dataForm.hiv,
                'tp': this.dataForm.tp,
                'bigCell': this.dataForm.bigCell,
                'germ': this.dataForm.germ,
                'mycoplama': this.dataForm.mycoplama,
                'alt': this.dataForm.alt,
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
