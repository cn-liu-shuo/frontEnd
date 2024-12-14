<template>
  <div>
    <el-dialog
      :title="!dataForm.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" size="mini" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="90px">

        <el-row>
          <el-col :span="12">
            <el-form-item label="容器" prop="equipmentId">
              <el-input :readonly="true" v-model="dataForm.equipmentName" placeholder="选择容器">
                <el-button slot="append" icon="el-icon-search" @click="showSelectEquipmentHandle"></el-button>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="冻存架" prop="shelfId">
              <el-input :readonly="true" v-model="dataForm.shelfName" placeholder="选择冻存架">
                <el-button slot="append" icon="el-icon-search" @click="showSelectShelfHandle"></el-button>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="冻存盒" prop="boxId">
              <el-input :readonly="true" v-model="dataForm.boxName" placeholder="选择冻存盒">
                <el-button slot="append" icon="el-icon-search" @click="showSelectBoxHandle"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">以下可选填</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="第X行" prop="positionX">
              <el-input-number v-model="dataForm.positionX" style="width: 100%" placeholder="冻存管位置；格式(x;y)代表第几列 Y代表第几行  X"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="第Y列" prop="positionY">
              <el-input-number v-model="dataForm.positionY" style="width: 100%" placeholder="冻存管位置；格式(x;y)代表第几列 Y代表第几行  X"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
    <equipment-select-list @selectEquipment="selectEquipment" v-if="equipmentSelectListVisible" ref="equipmentSelectList"></equipment-select-list>
    <forzenshelf-select-list :equipmentId="dataForm.equipmentId" @selectShelf="selectShelf" v-if="forzenshelfSelectListVisible" ref="forzenshelfSelectList"></forzenshelf-select-list>
    <forzenbox-select-list :shelfId="dataForm.shelfId" @selectBox="selectBox" v-if="forzenBoxSelectListVisible" ref="forzenBoxSelectList"></forzenbox-select-list>
  </div>
</template>

<script>
  import EquipmentSelectList from './equipment-select-list'
  import ForzenshelfSelectList from './forzenshelf-select-list'
  import ForzenboxSelectList from './forzenbox-select-list'
  export default {
    components: {
      EquipmentSelectList,
      ForzenshelfSelectList,
      ForzenboxSelectList
    },
    data () {
      return {
        visible: false,
        equipmentSelectListVisible: false,
        forzenshelfSelectListVisible: false,
        forzenBoxSelectListVisible: false,
        dataForm: {
          equipmentId: '',
          equipmentName: '',
          shelfId: '',
          shelfName: '',
          boxId: '',
          boxName: '',
          positionX: '',
          positionY: ''
        },
        dataRule: {
          equipmentId: [
            { required: true, message: '容器ID不能为空', trigger: 'blur' }
          ],
          shelfId: [
            { required: true, message: '冻存架Id不能为空', trigger: 'blur' }
          ],
          boxId: [
            { required: true, message: '冻存盒Id不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/biosample/samplesdetail/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.sampleId = data.samplesDetail.sampleId
                this.dataForm.sampleCode = data.samplesDetail.sampleCode
                this.dataForm.barcode = data.samplesDetail.barcode
                this.dataForm.state = data.samplesDetail.state
                this.dataForm.isAttachment = data.samplesDetail.isAttachment
                this.dataForm.equipmentid = data.samplesDetail.equipmentid
                this.dataForm.shelfId = data.samplesDetail.shelfId
                this.dataForm.boxId = data.samplesDetail.boxId
                this.dataForm.positionX = data.samplesDetail.positionX
                this.dataForm.positionY = data.samplesDetail.positionY
                this.dataForm.innerCode = data.samplesDetail.innerCode
                this.dataForm.initCapacity = data.samplesDetail.initCapacity
                this.dataForm.capacity = data.samplesDetail.capacity
                this.dataForm.unit = data.samplesDetail.unit
                this.dataForm.freezingNum = data.samplesDetail.freezingNum
                this.dataForm.validityDate = data.samplesDetail.validityDate
                this.dataForm.parentBarcode = data.samplesDetail.parentBarcode
                this.dataForm.type = data.samplesDetail.type
                this.dataForm.cellMakerId = data.samplesDetail.cellMakerId
                this.dataForm.createOn = new Date(data.samplesDetail.createOn)
                this.dataForm.createUserId = data.samplesDetail.createUserId
                this.dataForm.createBy = data.samplesDetail.createBy
                this.dataForm.modifiedOn = new Date(data.samplesDetail.modifiedOn)
                this.dataForm.modifiedUserId = data.samplesDetail.modifiedUserId
                this.dataForm.modifiedBy = data.samplesDetail.modifiedBy
                this.dataForm.remark = data.samplesDetail.remark
                this.dataForm.deleted = data.samplesDetail.deleted
              }
            })
          }
        })
      },
      selectEquipment (row) {
        this.dataForm.equipmentId = row.id
        this.dataForm.equipmentName = row.name
      },
      selectShelf (row) {
        this.dataForm.shelfId = row.id
        this.dataForm.shelfName = row.code
      },
      selectBox (row) {
        this.dataForm.boxId = row.id
        this.dataForm.boxName = row.code
      },
      showSelectEquipmentHandle () {
        this.equipmentSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.equipmentSelectList.init()
        })
      },
      showSelectShelfHandle () {
        if (!this.dataForm.equipmentId) {
          this.$message.warning('请先选择容器')
          return false
        }
        this.forzenshelfSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.forzenshelfSelectList.init()
        })
      },
      showSelectBoxHandle () {
        if (!this.dataForm.shelfId) {
          this.$message.warning('请先选择冻存架')
          return false
        }
        this.forzenBoxSelectListVisible = true
        this.$nextTick(() => {
          this.$refs.forzenBoxSelectList.init()
        })
      },
      dataFormSubmit () {
        let params = {}
        /** params['equipmentId'] = this.dataForm.equipmentId
        params['shelfId'] = this.dataForm.shelfId */
        params['boxId'] = this.dataForm.boxId
        if (this.dataForm.positionX) {
          params['x'] = this.dataForm.positionX
        }
        if (this.dataForm.positionY) {
          params['y'] = this.dataForm.positionY
        }

        this.$router.push({
          path: '/biosample/samples-edit',
          query: params
        })
      }
    }
  }
</script>
