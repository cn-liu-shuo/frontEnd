<template>
  <el-dialog
    title="重做记录列表"
    :close-on-click-modal="false"
    :visible.sync="visible">

    <el-table
      :data="dataList"
      size="mini"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
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
      </el-table-column>
      <el-table-column
        prop="qcValue17"
        header-align="center"
        align="center"
        width="90"
        label="smn1_7质控">
      </el-table-column>
      <el-table-column
        prop="result17"
        header-align="center"
        align="center"
        width="90"
        label="smn1_7结果">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.result17==2">纯合突变</span>
          <span style="color: red" v-else-if="scope.row.result17==1">杂合突变</span>
          <span v-else>未突变</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="smn18"
        header-align="center"
        align="center"
        width="90"
        label="smn1_8数值">
      </el-table-column>
      <el-table-column
        prop="qcValue18"
        header-align="center"
        align="center"
        width="90"
        label="smn1_8质控">
      </el-table-column>
      <el-table-column
        prop="result18"
        header-align="center"
        align="center"
        width="90"
        label="smn1_8结果">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.result18==2">纯合突变</span>
          <span style="color: red" v-else-if="scope.row.result18==1">杂合突变</span>
          <span v-else>未突变</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="qcValue"
        header-align="center"
        align="center"
        width="90"
        label="质控数值">
      </el-table-column>
      <el-table-column
        prop="result"
        header-align="center"
        align="center"
        width="100"
        label="检测结果">
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.result==1">阳性</span>
          <span v-else>阴性</span>
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
          <span v-if="!scope.row.status">未审</span>
          <span style="color: lime" v-else-if="scope.row.status === 1">已审</span>
          <span style="color: lightcoral" v-else-if="scope.row.status === -1">不合格</span>
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
      layout="total, prev, pager, next">
    </el-pagination>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false
      }
    },
    methods: {
      init (sampleId) {
        this.visible = true
        this.$nextTick(() => {
          this.getDataList(sampleId)
        })
      },
      // 获取数据列表
      getDataList (sampleId) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/qpcrdetectionredo/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'sampleId': sampleId
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
      }
    }
  }
</script>
