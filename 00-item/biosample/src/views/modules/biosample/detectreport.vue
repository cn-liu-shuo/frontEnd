<template>
  <div class="mod-config">
    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="样本编码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-dropdown size="mini" split-button type="plain" @click="getDataList()" @command="handleQueryCommand">
          查询
          <el-dropdown-menu slot="dropdown" size="mini">
            <el-dropdown-item command="advQuery">高级查询</el-dropdown-item>
            <el-dropdown-item command="resetQuery">重置查询</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-if="isAuth('biosample:detectreport:save')" type="primary" @click="addOrUpdateHandle()">新增报告</el-button>
        <el-button v-if="isAuth('biosample:detectreport:save')" type="plain" @click="saveBatchDetectReport()">批量生成</el-button>
        <el-button v-if="isAuth('biosample:detectreport:save')" type="plain" @click="applyBatchHandle()">批量审批</el-button>
        <!--<el-button v-if="isAuth('biosample:detectreport:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportExcel">导出EXCEL</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportReport">导出报告</el-button>
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
        width="50">
      </el-table-column>

      <el-table-column
        prop="sampleCode"
        header-align="center"
        align="center"
        width="120"
        label="样本编码">
      </el-table-column>

      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        header-align="center"
        align="center"
        label="性别">
        <template  slot-scope="scope">
          <span v-if="scope.row.sex == 1">男</span>
          <span v-if="scope.row.sex == 2">女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        header-align="center"
        align="center"
        width="160"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="age"
        header-align="center"
        align="center"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="telephone"
        header-align="center"
        width="120"
        align="center"
        label="联系电话">
      </el-table-column>

      <el-table-column
        prop="reportTime"
        header-align="center"
        align="center"
        width="140px"
        label="生成时间">
      </el-table-column>
     <!-- <el-table-column
        prop="reportUserId"
        header-align="center"
        align="center"
        label="报告生成人ID">
      </el-table-column>-->
      <el-table-column
        prop="reportUser"
        header-align="center"
        align="center"
        label="生成人">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        header-align="center"
        align="center"
        width="140px"
        label="审批时间">
      </el-table-column>
      <!--<el-table-column
        prop="applyUserId"
        header-align="center"
        align="center"
        label="报告审批人ID">
      </el-table-column>-->
      <el-table-column
        prop="applyUser"
        header-align="center"
        align="center"
        label="审批人">
      </el-table-column>
      <el-table-column
        prop="sampleTypeName"
        header-align="center"
        align="center"
        label="样本类型">
      </el-table-column>
      <!--<el-table-column
        prop="createOn"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="createUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="modifiedOn"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="modifiedUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="modifiedBy"
        header-align="center"
        align="center"
        label="">
      </el-table-column>-->
      <el-table-column
        fixed="right"
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <span style="color: lime" v-if="scope.row.status === 1">已生成</span>
          <span style="color: green" v-if="scope.row.status === 2">已审核</span>
          <span style="color: lightcoral" v-if="scope.row.status === -1">不合格</span>
          <span v-if="scope.row.status === null">未生成</span>
        </template>
      </el-table-column>
      <!--<el-table-column
        prop="deleted"
        header-align="center"
        align="center"
        label="是否删除 0未删除 1删除">
      </el-table-column>-->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="70"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="addOrUpdateHandle(scope.row.sampleCode)">详情</el-button>
          <!--<el-button type="text" size="small" v-if="scope.row.status === 1 && scope.row.id > 0" @click="applyHandle(scope.row.id)">审核</el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>-->
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
            <el-form-item label="类型名称">
              <el-input v-model="dataForm.sampleTypeName" placeholder="类型名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="dataForm.sourceName" placeholder="姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="dataForm.sex" placeholder="性别" style="width: 100%" clearable>
                <el-option :key="1" label="男" :value=1></el-option>
                <el-option :key="2" label="女" :value=2></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input v-model="dataForm.sourceIdCard" placeholder="身份证号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄范围">
              <el-col :span="11">
                <el-input v-model="dataForm.ageStart" placeholder="开始年龄"></el-input>
              </el-col>
              <el-col class="line" :span="2"> -</el-col>
              <el-col :span="11">
                <el-input v-model="dataForm.ageEnd" placeholder="结束年龄"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="dataForm.telephone" placeholder="联系电话" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生成人">
              <el-input v-model="dataForm.reportUser" placeholder="生成人" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批人">
              <el-input v-model="dataForm.applyUser" placeholder="审批人" clearable></el-input>
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
            <el-form-item label="生成时间" prop="reportTime">
              <el-col :span="11">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间" v-model="dataForm.reportTimeStart" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束时间" v-model="dataForm.reportTimeEnd" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审批时间" prop="applyTime">
              <el-col :span="11">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间" v-model="dataForm.applyTimeStart" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束时间" v-model="dataForm.applyTimeEnd" style="width: 100%;"></el-date-picker>
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
  </div>
