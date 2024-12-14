<template>
  <div>
    <el-row style="margin-top: -10px">
      <el-col>
        <router-link :to="{ path: '/biosample-equipment-manage' }">
          <el-button type="plain" icon="el-icon-back">返回</el-button>
        </router-link>
        <el-button type="primary" @click="shelfAddHandle" icon="el-icon-edit">添加冻存架</el-button>
        <el-button type="primary" @click="boxAddHandle" icon="el-icon-edit">添加冻存盒</el-button>
        <el-button type="warning" icon="el-icon-c-scale-to-original" @click="showForzenshelfBatch">批量生成冻存架</el-button>
        <el-button type="warning" icon="el-icon-c-scale-to-original" @click="showForzenboxBatch">批量生成冻存盒</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="5" style="margin-top: 30px">
      <el-col :span="24">
        <!-- 第一个表，冰箱表格 -->
        <div style="float: left">
          <el-tag type="warning" size="mini">1. 容器分区/层</el-tag>
          <div :style="{width: (boxColumnNums*200+20-(boxColumnNums-3)) + 'px', height: (boxRowNums*60+20-(boxRowNums-3)) + 'px', border: '1px solid #7DABD9'}">
            <ul class="box" :style="{width: (boxColumnNums*200+20-(boxColumnNums-2)) + 'px', height: (boxRowNums*60+20-(boxRowNums-2)) + 'px', marginLeft: '1px'}">
              <li style="background-color: #F5F3E6; height: 20px; width: 20px;"><a style="line-height: 20px; height: 20px; width: 20px;">X</a></li>
              <template v-for="colIdx in this.boxColumnNums">
                <li style="background-color: #EBE9DD; height: 20px; width: 200px;"><a style="line-height: 20px; height: 20px; ">{{ colIdx }}</a></li>
              </template>

              <template v-for="i in this.boxRowNums">
                <li style="background-color: #D7DFE9; width: 20px;"><a style="height: 60px; width: 20px">{{ getLetter(i) }}</a></li>
                <template v-for="j in boxColumnNums">
                  <li v-if="selectRow==i && selectColumn==j" style="background-color: #7DABD9" @click="selectCell(i, j)">
                    <a style="height: 60px; width: 200px; word-break:break-all;">
                      <!--{{ getForzenShelf(i, j) }}-->
                    </a>
                  </li>
                  <li v-else @click="selectCell(i, j)">
                    <a style="height: 60px; width: 200px; overflow: hidden;">
                      <!--{{ getForzenShelf(i, j) }}-->
                    </a>
                  </li>
                </template>
                <!--选中颜色： #7DABD9-->
              </template>
            </ul>
          </div>

          <img v-if="dataForm.item == 3" style="margin-left: -1px; margin-top: -1px" src="static/img/biosample/equipment/yd_bottom.png" :width="boxColumnNums*200+20-(boxColumnNums-6)" />
          <img v-else style="margin-left: -1px; margin-top: -1px" src="static/img/biosample/equipment/bottom.png" :width="boxColumnNums*200+20-(boxColumnNums-6)" />
          <div>选中：{{this.selectShelfItem ? (this.selectShelfItem.shelfTypeName + ' (' + this.selectShelfItem.code + ')') : ''}}</div>
        </div>
        <!-- 第二个表，冻存架表格 -->
        <div v-if="selectForzenShelfList" style="float: left; margin-left: 5px">
          <el-tag type="warning" size="mini">2. 冻存架</el-tag>
          <el-button type="primary" @click="shelfAddOrUpdateHandle" icon="el-icon-edit">编辑</el-button>
          <div :style="{width: (82+20) + 'px', height: (selectForzenShelfList.length*30-(selectForzenShelfList.length-3)) + 'px', border: '1px solid #7DABD9'}">
            <ul class="box" :style="{width: (82+20) + 'px', height: (selectForzenShelfList.length*30-(selectForzenShelfList.length-2)) + 'px', marginLeft: '1px'}">
              <template v-for="(item, idx) in selectForzenShelfList">
                <li style="background-color: #D7DFE9; width: 20px;"><a style="line-height: 30px; height: 30px; width: 20px">{{ idx+1 }}</a></li>

                <li v-if="selectShelfItem.id == item.id" style="background-color: #7DABD9;" @click="selectShelfCell(item)">
                  <a style="line-height: 30px; height: 30px; width: 80px; word-break:break-all;">
                    {{ item.code }}
                  </a>
                </li>
                <li v-else @click="selectShelfCell(item)">
                  <a style="line-height: 30px; height: 30px; width: 80px; overflow: hidden;">
                    {{ item.code }}
                  </a>
                </li>
                <!--选中颜色： #7DABD9-->
              </template>
            </ul>
          </div>

        </div>
        <!-- 第三个表，冻存盒表格 -->
        <div v-if="this.selectShelfItem" style="float: left; margin-left: 30px">
          <el-tag type="success" size="mini">3. 冻存盒</el-tag>
          <el-button type="primary" icon="el-icon-edit" @click="boxAddOrUpdateHandle">编辑</el-button>
          <el-button v-if="!this.selectshelfBoxItem && !curPositionDisabled" type="danger" icon="el-icon-warning-outline" @click="positionDisableHandle">禁用</el-button>
          <el-button v-if="curPositionDisabled" type="success" icon="el-icon-warning-outline" @click="positionEnableHandle">启用</el-button>
          <!--<el-button type="plain">删除</el-button>-->
          <div :style="{width: (shelfBoxColumnNums*60+20-(shelfBoxColumnNums-3)) + 'px', height: (shelfBoxRowNums*60+20-(shelfBoxRowNums-3)) + 'px', border: '1px solid #7DABD9'}">
            <ul class="box" :style="{width: (shelfBoxColumnNums*60+20-(shelfBoxColumnNums-2)) + 'px', height: (shelfBoxRowNums*60+20-(shelfBoxRowNums-2)) + 'px', marginLeft: '1px'}">

              <template v-for="(i, shelfIdx) in this.shelfBoxRowNumsAry">
                <li style="background-color: #D7DFE9; width: 20px;"><a style="height: 60px; width: 20px">{{ getLetter(i) }}</a></li>
                <template v-for="j in shelfBoxColumnNums">
                  <li v-if="selectShelfBoxRow==i && selectShelfBoxColumn==j" @click="selectShelfBoxCell(i, j)" style="background-color: #7DABD9">
                    <a style="height: 60px">
                      {{ getForzenBox(i, j) }}
                    </a>
                  </li>
                  <li v-else @click="selectShelfBoxCell(i, j)">
                    <a style="height: 60px">
                      {{ getForzenBox(i, j) }}
                    </a>
                  </li>
                </template>
                <!--选中颜色： #7DABD9-->
              </template>

              <li style="background-color: #F5F3E6; height: 20px; width: 20px;"><a style="line-height: 20px; height: 20px; width: 20px;">X</a></li>
              <template v-for="colIdx in this.shelfBoxColumnNums">
                <li style="background-color: #EBE9DD; height: 20px;"><a style="line-height: 20px; height: 20px; ">{{ colIdx }}</a></li>
              </template>

            </ul>
          </div>

          <div>选中：{{this.selectshelfBoxItem ? (this.selectshelfBoxItem.boxTypeName + ' (' + this.selectshelfBoxItem.code + ')') : ''}}</div>
        </div>
        <!-- 第4个表，冻存盒样本表格 -->
        <div v-if="this.selectshelfBoxItem" style="float: left; margin-left: 30px; margin-top: 20px">
          <el-tag type="success" size="mini">4. 样本</el-tag>
          <el-button type="primary" icon="el-icon-folder-opened" @click="openForzenBox">打开冻存盒</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="showEditSampleHandle">编辑样本</el-button>
          <!--<el-button type="plain">删除</el-button>-->
          <div :style="{width: (sampleBoxColumnNums*60+20-(sampleBoxColumnNums-3)) + 'px', height: (sampleBoxRowNums*60+20-(sampleBoxRowNums-3)) + 'px', border: '1px solid #7DABD9'}">
            <ul class="box" :style="{width: (sampleBoxColumnNums*60+20-(sampleBoxColumnNums-2)) + 'px', height: (sampleBoxRowNums*60+20-(sampleBoxRowNums-2)) + 'px', marginLeft: '1px'}">
              <li style="background-color: #F5F3E6; height: 20px; width: 20px;"><a style="line-height: 20px; height: 20px; width: 20px;">X</a></li>
              <template v-for="colIdx in this.sampleBoxColumnNums">
                <li style="background-color: #EBE9DD; height: 20px;"><a style="line-height: 20px; height: 20px; ">{{ colIdx }}</a></li>
              </template>

              <template v-for="i in this.sampleBoxRowNums">
                <li style="background-color: #D7DFE9; width: 20px;"><a style="height: 60px; width: 20px">{{ getLetter(i) }}</a></li>
                <template v-for="j in sampleBoxColumnNums">
                  <li v-if="selectSampleBoxRow==i && selectSampleBoxColumn==j" @click="selectSampleCell(i, j)" style="background-color: #7DABD9">
                    <a style="height: 60px">
                      {{ getSample(i, j) }}
                    </a>
                  </li>
                  <li v-else @click="selectSampleCell(i, j)">
                    <a style="height: 60px">
                      {{ getSample(i, j) }}
                    </a>
                  </li>
                </template>
                <!--选中颜色： #7DABD9-->
              </template>
            </ul>
          </div>

          <div>选中样本：{{this.selectSampleBoxItem ? (this.selectSampleBoxItem.sampleTypeName + ' (' + this.selectSampleBoxItem.sampleCode + ')') : ''}}</div>
        </div>
      </el-col>
    </el-row>
    <forzenshelf-batch ref="forzenshelfBatch" v-if="forzenshelfBatchVisible" @refreshDataList="refreshDataList"></forzenshelf-batch>
    <forzenbox-batch ref="forzenboxBatch" v-if="forzenboxBatchVisible" @refreshDataList="refreshBoxDataList"></forzenbox-batch>
    <!-- 弹窗, 新增 / 修改 -->
    <shelf-add-or-update v-if="shelfAddOrUpdateVisible" ref="shelfAddOrUpdate" @refreshDataList="refreshShelfByEquipmentId"></shelf-add-or-update>
    <!-- 弹窗, 新增 / 修改 -->
    <box-add-or-update v-if="boxAddOrUpdateVisible" ref="boxAddOrUpdate" @refreshDataList="refreshBoxsByShelfId"></box-add-or-update>
    <!-- 弹窗, 新增 / 修改 -->
    <sample-add-or-update v-if="sampleAddOrUpdateVisible" :createParams="propParams" ref="sampleAddOrUpdate" @refreshDataList="refreshSampleList"></sample-add-or-update>
  </div>
