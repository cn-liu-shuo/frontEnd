<template>
  <div>
    <el-breadcrumb separator="|" style="margin-top: -20px; float: left">
      <el-breadcrumb-item :to="{ path: '/biosample-samplesdetail' }">返回</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{createParams.equipmentName+' ('+createParams.equipmentCode+') ('+ forzenBox.shelfRowNo + '，' + forzenBox.shelfColumnNo +') 》 '+createParams.shelfName+' ('+ forzenBox.rowNo + '，' + forzenBox.columnNo +') 》 '+createParams.boxCode+'('+selectRow+'，'+selectColumn+')'}}
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="5" style="margin-top: 10px">
      <el-col :span="14">
        <div :style="{width: (boxColumnNums*60+20-(boxColumnNums-3)) + 'px', height: (boxRowNums*60+20-(boxRowNums-3)) + 'px', border: '1px solid #7DABD9'}">
          <ul class="box" :style="{width: (boxColumnNums*60+20-(boxColumnNums-2)) + 'px', height: (boxRowNums*60+20-(boxRowNums-2)) + 'px', marginLeft: '1px'}">
            <li style="background-color: #F5F3E6; height: 20px; width: 20px;"><a style="line-height: 20px; height: 20px; width: 20px;">X</a></li>
            <template v-for="colIdx in this.boxColumnNums">
              <li v-if="colIdx%2==0" style="background-color: #EBE9DD; height: 20px;"><a style="line-height: 20px; height: 20px">{{ colIdx }}</a></li>
              <li v-else style="background-color: #D7DFE9; height: 20px;"><a style="line-height: 20px; height: 20px">{{ colIdx }}</a></li>
            </template>

            <template v-for="i in this.boxRowNums">
              <li v-if="i%2==0" style="background-color: #D7DFE9; width: 20px;"><a style="width: 20px">{{ getLetter(i) }}</a></li>
              <li v-else style="background-color: #EBE9DD; width: 20px;"><a style="width: 20px">{{ getLetter(i) }}</a></li>
              <template v-if="i%2==0" v-for="j in boxColumnNums">

                <li v-if="selectRow==i && selectColumn==j" style="background-color: #7DABD9">
                  <template v-if="showType==1">
                    <a v-if="usedCell(i, j)">
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        :src="getCellPhoto (i, j)"
                      />
                    </a>
                    <a v-else>
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        src="static/img/biosample/null2.png"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a v-if="usedCell(i, j)">
                      {{ getCellId (i, j) }}
                    </a>
                    <a v-else>
                      &nbsp;
                    </a>
                  </template>
                </li>
                <li v-else-if="j%2==0" style="background-color: #FBFBF6;" @click="selectCell(i, j)">
                  <template v-if="showType==1">
                    <a v-if="usedCell(i, j)">
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        :src="getCellPhoto (i, j)"
                      />
                    </a>
                    <a v-else>
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        src="static/img/biosample/null2.png"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a v-if="usedCell(i, j)">
                      {{ getCellId (i, j) }}
                    </a>
                    <a v-else>
                      &nbsp;
                    </a>
                  </template>
                </li>

                <li v-else style="background-color: #F5F3E6" @click="selectCell(i, j)">
                  <template v-if="showType==1">
                    <a v-if="usedCell(i, j)">
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        :src="getCellPhoto (i, j)"
                      />
                    </a>
                    <a v-else>
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        src="static/img/biosample/null2.png"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a v-if="usedCell(i, j)">
                      {{ getCellId (i, j) }}
                    </a>
                    <a v-else>
                      &nbsp;
                    </a>
                  </template>
                </li>
              </template>

              <template v-if="i%2!=0" v-for="j in boxColumnNums">
                <li v-if="selectRow==i && selectColumn==j" style="background-color: #7DABD9">
                  <template v-if="showType==1">
                    <a v-if="usedCell(i, j)">
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        :src="getCellPhoto (i, j)"
                      />
                    </a>
                    <a v-else>
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        src="static/img/biosample/null2.png"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a v-if="usedCell(i, j)">
                      {{ getCellId (i, j) }}
                    </a>
                    <a v-else>
                      &nbsp;
                    </a>
                  </template>
                </li>
                <li v-else-if="j%2==0" style="background-color: #F0F0F0" @click="selectCell(i, j)">
                  <template v-if="showType==1">
                    <a v-if="usedCell(i, j)">
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        :src="getCellPhoto (i, j)"
                      />
                    </a>
                    <a v-else>
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        src="static/img/biosample/null2.png"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a v-if="usedCell(i, j)">
                      {{ getCellId (i, j) }}
                    </a>
                    <a v-else>
                      &nbsp;
                    </a>
                  </template>
                </li>
                <li v-else style="background-color: #F8F8F8" @click="selectCell(i, j)">
                  <template v-if="showType==1">
                    <a v-if="usedCell(i, j)">
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        :src="getCellPhoto (i, j)"
                      />
                    </a>
                    <a v-else>
                      <img
                        style="width: 56px; height: 56px; margin-bottom: 3px;"
                        src="static/img/biosample/null2.png"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <a v-if="usedCell(i, j)">
                      {{ getCellId (i, j) }}
                    </a>
                    <a v-else>
                      &nbsp;
                    </a>
                  </template>
                </li>
              </template>
              <!--选中颜色： #7DABD9-->
            </template>
          </ul>
        </div>
      </el-col>
      <el-col :span="10">
        <el-card v-if="samplesDetailInfo != null" :body-style="{ padding: '0px' }" shadow="never">
          <div style="height: 125px; width: 100%; background-color: #317AC7; color: whitesmoke;">
            <el-row>
              <el-col :span="4">
                <img style="width: 58px; height: 58px; margin: 5px" :src="samplesDetailInfo.photo" class="image">
              </el-col>
              <el-col :span="12">
                <div style="margin-top: 10px; font-weight: bold; color: whitesmoke">
                  {{samplesDetailInfo.sampleTypeName}} {{samplesDetailInfo.name}}
                </div>
                <div style="margin-top: 5px; font-weight: bold; font-size: 20px; color: whitesmoke">
                  {{samplesDetailInfo.sampleCode}}
                </div>
              </el-col>
              <el-col :span="8">
                <el-select size="mini" v-model="showType" style="float: right; margin: 5px; width: 90px" placeholder="请选择">
                  <el-option
                    v-for="item in showTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div style="margin: 5px; margin-top: 10px;">
                  位置：{{ !selectColumn ? '未选择' : (selectColumn + ' / ' + getLetter(selectRow)) }}
                </div>
                <div style="margin: 5px;">
                  {{createParams.equipmentName+'（'+createParams.equipmentCode+'）('+ forzenBox.shelfRowNo + '，' + forzenBox.shelfColumnNo +')'}}
                </div>
              </el-col>
            </el-row>
          </div>

          <div style="padding: 14px;">
            <p>冻存架: {{createParams.shelfTypeName + '（' + createParams.shelfName + '）('+ forzenBox.rowNo + '，' + forzenBox.columnNo +')'}}</p>
            <p style="margin-top: 10px">冻存盒: {{createParams.boxTypeName+ '（' + createParams.boxCode + '）'}} 行列数：{{boxRowNums}} * {{boxColumnNums}}</p>
            <p style="margin-top: 10px">冰箱容量: {{ samplesDetailInfo.boxCnt*boxRowNums*boxColumnNums }} 个  &nbsp; &nbsp; 冻存盒容量：{{boxRowNums*boxColumnNums}} 个</p>
            <p style="margin-top: 10px">冰箱样本数: {{samplesDetailInfo.equipmentUsedCnt}} &nbsp; &nbsp; 冰箱使用率: {{ (samplesDetailInfo.equipmentUsedCnt / (samplesDetailInfo.boxCnt*boxRowNums*boxColumnNums)).toFixed(4) * 100 }} % </p>
            <p style="margin-top: 10px">冻存盒样本数: {{samplesDetailInfo.usedCnt}} &nbsp; &nbsp; 冻存盒使用率: {{ (samplesDetailInfo.usedCnt / (boxRowNums*boxColumnNums)).toFixed(2) * 100 }} % </p>
            <!--<p style="margin-top: 10px">体积: 2.0 mL. (所有小瓶内的总体积: 2.0 mL.)</p>
            <p style="margin-top: 10px">冰柜内总小瓶数： Anti-rat MC100 (Copy) 1</p>-->
            <p style="margin-top: 10px"><el-divider></el-divider></p>
            <!--<p style="margin-top: 10px">条码: {{samplesDetailInfo.sampleCode}}</p>
            <p style="margin-top: 10px">RFID 标签: {{samplesDetailInfo.barcode}}</p>-->
            <p style="margin-top: 10px">样本源: {{samplesDetailInfo.sourceName + '(' + samplesDetailInfo.sourceIdCard + ')'}}</p>
            <p style="margin-top: 10px">性别: {{samplesDetailInfo.sex==1 ? '男' : '女'}} &nbsp; &nbsp; 年龄: {{samplesDetailInfo.age}} &nbsp; &nbsp; 手机号: {{samplesDetailInfo.telephone}}</p>
            <p style="margin-top: 10px">容量: {{samplesDetailInfo.initCapacity}} {{samplesDetailInfo.unit}}</p>
            <!--<p style="margin-top: 10px">组织器官: {{samplesDetailInfo.samplingOrganName}}</p>
            <p style="margin-top: 10px">取材部位： {{samplesDetailInfo.samplingSiteName}}</p>-->
            <p style="margin-top: 10px">采集时间: <time class="time">{{samplesDetailInfo.receiveDate}}</time></p>
            <p style="margin-top: 10px">创建时间: <time class="time">{{samplesDetailInfo.createOn}}</time></p>
            <p style="margin-top: 10px; font-weight: bold; color: lightseagreen">状态: {{samplesDetailInfo.state==2 ? '出库' : '入库'}} &nbsp; &nbsp; 检测结果: <span v-if="samplesDetailInfo.result==0" style="font-weight: bold; color: #0bb2d4">阴性</span><span v-else-if="samplesDetailInfo.result==1" style="font-weight: bold; color: red">阳性</span> <span v-else style="color: #999999">暂无</span></p>
            <p style="margin-top: 10px"><el-divider></el-divider></p>
            <div class="bottom clearfix" style="margin: 10px; float: right">
              <el-button type="plain" class="button" v-if="rowId" @click="printBarcodeHandle(samplesDetailInfo.sampleCode)">条码打印</el-button>
              <el-button type="text" class="button" v-if="rowId" @click="addOrUpdateHandle(samplesDetailInfo.id)">编辑</el-button>
              <!--<el-button type="text" class="button" v-if="rowId" @click="queryStockOut(samplesDetailInfo.id)">出库</el-button>-->
              <el-button type="text" class="button" v-if="rowId" @click="addOrUpdateHandle(samplesDetailInfo.id, true)">转存</el-button> <!--querySamplesTransportSelectBox(samplesDetailInfo.id)-->
              <!-- <el-button type="text" class="button" v-if="rowId">删除</el-button> -->
            </div>
          </div>
        </el-card>

        <el-card v-if="samplesDetailInfo == null" :body-style="{ padding: '0px' }" shadow="never">
          <div style="height: 125px; width: 100%; background-color: #317AC7; color: whitesmoke;">
            <el-row>
              <el-col :span="4">
                <img style="width: 58px; height: 58px; margin: 5px" src="static/img/biosample/null.png" class="image">
              </el-col>
              <el-col :span="12">
                <div style="margin-top: 10px; font-weight: bold; color: whitesmoke">
                  未使用的孔
                </div>
              </el-col>
              <el-col :span="8">
                <el-select size="mini" v-model="showType" style="float: right; margin: 5px; width: 90px" placeholder="请选择">
                  <el-option
                    v-for="item in showTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div style="margin: 5px; margin-top: 10px;">
                  位置：{{ !selectColumn ? '未选择' : (selectColumn + ' / ' + getLetter(selectRow)) }}
                </div>
                <div style="margin: 5px;">
                  {{createParams.equipmentName+'（'+createParams.equipmentCode+'）('+ forzenBox.shelfRowNo + '，' + forzenBox.shelfColumnNo +')'}}
                </div>
              </el-col>
            </el-row>
          </div>

          <div v-if="" style="padding: 14px;">
            <p>冻存架: {{createParams.shelfTypeName + '（' + createParams.shelfName + '）('+ forzenBox.rowNo + '，' + forzenBox.columnNo +')'}}</p>
            <p style="margin-top: 10px">冻存盒: {{createParams.boxTypeName + '（' + createParams.boxCode + '）'}}</p>
            <p style="margin-top: 10px">行数: {{boxRowNums}}</p>
            <p style="margin-top: 10px">列数: {{boxColumnNums}}</p>
            <!--<p style="margin-top: 10px"><el-divider></el-divider></p>
            <div style="height: 80px; text-align: center; vertical-align: middle"><b>无样本</b></div>-->
            <p style="margin-top: 20px"><el-divider></el-divider></p>
            <div class="bottom clearfix" style="margin: 10px; float: right">
              <!--<el-button type="text" class="button" v-if="!rowId" @click="addOrUpdateHandle(null)">采集并入库</el-button>-->
              <el-button type="text" class="button" v-if="!rowId" @click="addOrUpdateHandle(null)">入库</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" :createParams="propParams" ref="addOrUpdate" @refreshDataList="refreshDataList"></add-or-update>
    <sample-transport-select-box v-if="sampleTransportSelectBoxVisible" ref="sampleTransportSelectBox"></sample-transport-select-box>
    <barcode-dialog v-if="barcodeDialogVisible" :barcodeList="barcodeList" ref="barcodeDlg"></barcode-dialog>
  </div>

