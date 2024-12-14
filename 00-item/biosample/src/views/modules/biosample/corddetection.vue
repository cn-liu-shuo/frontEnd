<template>
  <div class="mod-config">
    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-dropdown size="mini" split-button type="plain" @click="getDataList()" @command="handleQueryCommand">
          查询
          <el-dropdown-menu slot="dropdown" size="mini">
            <el-dropdown-item command="advQuery">高级查询</el-dropdown-item>
            <el-dropdown-item command="resetQuery">重置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="applyHandle()">审核</el-button>
        <!--<el-button v-if="isAuth('biosample:corddetection:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('biosample:corddetection:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      :highlight-current-row="true"
      border
      size="mini"
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
        width="120"
        label="样本编码">
      </el-table-column>
      <el-table-column
        prop="sampleTypeName"
        header-align="center"
        align="center"
        width="120"
        label="样本类型">
      </el-table-column>
      <el-table-column
        prop="idCard"
        header-align="center"
        align="center"
        width="160"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        width="90"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="collectAddressName"
        header-align="center"
        align="center"
        width="140"
        label="采集地点">
      </el-table-column>
      <el-table-column
        prop="receiveDate"
        header-align="center"
        align="center"
        width="140"
        label="采集时间">
      </el-table-column>
      <el-table-column
        prop="cd105"
        header-align="center"
        align="center"
        label="CD105">
        <template slot-scope="scope">
          {{scope.row.cd105 ? scope.row.cd105 + '%' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="cd90"
        header-align="center"
        align="center"
        label="CD90">
        <template slot-scope="scope">
          {{scope.row.cd90 ? scope.row.cd90 + '%' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="cd73"
        header-align="center"
        align="center"
        label="CD73">
        <template slot-scope="scope">
          {{scope.row.cd73 ? scope.row.cd73 + '%' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="cd34"
        header-align="center"
        align="center"
        label="CD34">
        <template slot-scope="scope">
          {{scope.row.cd34 ? scope.row.cd34 + '%' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="hlaDr"
        header-align="center"
        align="center"
        label="HLA-DR">
        <template slot-scope="scope">
          {{scope.row.hlaDr ? scope.row.hlaDr + '%' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="cellNum"
        header-align="center"
        align="center"
        width="120px"
        label="细胞冻存数量">
        <template slot-scope="scope">
          {{scope.row.cellNum ? scope.row.cellNum + '*10^7' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="cellLiveNum"
        header-align="center"
        align="center"
        width="120px"
        label="冻存前细胞活率">
        <template slot-scope="scope">
          {{scope.row.cellLiveNum ? scope.row.cellLiveNum + '%' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="hbs"
        header-align="center"
        align="center"
        width="150px"
        label="乙肝表面抗原(HbsAg)">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.hbs==1">阳性</span>
          <span v-if="scope.row.hbs==0">阴性</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="hcv"
        header-align="center"
        align="center"
        width="150px"
        label="丙肝抗体(Anti-HCV)">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.hcv==1">阳性</span>
          <span v-if="scope.row.hcv==0">阴性</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="hiv"
        header-align="center"
        align="center"
        width="150px"
        label="艾滋病抗体Anti-HIV">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.hiv==1">阳性</span>
          <span v-if="scope.row.hiv==0">阴性</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tp"
        header-align="center"
        align="center"
        width="150px"
        label="梅毒抗体(Anti-TP)">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.tp==1">阳性</span>
          <span v-if="scope.row.tp==0">阴性</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="bigCell"
        header-align="center"
        align="center"
        width="150px"
        label="巨细胞病毒抗体">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.bigCell==1">阳性</span>
          <span v-if="scope.row.bigCell==0">阴性</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="germ"
        header-align="center"
        align="center"
        width="100px"
        label="细菌/真菌">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.germ==1">阳性</span>
          <span v-if="scope.row.germ==0">阴性</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mycoplama"
        header-align="center"
        align="center"
        label="支原体">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.mycoplama==1">阳性</span>
          <span v-if="scope.row.mycoplama==0">阴性</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="alt"
        header-align="center"
        align="center"
        label="ALT">
        <template slot-scope="scope">
          {{scope.row.alt ? scope.row.alt + ' U/L' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="detectTime"
        header-align="center"
        align="center"
        width="150px"
        label="检测时间">
      </el-table-column>
      <el-table-column
        prop="detectUser"
        header-align="center"
        align="center"
        label="检测人">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        header-align="center"
        align="center"
        width="150px"
        label="审批时间">
      </el-table-column>
      <el-table-column
        prop="applyUser"
        header-align="center"
        align="center"
        label="审批人">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="status"
        header-align="center"
        align="center"
        width="60"
        label="状态">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="点击审批" placement="top-start">
            <el-button type="text" v-if="scope.row.status === 0 && scope.row.id" @click="applyHandle(scope.row.id)">未审</el-button>
          </el-tooltip>
          <span v-if="!scope.row.status && !scope.row.id">未审</span>
          <span style="color: lime" v-if="scope.row.status === 1">已审</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="60"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="!scope.row.status" @click="cordDetectionEdit(scope.row.id, scope.row.sampleId)">编辑</el-button>
          <el-button type="text" size="small" v-if="scope.row.status > 0" @click="cordDetectionEdit(scope.row.id, scope.row.sampleId)">详情</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './corddetection-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        queryDialogVisible: false
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
          this.dataForm = {
            key: ''
          }
          this.getDataList()
        }
      },
      advanceQueryHandle () {
        this.queryDialogVisible = false
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/corddetection/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
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
      cordDetectionEdit (id, sampleId) {
        let queryId = id || 0
        this.$router.push({path: '/biosample/corddetection-edit', query: { id: queryId, sampleId: sampleId }})
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
            url: this.$http.adornUrl('/biosample/corddetection/delete'),
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
      applyHandle (id) {
        let ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        if (!ids || ids.length <= 0) {
          this.$message.error('请选择检测后的记录审核')
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
                    this.getDataList()
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