</template>

<script>
  import equipmentApi from '@/api/equipment'
  import forzenshelfApi from '@/api/forzenshelf'
  import forzenShelfPositionDiableApi from '@/api/forzenShelfPositionDiable'
  import forzenboxApi from '@/api/forzenbox'
  import samplesDetailApi from '@/api/samplesDetail'
  import ForzenshelfBatch from './forzenshelf-batch'
  import ForzenboxBatch from './forzenbox-batch'
  import ShelfAddOrUpdate from './forzenshelf-add-or-update'
  import BoxAddOrUpdate from './forzenbox-add-or-update'
  import SampleAddOrUpdate from './samplesdetail-add-or-update'
  export default {
    components: {
      ForzenboxBatch,
      ForzenshelfBatch,
      ShelfAddOrUpdate,
      BoxAddOrUpdate,
      SampleAddOrUpdate
    },
    data () {
      return {
        forzenshelfBatchVisible: false,
        forzenboxBatchVisible: false,
        shelfAddOrUpdateVisible: false,
        boxAddOrUpdateVisible: false,
        sampleAddOrUpdateVisible: false,
        selectForzenShelfList: [],
        boxRowNums: 0,
        boxColumnNums: 1,
        selectColumn: 1,
        selectRow: 1,
        shelfList: null,
        selectShelfItem: null,

        shelfBoxRowNumsAry: [],
        shelfBoxRowNums: 0,
        shelfBoxColumnNums: 0,
        selectShelfBoxColumn: 1,
        selectShelfBoxRow: 1,
        shelfBoxList: null,
        selectshelfBoxItem: null,
        curPositionDisabled: false,
        curPositionDisabledItem: null,

        sampleBoxRowNums: 0,
        sampleBoxColumnNums: 0,
        selectSampleBoxColumn: 1,
        selectSampleBoxRow: 1,
        sampleBoxList: null,
        selectSampleBoxItem: null,
        shelfPositionDisableList: null,

        propParams: {
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

        dataForm: {
          id: 0,
          equipmentModelId: '',
          equipmentModelName: '',
          equipmentGroupId: '',
          equipmentGroupName: '',
          code: '',
          name: '',
          brand: '',
          modelVersion: '',
          item: '',
          encodingType: 1,
          rowNums: '',
          columnNums: '',
          width: '',
          depth: '',
          height: '',
          sampleType: '',
          barcode: '',
          barcode2: '',
          hardcode: '',
          state: 0,
          sortCode: '',
          isLargeSpec: 1,
          produceDate: '',
          useDate: '',
          validityDate: '',
          createOn: new Date(),
          createUserId: '',
          createBy: '',
          modifiedOn: new Date(),
          modifiedUserId: '',
          modifiedBy: '',
          remark: ''
        }
      }
    },
    created () {
      if (this.$route.params && this.$route.params.equipmentId) {
        // 获取冻存架列表
        this.getShelfByEquipmentId(this.$route.params.equipmentId)
        this.getShelfPositionDisableByEquipmentId(this.$route.params.equipmentId)
        this.init(this.$route.params.equipmentId)
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        if (this.dataForm.id) {
          equipmentApi.getEquipmentDetailInfo(this.dataForm.id).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.equipmentModelName = data.equipment.equipmentModelName
              this.dataForm.equipmentGroupName = data.equipment.equipmentGroupName
              this.dataForm.equipmentModelId = data.equipment.equipmentModelId
              this.dataForm.equipmentGroupId = data.equipment.equipmentGroupId
              this.dataForm.code = data.equipment.code
              this.dataForm.name = data.equipment.name
              this.dataForm.brand = data.equipment.brand
              this.dataForm.modelVersion = data.equipment.modelVersion
              this.dataForm.item = data.equipment.item
              this.dataForm.encodingType = data.equipment.encodingType
              this.dataForm.rowNums = data.equipment.rowNums
              this.dataForm.columnNums = data.equipment.columnNums
              this.boxRowNums = this.dataForm.rowNums
              // this.boxColumnNums = this.dataForm.columnNums //改成默认值：1
              this.boxColumnNums = 1
              this.dataForm.width = data.equipment.width
              this.dataForm.depth = data.equipment.depth
              this.dataForm.height = data.equipment.height
              this.dataForm.sampleType = data.equipment.sampleType
              this.dataForm.barcode = data.equipment.barcode
              this.dataForm.barcode2 = data.equipment.barcode2
              this.dataForm.hardcode = data.equipment.hardcode
              this.dataForm.state = data.equipment.state
              this.dataForm.sortCode = data.equipment.sortCode
              this.dataForm.isLargeSpec = data.equipment.isLargeSpec
              this.dataForm.produceDate = new Date(data.equipment.produceDate)
              this.dataForm.useDate = new Date(data.equipment.useDate)
              this.dataForm.validityDate = new Date(data.equipment.validityDate)
              this.dataForm.createOn = new Date(data.equipment.createOn)
              this.dataForm.createUserId = data.equipment.createUserId
              this.dataForm.createBy = data.equipment.createBy
              this.dataForm.modifiedOn = new Date(data.equipment.modifiedOn)
              this.dataForm.modifiedUserId = data.equipment.modifiedUserId
              this.dataForm.modifiedBy = data.equipment.modifiedBy
              this.dataForm.remark = data.equipment.remark
            }
          })
        }
      },
      refreshShelfByEquipmentId () {
        this.getShelfByEquipmentId(this.dataForm.id)
      },
      getShelfByEquipmentId (equipmentId) {
        forzenshelfApi.getShelfByEquipmentId(equipmentId).then(({data}) => {
          if (data && data.code === 0) {
            this.shelfList = data.forzenShelfs
            this.selectForzenShelfList = this.getForzenShelfList(this.selectRow)
            if (this.selectForzenShelfList.length > 0) {
              this.selectShelfItem = this.selectForzenShelfList[0]
            } else {
              this.selectShelfItem = null
            }
            // this.selectShelfItem = this.getForzenShelfRow(this.selectRow, this.selectColumn)
          }
        })
      },
      refreshBoxsByShelfId () {
        this.getBoxsByShelfId(this.selectShelfItem.id)
      },
      getBoxsByShelfId (shelfId) {
        forzenboxApi.getBoxsByShelfId(shelfId).then(({data}) => {
          if (data && data.code === 0) {
            this.shelfBoxList = data.forzenBoxs
            this.selectshelfBoxItem = this.getForzenBoxRow(this.selectShelfBoxRow, this.selectShelfBoxColumn)
          }
        })
      },
      getSamplesByBoxId (boxId) {
        samplesDetailApi.getSelectedCellByBoxId(boxId).then(res => {
          if (res.data.code === 0) {
            this.sampleBoxList = res.data.boxCells
            this.selectSampleBoxItem = this.getSampleRow(this.selectSampleBoxRow, this.selectSampleBoxColumn)
          } else {
            console.error(res.data)
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getShelfPositionDisableByEquipmentId (equipmentId) {
        forzenShelfPositionDiableApi.getPositionDisableByEquipmentId(equipmentId).then(({data}) => {
          if (data && data.code === 0) {
            this.shelfPositionDisableList = data.disabledPositions
            // 是否是不禁用位置
            let positionDisabled = this.getPositionDisableItem(this.selectShelfBoxRow, this.selectShelfBoxColumn)
            if (positionDisabled) {
              this.curPositionDisabled = true
              this.curPositionDisabledItem = positionDisabled
            }
          }
        })
      },
      refreshSampleList () {
        this.getSamplesByBoxId(this.selectshelfBoxItem.id)
      },
      refreshDataList (equipmentId) {
        this.getShelfByEquipmentId(equipmentId)
      },
      refreshBoxDataList (equipmentId) {
        if (this.selectShelfItem) {
          this.getBoxsByShelfId(this.selectShelfItem.id)
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
      selectCell (x, y) {
        this.selectRow = x
        this.selectColumn = y
        this.selectForzenShelfList = this.getForzenShelfList(x)
        if (this.selectForzenShelfList.length > 0) {
          this.selectShelfItem = this.selectForzenShelfList[0]
        } else {
          this.selectShelfItem = null
        }
        if (this.selectShelfItem) {
          this.shelfBoxRowNums = this.selectShelfItem.rowNums
          this.shelfBoxColumnNums = this.selectShelfItem.columnNums
        } else {
          this.shelfBoxRowNums = 0
          this.shelfBoxColumnNums = 0
          this.selectshelfBoxItem = null
        }
      },
      selectShelfCell (item) {
        this.selectShelfItem = item
      },
      selectShelfBoxCell (x, y) {
        this.selectShelfBoxRow = x
        this.selectShelfBoxColumn = y
        this.selectshelfBoxItem = this.getForzenBoxRow(x, y)
        // 是否是不禁用位置
        let positionDisabled = this.getPositionDisableItem(this.selectShelfBoxRow, this.selectShelfBoxColumn)
        if (positionDisabled) {
          this.curPositionDisabled = true
          this.curPositionDisabledItem = positionDisabled
        } else {
          this.curPositionDisabled = false
          this.curPositionDisabledItem = null
        }
      },
      selectSampleCell (x, y) {
        this.selectSampleBoxRow = x
        this.selectSampleBoxColumn = y
        this.selectSampleBoxItem = this.getSampleRow(x, y)
      },
      showForzenshelfBatch () {
        this.forzenshelfBatchVisible = true
        this.$nextTick(() => {
          this.$refs.forzenshelfBatch.init(1, this.dataForm.id, this.dataForm.rowNums, this.dataForm.columnNums, this.selectRow, this.selectColumn)
        })
      },
      showForzenboxBatch () {
        this.forzenboxBatchVisible = true
        if (!this.selectShelfItem) {
          this.$message({
            message: '未找到分区(冻存架)的规格，请先生成或选择一个',
            type: 'warning'
          })
        }
        this.$nextTick(() => {
          this.$refs.forzenboxBatch.init(
            1, this.dataForm.id,
            this.dataForm.rowNums, this.dataForm.columnNums,
            this.selectRow, this.selectColumn,
            this.selectShelfItem.rowNums,
            this.selectShelfItem.columnNums
          )
        })
      },
      getForzenShelf (i, j) {
        let val = ''
        for (let index in this.shelfList) {
          if (i === this.shelfList[index].rowNo && j === this.shelfList[index].columnNo) {
            val = this.shelfList[index].code
            break
          }
        }
        return val
      },
      getForzenShelfRow (i, j) {
        let val = null
        for (let index in this.shelfList) {
          if (i === this.shelfList[index].rowNo && j === this.shelfList[index].columnNo) {
            val = this.shelfList[index]
            break
          }
        }
        return val
      },
      getForzenShelfList (i) {
        this.selectForzenShelfList = []
        for (let index in this.shelfList) {
          if (i === this.shelfList[index].rowNo) {
            this.selectForzenShelfList.push(this.shelfList[index])
          }
        }
        return this.selectForzenShelfList
      },
      getForzenBox (i, j) {
        let val = ''
        let positionDisabled = this.getPositionDisableItem(i, j)
        if (positionDisabled) {
          val = 'N/A'
        }
        for (let index in this.shelfBoxList) {
          if (i === this.shelfBoxList[index].rowNo && j === this.shelfBoxList[index].columnNo) {
            val = this.shelfBoxList[index].code
            break
          }
        }
        return val
      },
      getForzenBoxRow (i, j) {
        let val = null
        for (let index in this.shelfBoxList) {
          if (i === this.shelfBoxList[index].rowNo && j === this.shelfBoxList[index].columnNo) {
            val = this.shelfBoxList[index]
            break
          }
        }
        return val
      },
      getPositionDisableItem (i, j) {
        let position = null
        if (!this.selectShelfItem) {
          return position
        }
        for (let pIdx in this.shelfPositionDisableList) {
          if (
            this.shelfPositionDisableList[pIdx].shelfId === this.selectShelfItem.id &&
            i === this.shelfPositionDisableList[pIdx].rowNo &&
            j === this.shelfPositionDisableList[pIdx].columnNo
          ) {
            position = this.shelfPositionDisableList[pIdx]
            break
          }
        }
        return position
      },
      getPositionDisableItemTmp (i, j, tmpSelectShelfItem) {
        let position = null
        if (!tmpSelectShelfItem) {
          return position
        }
        for (let pIdx in this.shelfPositionDisableList) {
          if (
            this.shelfPositionDisableList[pIdx].shelfId === tmpSelectShelfItem.id &&
            i === this.shelfPositionDisableList[pIdx].rowNo &&
            j === this.shelfPositionDisableList[pIdx].columnNo
          ) {
            position = this.shelfPositionDisableList[pIdx]
            break
          }
        }
        return position
      },
      getSample (i, j) {
        let val = ''
        for (let index in this.sampleBoxList) {
          if (i === this.sampleBoxList[index].x && j === this.sampleBoxList[index].y) {
            val = this.sampleBoxList[index].sampleCode
            break
          }
        }
        return val
      },
      getSampleRow (i, j) {
        let val = null
        for (let index in this.sampleBoxList) {
          if (i === this.sampleBoxList[index].x && j === this.sampleBoxList[index].y) {
            val = this.sampleBoxList[index]
            break
          }
        }
        return val
      },
      shelfAddHandle () {
        if (this.selectRow) {
          this.shelfAddOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.shelfAddOrUpdate.condAddInit(
              this.dataForm.id,
              this.dataForm.name,
              this.selectRow,
              this.selectForzenShelfList.length + 1
            )
          })
        } else {
          this.$message({
            message: '请先选择冻存架，再编辑',
            type: 'warning'
          })
        }
      },
      shelfAddOrUpdateHandle () {
        if (this.selectShelfItem) {
          this.shelfAddOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.shelfAddOrUpdate.init(this.selectShelfItem.id)
          })
        } else {
          this.$message({
            message: '请先选择冻存架，再编辑',
            type: 'warning'
          })
        }
      },
      boxAddHandle () {
        if (this.selectShelfItem) {
          this.boxAddOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.boxAddOrUpdate.condAddInit(
              this.dataForm.id,
              this.dataForm.name,
              this.selectShelfItem.id,
              this.selectShelfItem.code,
              this.selectShelfBoxRow,
              this.selectShelfBoxColumn
            )
          })
        } else {
          this.$message({
            message: '请先选择冻存架，再编辑',
            type: 'warning'
          })
        }
      },
      boxAddOrUpdateHandle () {
        if (this.selectshelfBoxItem) {
          this.boxAddOrUpdateVisible = true
          this.$nextTick(() => {
            this.$refs.boxAddOrUpdate.init(this.selectshelfBoxItem.id)
          })
        } else {
          this.$message({
            message: '请先选择冻存盒，再编辑',
            type: 'warning'
          })
        }
      },
      positionEnableHandle () {
        if (!this.curPositionDisabledItem) {
          this.$message.error('当前位置未禁用，操作无效！')
          return false
        }
        this.$confirm('确定要启用此冻存架位置(' + this.selectShelfBoxRow + ', ' + this.selectShelfBoxColumn + ')吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [this.curPositionDisabledItem.id]
          forzenShelfPositionDiableApi.delete(ids).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '启用成功',
                type: 'success',
                duration: 200,
                onClose: () => {
                  this.curPositionDisabled = false
                  this.curPositionDisabledItem = null
                  this.getShelfPositionDisableByEquipmentId(this.selectShelfItem.equipmentId)
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      positionDisableHandle () {
        let disabledPosition = {
          id: 0,
          equipmentId: this.selectShelfItem.equipmentId,
          shelfId: this.selectShelfItem.id,
          rowNo: this.selectShelfBoxRow,
          columnNo: this.selectShelfBoxColumn
        }
        this.$confirm('确定要禁用此冻存架位置(' + this.selectShelfBoxRow + ', ' + this.selectShelfBoxColumn + ')吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          forzenShelfPositionDiableApi.save(disabledPosition).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '禁用成功',
                type: 'success',
                duration: 200,
                onClose: () => {
                  this.getShelfPositionDisableByEquipmentId(this.selectShelfItem.equipmentId)
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      openForzenBox () {
        if (this.selectshelfBoxItem) {
          let sampleId = ''
          if (this.selectSampleBoxItem && this.selectSampleBoxItem.id) {
            sampleId = this.selectSampleBoxItem.id
          }
          this.$router.push({
            path: '/biosample/samples-edit',
            query: {
              id: sampleId,
              boxId: this.selectshelfBoxItem.id
            }
          })
        } else {
          this.$message({
            message: '请选择冻存盒',
            type: 'warning'
          })
        }
      },
      showEditSampleHandle () {
        if (this.selectshelfBoxItem) {
          let sampleId = ''
          if (this.selectSampleBoxItem && this.selectSampleBoxItem.id) {
            sampleId = this.selectSampleBoxItem.id
          }
          // 传入子控件
          this.propParams.equipmentId = this.selectshelfBoxItem.equipmentId
          this.propParams.shelfId = this.selectshelfBoxItem.shelfId
          this.propParams.boxId = this.selectshelfBoxItem.id
          this.propParams.equipmentName = this.dataForm.name
          this.propParams.equipmentCode = this.dataForm.code
          this.propParams.shelfName = this.selectShelfItem.code
          this.propParams.equipmentTypeName = this.dataForm.equipmentTypeName
          this.propParams.equipmentGroupName = this.dataForm.equipmentGroupName
          this.propParams.shelfTypeName = this.selectshelfBoxItem.shelfTypeName
          this.propParams.boxTypeName = this.selectshelfBoxItem.boxTypeName
          this.propParams.boxCode = this.selectshelfBoxItem.code

          this.propParams.selectRow = this.selectSampleBoxRow
          this.propParams.selectColumn = this.selectSampleBoxColumn
          this.sampleAddOrUpdateVisible = true

          this.$nextTick(() => {
            this.$refs.sampleAddOrUpdate.init(sampleId)
          })
        } else {
          this.$message({
            message: '请选择冻存盒',
            type: 'warning'
          })
        }
      }
    },
    watch: {
      selectShelfItem (newValue, oldValue) {
        // 根据shelfId获取冻存盒列表
        // this.shelfBoxList
        this.selectShelfBoxRow = 1
        this.selectShelfBoxColumn = 1
        this.selectshelfBoxItem = null
        if (newValue) {
          this.shelfBoxRowNums = newValue.rowNums
          this.shelfBoxColumnNums = newValue.columnNums
          this.getBoxsByShelfId(newValue.id)
        } else {
          this.shelfBoxRowNums = 0
          this.shelfBoxColumnNums = 0
        }
        // 是否是不禁用位置
        let positionDisabled = this.getPositionDisableItemTmp(this.selectShelfBoxRow, this.selectShelfBoxColumn, newValue)
        if (positionDisabled) {
          this.curPositionDisabled = true
          this.curPositionDisabledItem = positionDisabled
        } else {
          this.curPositionDisabled = false
          this.curPositionDisabledItem = null
        }
      },
      shelfBoxRowNums (newValue, oldValue) {
        this.shelfBoxRowNumsAry = []
        for (let i = newValue; i > 0; i--) {
          this.shelfBoxRowNumsAry.push(i)
        }
      },
      selectshelfBoxItem (newValue, oldValue) {
        // 根据shelfId获取冻存盒列表
        // this.shelfBoxList
        this.selectSampleBoxRow = 1
        this.selectSampleBoxColumn = 1
        if (newValue) {
          this.sampleBoxRowNums = newValue.rowNums
          this.sampleBoxColumnNums = newValue.columnNums
          this.getSamplesByBoxId(newValue.id)
        } else {
          this.sampleBoxRowNums = 0
          this.sampleBoxColumnNums = 0
        }
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
