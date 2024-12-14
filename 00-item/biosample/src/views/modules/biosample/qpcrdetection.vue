<template>
  <div class="mod-config">
    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="样本编码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <!--<el-button @click="getDataList()">查询</el-button>-->
        <el-dropdown size="mini" split-button type="plain" @click="getDataList()" @command="handleQueryCommand">
          查询
          <el-dropdown-menu slot="dropdown" size="mini">
            <el-dropdown-item command="advQuery">高级查询</el-dropdown-item>
            <el-dropdown-item command="resetQuery">重置查询</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="applyHandle()" :disabled="!needApplyCnt">审核</el-button>
        <el-button type="plain" @click="redoHandle()" :disabled="!needApplyCnt">重做</el-button>
        <!--<el-button v-if="isAuth('biosample:qpcrdetection:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('biosample:qpcrdetection:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportExcel">导出EXCEL</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      :highlight-current-row="true"
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        fixed="left"
        width="50">
      </el-table-column>
      <el-table-column
        prop="sampleCode"
        header-align="center"
        align="center"
        width="140"
        label="样本编码">
      </el-table-column>
      <el-table-column
        prop="smn17"
        header-align="center"
        align="center"
        width="90"
        label="smn1_7数值">
        <template slot-scope="scope">
          <el-input size="mini" style="width:100%" v-if="!scope.row.status" v-model="scope.row.smn17" @change="saveQpcrDetection(scope.row)"></el-input>
          <span v-else>{{scope.row.smn17}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="qcValue17"
        header-align="center"
        align="center"
        width="90"
        label="smn1_7质控">
        <template slot-scope="scope">
          <el-input size="mini" style="width:100%" v-if="!scope.row.status" v-model="scope.row.qcValue17" @change="saveQpcrDetection(scope.row)"></el-input>
          <span v-else>{{scope.row.qcValue17}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="result17"
        header-align="center"
        align="center"
        width="90"
        label="smn1_7结果">
        <template slot-scope="scope">
          <div v-if="!scope.row.status">
            <el-tooltip v-if="scope.row.result17==2" effect="dark" content="点击切换结果" placement="top-start">
              <span  style="color: red" @click="result17ClickHandle(scope.row, 0)">纯合突变</span>
            </el-tooltip>
            <el-tooltip v-else-if="scope.row.result17==1" effect="dark" content="点击切换结果" placement="top-start">
              <span  style="color: red" @click="result17ClickHandle(scope.row, 2)">杂合突变</span>
            </el-tooltip>
            <el-tooltip  v-else effect="dark" content="点击切换结果" placement="top-start">
              <span @click="result17ClickHandle(scope.row, 1)">未突变</span>
            </el-tooltip>
          </div>
          <div v-if="scope.row.status">
            <span style="color: red" v-if="scope.row.result17==2">纯合突变</span>
            <span style="color: red" v-else-if="scope.row.result17==1">杂合突变</span>
            <span v-else>未突变</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="smn18"
        header-align="center"
        align="center"
        width="90"
        label="smn1_8数值">
        <template slot-scope="scope">
          <el-input size="mini" style="width:100%" v-if="!scope.row.status" v-model="scope.row.smn18" @change="saveQpcrDetection(scope.row)"></el-input>
          <span v-else>{{scope.row.smn18}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="qcValue18"
        header-align="center"
        align="center"
        width="90"
        label="smn1_8质控">
        <template slot-scope="scope">
          <el-input size="mini" style="width:100%" v-if="!scope.row.status" v-model="scope.row.qcValue18" @change="saveQpcrDetection(scope.row)"></el-input>
          <span v-else>{{scope.row.qcValue18}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="result18"
        header-align="center"
        align="center"
        width="90"
        label="smn1_8结果">
        <template slot-scope="scope">
          <div v-if="!scope.row.status">
            <el-tooltip effect="dark" content="点击切换结果" placement="top-start">
              <span v-if="scope.row.result18==2" style="color: red" @click="result18ClickHandle(scope.row, 0)">纯合突变</span>
              <span v-else-if="scope.row.result18==1" style="color: red" @click="result18ClickHandle(scope.row, 2)">杂合突变</span>
              <span v-else @click="result18ClickHandle(scope.row, 1)">未突变</span>
            </el-tooltip>
          </div>
          <div v-if="scope.row.status">
            <span style="color: red" v-if="scope.row.result18==2">纯合突变</span>
            <span style="color: red" v-else-if="scope.row.result18==1">杂合突变</span>
            <span v-else>未突变</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="qcValue"
        header-align="center"
        align="center"
        width="90"
        label="质控数值">
        <template slot-scope="scope">
          <el-input size="mini" style="width:100%" v-if="!scope.row.status" v-model="scope.row.qcValue" @change="saveQpcrDetection(scope.row)"></el-input>
          <span v-else>{{scope.row.qcValue}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="result"
        header-align="center"
        align="center"
        width="100"
        label="检测结果">
        <template slot-scope="scope">
          <div v-if="!scope.row.status">
            <el-tooltip effect="dark" content="点击切换结果" placement="top-start">
              <span v-if="scope.row.result==1" style="color: red" @click="resultClickHandle(scope.row, 0)">阳性</span>
              <span v-else @click="resultClickHandle(scope.row, 1)">阴性</span>
            </el-tooltip>
          </div>
          <div v-if="scope.row.status">
            <span style="color: red" v-if="scope.row.result==1">阳性</span>
            <span v-else>阴性</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="detectTime"
        header-align="center"
        align="center"
        width="150"
        label="检测时间">
      </el-table-column>

      <el-table-column
        prop="detectUser"
        header-align="center"
        align="center"
        width="90"
        label="检测人员">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        header-align="center"
        align="center"
        width="150"
        label="审核时间">
      </el-table-column>

      <el-table-column
        prop="applyUser"
        header-align="center"
        align="center"
        width="90"
        label="审核人">
      </el-table-column>

      <el-table-column
        fixed="right"
        prop="status"
        header-align="center"
        align="center"
        width="65px"
        label="状态">
        <template slot-scope="scope">
          <el-tooltip v-if="!scope.row.status" effect="light" content="点击审核" placement="top-start">
            <el-button type="text" @click="applyHandle(scope.row.id)">未审</el-button>
          </el-tooltip>
          <span style="color: lime" v-else-if="scope.row.status === 1">已审</span>
          <span style="color: lightcoral" v-else-if="scope.row.status === -1">不合格</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="redoCnt"
        header-align="center"
        align="center"
        width="90"
        label="重做次数">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="点击查看详细" placement="top-start">
            <el-button type="text" @click="showRedoDialog(scope.row.sampleId)">{{scope.row.redoCnt}}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        v-if="isAuth('biosample:qpcrdetection:supermodify')"
        fixed="right"
        header-align="center"
        align="center"
        width="60"
        label="操作">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" v-if="!scope.row.status && scope.row.id > 0">重做</el-button>-->
          <el-button v-if="scope.row.id" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <!--<el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!--高级查询-->
    <el-dialog
      title="高级查询"
      :visible.sync="queryDialogVisible">
      <el-form :model="dataForm" size="mini" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="样本编码">
              <el-input v-model="dataForm.sampleCode" placeholder="样本编码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检测结果">
              <el-select v-model="dataForm.result" placeholder="检测结果" style="width: 100%" clearable>
                <el-option
                  style="width: 100%"
                  v-for="item in resultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="smn17数值">
              <el-col :span="11">
                <el-input v-model="dataForm.smn17Start" placeholder="开始值"></el-input>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-input v-model="dataForm.smn17End" placeholder="结束值"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="smn17质控值">
              <el-col :span="11">
                <el-input v-model="dataForm.qcValue17Start" placeholder="开始值"></el-input>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-input v-model="dataForm.qcValue17End" placeholder="结束值"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="smn18数值">
              <el-col :span="11">
                <el-input v-model="dataForm.smn18Start" placeholder="开始值"></el-input>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-input v-model="dataForm.smn18End" placeholder="结束值"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="smn18质控值">
              <el-col :span="11">
                <el-input v-model="dataForm.qcValue18Start" placeholder="开始值"></el-input>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-input v-model="dataForm.qcValue18End" placeholder="结束值"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="smn_17结果">
              <el-select v-model="dataForm.result17" placeholder="smn_17结果" style="width: 100%" clearable>
                <el-option
                  style="width: 100%"
                  v-for="item in tbResultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="smn_18结果">
              <el-select v-model="dataForm.result18" placeholder="smn_18结果" style="width: 100%" clearable>
                <el-option
                  style="width: 100%"
                  v-for="item in tbResultOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="质控数值范围">
              <el-col :span="11">
                <el-input v-model="dataForm.qcValueStart" placeholder="开始值"></el-input>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-input v-model="dataForm.qcValueEnd" placeholder="结束值"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态">
              <el-select v-model="dataForm.status" placeholder="审核状态" style="width: 100%" clearable>
                <el-option
                  style="width: 100%"
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检测时间" prop="detectTime">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="开始时间" v-model="dataForm.detectTimeStart" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="结束时间" v-model="dataForm.detectTimeEnd" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核时间" prop="applyTime">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="开始时间" v-model="dataForm.applyTimeStart" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="结束时间" v-model="dataForm.applyTimeEnd" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检测人员">
              <el-input v-model="dataForm.detectUser" placeholder="检测人员" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核人">
              <el-input v-model="dataForm.applyUser" placeholder="审核人" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重做次数范围">
              <el-col :span="11">
                <el-input v-model="dataForm.redoCntStart" placeholder="开始值"></el-input>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-input v-model="dataForm.redoCntEnd" placeholder="结束值"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="resetQuery()">重置</el-button>
        <el-button size="mini" @click="queryDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="advanceQueryHandle()">查询</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <qpcr-detection-redo-dialog v-if="qpcrDetectionRedoDialogVisible" ref="qpcrDetectionRedoDialog"></qpcr-detection-redo-dialog>
  </div>
</template>

<script>
  import fileDownload from 'js-file-download'
  import timeUtil from '@/utils/timeUtil'
  import AddOrUpdate from './qpcrdetection-add-or-update'
  import QpcrDetectionRedoDialog from './qpcrdetection-redo-dialog'
  export default {
    data () {
      return {
        queryDialogVisible: false,
        tbResultOptions: [{
          value: 0,
          label: '未突变'
        }, {
          value: 1,
          label: '杂合突变'
        }, {
          value: 2,
          label: '纯合突变'
        }],
        resultOptions: [{
          value: 0,
          label: '阴性'
        }, {
          value: 1,
          label: '阳性'
        }],
        statusOptions: [{
          value: 0,
          label: '未审核'
        }, {
          value: 1,
          label: '审核通过'
        }, {
          value: -1,
          label: '审核未通过'
        }],
        dataForm: {
          key: '',
          sampleCOde: '',
          smn17Start: '',
          smn17End: '',
          qcValue17Start: '',
          qcValue17End: '',
          smn18Start: '',
          smn18End: '',
          qcValue18Start: '',
          qcValue18End: '',
          qcValueStart: '',
          qcValueEnd: '',
          detectTimeStart: '',
          detectTimeEnd: '',
          detectUser: '',
          applyTimeStart: '',
          applyTimeEnd: '',
          applyUser: '',
          redoCntStart: '',
          redoCntEnd: '',
          result17: '',
          result18: '',
          result: '',
          status: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        needApplyCnt: 0,
        addOrUpdateVisible: false,
        qpcrDetectionRedoDialogVisible: false
      }
    },
    components: {
      QpcrDetectionRedoDialog,
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      result17ClickHandle (row, resVal) {
        row.result17 = resVal
        this.saveQpcrDetection(row)
      },
      result18ClickHandle (row, resVal) {
        row.result18 = resVal
        this.saveQpcrDetection(row)
      },
      resultClickHandle (row, resVal) {
        row.result = resVal
        this.saveQpcrDetection(row)
      },
      saveQpcrDetection (row) {
        this.$http({
          url: this.$http.adornUrl(`/biosample/qpcrdetection/${!row.id ? 'save' : 'update'}`),
          method: 'post',
          data: this.$http.adornData({
            'id': row.id || undefined,
            'sampleId': row.sampleId,
            'sampleCode': row.sampleCode,
            'smn17': row.smn17,
            'qcValue17': row.qcValue17,
            'result17': row.result17,
            'smn18': row.smn18,
            'qcValue18': row.qcValue18,
            'result18': row.result18,
            'qcValue': row.qcValue,
            'result': row.result,
            'extractTime': timeUtil.formatDate(row.extractTime == null ? new Date() : row.extractTime),
            'extractUserId': row.extractUserId,
            'extractUser': row.extractUser,
            'applyTime': timeUtil.formatDate(row.applyTime == null ? new Date('1970-01-01') : row.applyTime),
            'applyUserId': row.applyUserId,
            'applyUser': row.applyUser,
            'createOn': timeUtil.formatDate(row.createOn == null ? new Date() : row.createOn),
            'createUserId': row.createUserId,
            'createBy': row.createBy,
            'modifiedOn': timeUtil.formatDate(row.modifiedOn == null ? new Date() : row.modifiedOn),
            'modifiedUserId': row.modifiedUserId,
            'modifiedBy': row.modifiedBy,
            'status': row.status,
            'deleted': row.deleted
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getDataList()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      handleQueryCommand (command) {
        if (command === 'advQuery') {
          // 弹出高级查询窗口
          this.queryDialogVisible = true
        }
        if (command === 'resetQuery') {
          this.resetQuery()
        }
      },
      resetQuery () {
        this.dataForm = {
          key: '',
          sampleCOde: '',
          smn17Start: '',
          smn17End: '',
          qcValue17Start: '',
          qcValue17End: '',
          smn18Start: '',
          smn18End: '',
          qcValue18Start: '',
          qcValue18End: '',
          qcValueStart: '',
          qcValueEnd: '',
          detectTimeStart: '',
          detectTimeEnd: '',
          detectUser: '',
          applyTimeStart: '',
          applyTimeEnd: '',
          applyUser: '',
          redoCntStart: '',
          redoCntEnd: '',
          result17: '',
          result18: '',
          result: '',
          status: ''
        }
        this.getDataList()
      },
      exportExcel () {
        this.$http({
          url: this.$http.adornUrl('/biosample/qpcrdetection/export-excel-qpcrdetection'),
          method: 'get',
          responseType: 'blob',
          withCredentials: false,
          params: this.dataForm
        }).then(response => {
          let blob = new Blob([response.data], {
            type: 'application/vnd.ms-excel'
          })
          fileDownload(blob, 'QPCR检测' + Date.parse(new Date()) + '.xlsx')
        })
      },
      advanceQueryHandle () {
        this.queryDialogVisible = false
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataForm.page = this.pageIndex
        this.dataForm.limit = this.pageSize
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/qpcrdetection/detect-list'),
          method: 'get',
          params: this.dataForm
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
        this.needApplyCnt = 0
        for (let idx in this.dataListSelections) {
          if (this.dataListSelections[idx].status < 1) {
            this.needApplyCnt += 1
          }
        }
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 审核
      applyHandle (id) {
        let ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '审核' : '批量审核'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/qpcrdetection/apply'),
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
                    this.getDataList()
                  }
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 重做
      redoHandle (id) {
        let ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '重做' : '重做'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/qpcrdetection/redo'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功，(' + data.operCnt + ')个',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  if (data.operCnt) {
                    this.getDataList()
                  }
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/qpcrdetection/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 弹出框
      showRedoDialog (sampleId) {
        this.qpcrDetectionRedoDialogVisible = true
        this.$nextTick(() => {
          this.$refs.qpcrDetectionRedoDialog.init(sampleId)
        })
      }
    }
  }
</script>