</template>

<script>
  import samplesDetailApi from '@/api/samplesDetail'
  import AddOrUpdate from './samplesdetail-add-or-update'
  import SampleTransportSelectBox from './sample-transport-select-box.vue'
  import barcodeDialog from '../report/barcode.vue'
  export default {
    components: {
      AddOrUpdate,
      SampleTransportSelectBox,
      barcodeDialog
    },
    data () {
      return {
        forzenBox: {
          shelfRowNo: '',
          shelfColumnNo: '',
          rowNo: '',
          columnNo: ''
        },
        barcodeList: [],
        showType: 1,
        showTypeName: '图片',
        showTypeOptions: [{
          value: 1,
          label: '图片'
        }, {
          value: 2,
          label: '条形码'
        }],
        addOrUpdateVisible: false,
        barcodeDialogVisible: false,
        activeName: '1,3',
        selectRow: 1,
        selectColumn: 1,
        rowId: 0,
        cellRow: {},
        equipmentId: 0,
        shelfId: 0,
        boxId: 0,
        boxRowNums: 0,
        boxColumnNums: 0,
        usedCells: null,
        samplesDetailInfo: null,
        sampleTransportSelectBoxVisible: false,
        propParams: null,
        initParams: {
          equipmentId: 0,
          shelfId: 0,
          boxId: 0,
          selectRow: 0,
          selectColumn: 0,
          equipmentName: '',
          equipmentCode: '',
          shelfName: '',
          equipmentTypeName: '',
          equipmentGroupName: '',
          shelfTypeName: '',
          boxTypeName: '',
          boxCode: ''
        },
        createParams: {
          equipmentId: 0,
          shelfId: 0,
          boxId: 0,
          selectRow: 0,
          selectColumn: 0,
          equipmentName: '',
          equipmentCode: '',
          shelfName: '',
          equipmentTypeName: '',
          equipmentGroupName: '',
          shelfTypeName: '',
          boxTypeName: '',
          boxCode: ''
        }
      }
    },
    created () {
      /* this.equipmentId = this.$route.query.equipmentId
      this.shelfId = this.$route.query.shelfId */
      this.boxId = this.$route.query.boxId

      this.rowId = this.$route.query.id
      if (this.rowId != null && this.rowId > 0) {
        samplesDetailApi.getSamplesDetailDtoInfo(this.rowId).then(res => {
          this.samplesDetailInfo = res.data.samplesDetail
          this.selectRow = res.data.samplesDetail.positionX
          this.selectColumn = res.data.samplesDetail.positionY
        }).catch(err => {
          console.error(err)
        })
      }
      // 初始化表格
      if (this.boxId != null && this.boxId > 0) {
        samplesDetailApi.getBoxDetailInfo(this.boxId).then(res => {
          if (res.data.code === 0) {
            this.forzenBox = res.data.forzenBox
            this.equipmentId = res.data.forzenBox.equipmentId
            this.shelfId = res.data.forzenBox.shelfId
            this.boxRowNums = res.data.forzenBox.rowNums
            this.boxColumnNums = res.data.forzenBox.columnNums
            // 传入子控件
            this.createParams.equipmentId = this.equipmentId
            this.createParams.shelfId = this.shelfId
            this.createParams.boxId = this.boxId
            this.createParams.equipmentName = res.data.forzenBox.equipmentName
            this.createParams.equipmentCode = res.data.forzenBox.equipmentCode
            this.createParams.shelfName = res.data.forzenBox.shelfName
            this.createParams.equipmentTypeName = res.data.forzenBox.equipmentTypeName
            this.createParams.equipmentGroupName = res.data.forzenBox.equipmentGroupName
            this.createParams.shelfTypeName = res.data.forzenBox.shelfTypeName
            this.createParams.boxTypeName = res.data.forzenBox.boxTypeName
            this.createParams.boxCode = res.data.forzenBox.code
            // 初始化存储样本
            this.initSamplesInfo()
          } else {
            console.error(res.data)
          }
        }).catch(err => {
          console.error(err)
        })
      }
    },
    methods: {
      // 初始化存储样本
      initSamplesInfo () {
        samplesDetailApi.getSelectedCellByBoxId(this.boxId).then(res => {
          if (res.data.code === 0) {
            this.usedCells = res.data.boxCells
            this.selectCell(this.selectRow, this.selectColumn)
          } else {
            console.error(res.data)
          }
        }).catch(err => {
          console.error(err)
        })
      },
      // 打印条码
      printBarcodeHandle (sampleCode) {
        this.barcodeDialogVisible = true
        this.barcodeList = [{
          barcodeValue: sampleCode
        }]
        this.$nextTick(() => {
          this.$refs.barcodeDlg.init()
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (id, isTranfer) {
        this.createParams.selectRow = this.selectRow
        this.createParams.selectColumn = this.selectColumn
        this.addOrUpdateVisible = true
        if (!isTranfer) {
          this.propParams = this.createParams
        } else {
          this.propParams = this.initParams
        }
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      usedCell: function (i, j) {
        let ret = false
        for (let index in this.usedCells) {
          if (i === this.usedCells[index].x && j === this.usedCells[index].y) {
            ret = true
          }
        }
        return ret
      },
      getCellId (i, j) {
        let val = ''
        for (let index in this.usedCells) {
          if (i === this.usedCells[index].x && j === this.usedCells[index].y) {
            val = this.usedCells[index].barcode
          }
        }
        return val
      },
      getCellRow (i, j) {
        let val = null
        for (let index in this.usedCells) {
          if (i === this.usedCells[index].x && j === this.usedCells[index].y) {
            val = this.usedCells[index]
          }
        }
        return val
      },
      getCellPhoto (i, j) {
        let val = ' '
        for (let index in this.usedCells) {
          if (i === this.usedCells[index].x && j === this.usedCells[index].y) {
            val = this.usedCells[index].photo
          }
        }
        return val
      },
      selectCell: function (i, j) {
        this.activeName = i + '' + j
        this.selectRow = i
        this.selectColumn = j
        let cellRow = this.getCellRow(i, j)
        if (cellRow) {
          this.rowId = cellRow.id
          this.samplesDetailInfo = cellRow
        } else {
          this.rowId = 0
          this.samplesDetailInfo = null
        }
      },
      getLetter (idxNum) {
        let ret = 'A'
        switch (idxNum) {
          case 1:
            ret = 'A'
            break
          case 2:
            ret = 'B'
            break

          case 3:
            ret = 'C'
            break

          case 4:
            ret = 'D'
            break

          case 5:
            ret = 'E'
            break

          case 6:
            ret = 'F'
            break

          case 7:
            ret = 'G'
            break

          case 8:
            ret = 'H'
            break

          case 9:
            ret = 'I'
            break

          case 10:
            ret = 'J'
            break
          case 11:
            ret = 'K'
            break

          case 12:
            ret = 'L'
            break

          case 13:
            ret = 'M'
            break

          case 14:
            ret = 'N'
            break

          case 15:
            ret = 'O'
            break

          case 16:
            ret = 'P'
            break

          case 17:
            ret = 'Q'
            break

          case 18:
            ret = 'R'
            break

          case 19:
            ret = 'S'
            break

          case 20:
            ret = 'T'
            break

          case 21:
            ret = 'U'
            break

          case 22:
            ret = 'V'
            break

          case 23:
            ret = 'W'
            break

          case 24:
            ret = 'X'
            break

          case 25:
            ret = 'Y'
            break

          case 26:
            ret = 'Z'
            break
        }
        return ret
      },
      refreshDataList () {
        this.initSamplesInfo()
      },
      queryStockOut (id) {
        this.$confirm('确认出库?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
          this.$http({
            url: this.$http.adornUrl(`/biosample/samplesdetail/queryStockOut/${id}`),
            method: 'post',
            data: this.$http.adornData(id, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.refreshDataList()
              let msg = 'success'
              let type = ''
              if (data.msg !== msg) {
                msg = data.msg
                type = 'warning'
              } else {
                msg = '出库成功！'
                type = 'success'
              }
              this.$message({
                message: msg,
                type: type,
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消出库'
          })
        })
      },
      querySamplesTransportSelectBox (id) {
        this.sampleTransportSelectBoxVisible = true
        this.$nextTick(() => {
          this.$refs.sampleTransportSelectBox.init(id)
        })
      }
    }
  }
</script>

<style scoped>
  /** css样式 */
  *{ margin:0; padding:0;}
  .box{
    /* width:494px;
    height:495px; */
  }
  .box li{ float:left; list-style:none; cursor: hand;}
  .box li a{
    border:1px solid #EBEEF5;
    display:block; width:60px;
    height:60px; text-decoration:none;
    margin:0 0 -1px -1px;
    position:relative;
    z-index:0;
    text-align:center;
    line-height:60px;
    color:#000;
    font-size:8px;
    cursor: hand;
  }
  .box li a:hover{ border:1px solid #333; z-index:1;}
</style>
