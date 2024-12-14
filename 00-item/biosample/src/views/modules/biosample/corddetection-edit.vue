<template>
  <div class="mod-config">

    <el-form size="mini" :inline="true" :model="dataForm">
      <el-form-item>
        <el-button type="plin" @click="goback()">返回检测列表</el-button>
        <el-button type="primary" v-if="!dataForm.status" @click="dataFormSubmit()">保存</el-button>
        <el-button type="primary" v-if="dataForm.id && !dataForm.status" @click="applyHandle()">审核</el-button>
        <!--<el-button v-if="isAuth('biosample:corddetection:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('biosample:corddetection:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-card style="margin-bottom: 5px">
      <el-form size="mini" label-width="80px" :model="dataForm" :rules="dataRule" ref="dataFormDetectTime">
        <el-row>
          <el-col :span="6">
            <el-form-item label="样本编码" prop="sampleCode">
              <el-input :readonly="true" v-model="dataForm.sampleCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证号" prop="idCard">
              <el-input :readonly="true" v-model="dataForm.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input :readonly="true" v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="sex">
              <el-input :readonly="true" :value="dataForm.sex==2 ? '女' : '男'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号" prop="telephone">
              <el-input :readonly="true" v-model="dataForm.telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="采集时间" prop="receiveDate">
              <el-date-picker
                style="width: 100%;"
                :readonly="true"
                v-model="dataForm.receiveDate"
                type="datetime"
                placeholder="采集时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="采集地点" prop="collectAddressName">
              <el-input :readonly="true" v-model="dataForm.collectAddressName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="采集人" prop="collectUser">
              <el-input :readonly="true" v-model="dataForm.collectUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="检测时间" prop="detectTime">
              <el-date-picker
                style="width: 100%;"
                v-model="dataForm.detectTime"
                type="datetime"
                placeholder="检测时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="检测人" prop="detectUser">
              <el-input :readonly="true" v-model="dataForm.detectUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="审核时间" prop="applyTime">
              <el-date-picker
                style="width: 100%;"
                :readonly="true"
                v-model="dataForm.applyTime"
                type="datetime"
                placeholder="审核时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="80px" label="审核人" prop="applyUser">
              <el-input :readonly="true" v-model="dataForm.applyUser"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row :gutter="5">
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-order"></i>
            <span style="font-size: 7px">脐带间充质干细胞质量</span>
          </div>
          <el-form label-width="120px" :model="dataForm" :rules="dataRule" ref="dataForm">
            <el-form-item  label="CD105" prop="cd105">
              <el-input style="width: 200px" v-model="dataForm.cd105">
                <template slot="append">%</template>
              </el-input>
              <el-button type="text">&gt;=90%</el-button>
            </el-form-item>

            <el-form-item label="CD90" prop="cd90">
              <el-input style="width: 200px" v-model="dataForm.cd90">
                <template slot="append">%</template>
              </el-input>
              <el-button type="text">&gt;=90%</el-button>
            </el-form-item>

            <el-form-item label="CD73" prop="cd73">
              <el-input style="width: 200px" v-model="dataForm.cd73">
                <template slot="append">%</template>
              </el-input>
              <el-button type="text">&gt;=90%</el-button>
            </el-form-item>

            <el-form-item label="CD34" prop="cd34">
              <el-input style="width: 200px" v-model="dataForm.cd34">
                <template slot="append">%</template>
              </el-input>
              <el-button type="text">&lt;=2%</el-button>
            </el-form-item>

            <el-form-item label="HLA-DR" prop="hlaDr">
              <el-input style="width: 200px" v-model="dataForm.hlaDr">
                <template slot="append">%</template>
              </el-input>
              <el-button type="text">&lt;=2%</el-button>
            </el-form-item>

            <el-form-item label="细胞冻存数量" prop="cellNum">
              <el-input style="width: 200px" v-model="dataForm.cellNum" placeholder="细胞冻存数量">
                <template slot="append">*10^7</template>
              </el-input>
              <el-button type="text">2*10^7</el-button>
            </el-form-item>

            <el-form-item label="冻存前细胞活率" prop="cellLiveNum">
              <el-input style="width: 200px" v-model="dataForm.cellLiveNum" placeholder="冻存前细胞活率">
                <template slot="append">%</template>
              </el-input>
              <el-button type="text">&gt;=80 %</el-button>
            </el-form-item>

            <el-form-item>&nbsp;</el-form-item>

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
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-order"></i>
            <span style="font-size: 7px">病原微生物</span>
          </div>
          <el-form label-width="160px" :model="dataForm" :rules="dataRule" ref="dataForm2">
            <el-form-item label="乙肝表面抗原(HbsAg)" prop="hbs">
              <el-select style="width: 200px" v-model="dataForm.hbs" placeholder="请选择">
                <el-option :key="0" :value="0" label="阴性"></el-option>
                <el-option :key="1" :value="1" label="阳性"></el-option>
              </el-select>
              <el-button type="text">阴性</el-button>
            </el-form-item>

            <el-form-item label="丙肝抗体(Anti-HCV)" prop="hcv">
              <el-select style="width: 200px" v-model="dataForm.hcv" placeholder="请选择">
                <el-option :key="0" :value="0" label="阴性"></el-option>
                <el-option :key="1" :value="1" label="阳性"></el-option>
              </el-select>
              <el-button type="text">阴性</el-button>
            </el-form-item>

            <el-form-item label="艾滋病抗体Anti-HIV" prop="hiv">
              <el-select style="width: 200px" v-model="dataForm.hiv" placeholder="请选择">
                <el-option :key="0" :value="0" label="阴性"></el-option>
                <el-option :key="1" :value="1" label="阳性"></el-option>
              </el-select>
              <el-button type="text">阴性</el-button>
            </el-form-item>

            <el-form-item label="梅毒抗体(Anti-TP)" prop="tp">
              <el-select style="width: 200px" v-model="dataForm.tp" placeholder="请选择">
                <el-option :key="0" :value="0" label="阴性"></el-option>
                <el-option :key="1" :value="1" label="阳性"></el-option>
              </el-select>
              <el-button type="text">阴性</el-button>
            </el-form-item>

            <el-form-item label="巨细胞病毒抗体" prop="bigCell">
              <el-select style="width: 200px" v-model="dataForm.bigCell" placeholder="请选择">
                <el-option :key="0" :value="0" label="阴性"></el-option>
                <el-option :key="1" :value="1" label="阳性"></el-option>
              </el-select>
              <el-button type="text">阴性</el-button>
            </el-form-item>

            <el-form-item label="细菌/真菌" prop="germ">
              <el-select style="width: 200px" v-model="dataForm.germ" placeholder="请选择">
                <el-option :key="0" :value="0" label="阴性"></el-option>
                <el-option :key="1" :value="1" label="阳性"></el-option>
              </el-select>
              <el-button type="text">阴性</el-button>
            </el-form-item>

            <el-form-item label="支原体" prop="mycoplama">
              <el-select style="width: 200px" v-model="dataForm.mycoplama" placeholder="请选择">
                <el-option :key="0" :value="0" label="阴性（无）"></el-option>
                <el-option :key="1" :value="1" label="阳性（有）"></el-option>
              </el-select>
              <el-button type="text">阴性</el-button>
            </el-form-item>

            <el-form-item label="ALT" prop="alt">
              <el-input style="width: 200px" v-model="dataForm.alt" placeholder="0~40 U/L">
                <template slot="append">U/L</template>
              </el-input>
              <el-button type="text">0~40 U/L</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="margin-top: 10px; text-align: center">
        <el-button size="small" @click="goback()">返回检测列表</el-button>
        <el-button size="small" type="primary"  v-if="!dataForm.status" @click="dataFormSubmit()">保存</el-button>
        <el-button size="small" type="primary" v-if="dataForm.id && !dataForm.status" @click="applyHandle()">审核</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import timeUtil from '@/utils/timeUtil'
  export default {
    data () {
      return {
        sampleId: 0,
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
          detectTime: new Date(),
          detectUserId: '',
          detectUser: '',
          applyTime: new Date(),
          applyUserId: '',
          applyUser: '',
          createOn: new Date(),
          createUserId: '',
          createBy: '',
          modifiedOn: new Date(),
          modifiedUserId: '',
          modifiedBy: '',
          status: '',
          deleted: ''
        },
        dataRule: {
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
          ]
        }
      }
    },
    mounted () {
      this.sampleId = this.$route.query['sampleId']
      this.$nextTick(() => {
        this.init(this.sampleId)
      })
    },
    methods: {
      init (sampleId) {
        this.$nextTick(() => {
          this.$refs['dataFormDetectTime'].resetFields()
          this.$refs['dataForm'].resetFields()
          this.$refs['dataForm2'].resetFields()
          if (sampleId) {
            this.$http({
              url: this.$http.adornUrl(`/biosample/corddetection/getBySampleId/${sampleId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.id = data.cordDetection.id
                this.dataForm.sampleId = data.cordDetection.sampleId
                this.dataForm.sampleCode = data.cordDetection.sampleCode
                this.dataForm.sampleTypeName = data.cordDetection.sampleTypeName
                this.dataForm.collectAddressName = data.cordDetection.collectAddressName
                this.dataForm.receiveDate = data.cordDetection.receiveDate
                this.dataForm.collectUser = data.cordDetection.collectUser
                this.dataForm.idCard = data.cordDetection.idCard
                this.dataForm.name = data.cordDetection.name
                this.dataForm.sex = data.cordDetection.sex
                this.dataForm.age = data.cordDetection.age
                this.dataForm.telephone = data.cordDetection.telephone
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
                if (!this.dataForm.detectTime) {
                  this.dataForm.detectTime = new Date()
                }
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
        this.$refs['dataFormDetectTime'].validate((valid) => {
          if (valid) {
            return false
          }
        })
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            return false
          }
        })
        this.$refs['dataForm2'].validate((valid) => {
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
                'detectTime': timeUtil.formatDate(this.dataForm.detectTime),
                'detectUserId': this.dataForm.detectUserId,
                'detectUser': this.dataForm.detectUser,
                'applyTime': timeUtil.formatDate(this.dataForm.applyTime),
                'applyUserId': this.dataForm.applyUserId,
                'applyUser': this.dataForm.applyUser,
                'createOn': timeUtil.formatDate(this.dataForm.createOn),
                'createUserId': this.dataForm.createUserId,
                'createBy': this.dataForm.createBy,
                'modifiedOn': timeUtil.formatDate(this.dataForm.modifiedOn),
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
                    this.dataForm.id = data.id
                    this.init(this.sampleId)
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      goback () {
        this.$router.push({path: '/biosample-corddetection'})
      },
      // 审核
      applyHandle () {
        let id = this.dataForm.id
        let ids = [this.dataForm.id]
        if (!ids || ids.length <= 0) {
          this.$message.error('请检测后再审核')
          return false
        }
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '审核' : '批量审核'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/corddetection/apply'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '审核成功，(' + data.operCnt + ')个',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  if (data.operCnt) {
                    this.init(this.sampleId)
                  }
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>