</template>

<script>
  import fileDownload from 'js-file-download'
  import AddOrUpdate from './detectreport-detail'
  import timeUtil from '@/utils/timeUtil'
  export default {
    data () {
      return {
        queryDialogVisible: false,
        statusOptions: [{
          value: 1,
          label: '报告生成'
        }, {
          value: 2,
          label: '审核通过'
        }, {
          value: -1,
          label: '审核未通过'
        }],
        dataForm: {
          key: '',
          sampleCode: '',
          sampleTypeName: '',
          sourceName: '',
          sourceIdCard: '',
          telephone: '',
          status: '',
          sex: '',
          ageStart: '',
          ageEnd: '',
          reportUser: '',
          applyUser: '',
          reportTimeStart: '',
          reportTimeEnd: '',
          applyTimeStart: '',
          applyTimeEnd: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
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
          sampleCode: '',
          sampleTypeName: '',
          sourceName: '',
          sourceIdCard: '',
          telephone: '',
          status: '',
          sex: '',
          ageStart: '',
          ageEnd: '',
          reportUser: '',
          applyUser: '',
          reportTimeStart: '',
          reportTimeEnd: '',
          applyTimeStart: '',
          applyTimeEnd: ''
        }
        this.getDataList()
      },
      exportExcel () {
        this.$http({
          url: this.$http.adornUrl('/biosample/detectreport/export-excel-detectreport'),
          method: 'get',
          responseType: 'blob',
          withCredentials: false,
          params: this.dataForm
        }).then(response => {
          let blob = new Blob([response.data], {
            type: 'application/vnd.ms-excel'
          })
          fileDownload(blob, '检测报告列表' + Date.parse(new Date()) + '.xlsx')
        })
      },
      exportReport (id) {
        var ids = this.dataListSelections
        for (let i in ids) {
          if (!ids[i].id || ids[i].status !== 2) {
            this.$message.error(ids[i].sampleCode + '还未生成报告或未审核！')
            continue
          }
          this.$http({
            url: this.$http.adornUrl('/biosample/detectreport/export-word-detectreport/' + ids[i].id),
            method: 'get',
            responseType: 'blob',
            withCredentials: false
          }).then(response => {
            let blob = new Blob([response.data], {
              type: 'application/vnd.ms-word'
            })
            fileDownload(blob, '检测报告' + ids[i].sampleCode + '.docx')
          })
        }
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
          url: this.$http.adornUrl('/biosample/detectreport/list'),
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
        this.$confirm(`确定通过审核吗?`, '审核提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/detectreport/apply/' + id),
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '审核成功',
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
            url: this.$http.adornUrl('/biosample/detectreport/delete'),
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
      // 审核
      applyBatchHandle () {
        let ids = this.dataListSelections.map(item => {
          return item.id
        })
        if (ids.length <= 0) {
          this.$message.warning('未选中可以生成的记录, 请选择！')
          return false
        }
        this.$confirm(`确定批量审核吗?`, '审核提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/detectreport/apply-batch'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '审核成功（' + data.cnt + '个)',
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
      saveBatchDetectReport () {
        let datas = []
        for (let idx in this.dataListSelections) {
          let row = this.dataListSelections[idx]
          if (row.id) { // 已生成的不再修改
            continue
          }
          datas.push({
            'id': row.id || undefined,
            'sampleId': row.sampleId,
            'sampleCode': row.sampleCode,
            'reportTime': timeUtil.formatDate(row.reportTime == null ? new Date() : row.extractTime),
            'reportUserId': row.reportUserId,
            'reportUser': row.reportUser,
            'applyTime': timeUtil.formatDate(row.applyTime == null ? new Date() : row.applyTime),
            'applyUserId': row.applyUserId,
            'applyUser': row.applyUser,
            'createOn': timeUtil.formatDate(row.createOn == null ? new Date() : row.createOn),
            'createUserId': row.createUserId,
            'createBy': row.createBy,
            'modifiedOn': timeUtil.formatDate(row.modifiedOn == null ? new Date() : row.modifiedOn),
            'modifiedUserId': row.modifiedUserId,
            'modifiedBy': row.modifiedBy,
            'status': row.status,
            'deleted': 0
          })
        }
        if (datas.length <= 0) {
          this.$message.warning('未选中可以生成的记录, 请选择！')
          return false
        }
        this.$confirm('确定批量生成吗(' + datas.length + '个)?', '生成提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/detectreport/save-batch'),
            method: 'post',
            data: this.$http.adornData(datas, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.getDataList()
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
