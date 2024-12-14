<template>
  <el-dialog
    title="选择样本采集"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" size="mini">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      size="mini"
      style="width: 100%;">
      <el-table-column
        prop="sampleCode"
        header-align="center"
        align="center"
        width="120"
        label="样本编码">
      </el-table-column>

      <!-- <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="样本名称">
      </el-table-column> -->
      <!-- <el-table-column
        prop="samplingOrgan"
        header-align="center"
        align="center"
        label="组织器官">
      </el-table-column>
      <el-table-column
        prop="samplingSite"
        header-align="center"
        align="center"
        label="取材部位">
      </el-table-column> -->
      <el-table-column
        prop="sourceName"
        header-align="center"
        align="center"
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
      <!-- <el-table-column
        prop="serialNum"
        header-align="center"
        align="center"
        width="100"
        label="设备序列号">
      </el-table-column> -->
      <el-table-column
        prop="sex"
        header-align="center"
        align="center"
        label="性别">
        <template  slot-scope="scope">
          <span v-if="scope.row.sex === 1">男</span>
          <span v-if="scope.row.sex === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sourceIdCard"
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
      <!--<el-table-column
        prop="email"
        header-align="center"
        align="center"
        width="180"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="nation"
        header-align="center"
        align="center"
        label="民族">
      </el-table-column>-->
      <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        width="140"
        label="录入人员">
      </el-table-column>

      <el-table-column
        prop="createOn"
        header-align="center"
        align="center"
        width="140"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="applyUser"
        header-align="center"
        align="center"
        width="140"
        label="审核人">
      </el-table-column>
      <el-table-column
        prop="sampleTypeName"
        header-align="center"
        align="center"
        label="样本类型">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="status"
        header-align="center"
        align="center"
        width="70"
        label="状态">
        <template slot-scope="scope">
          <el-tooltip effect="light" content="点击审核入库" placement="top-start">
            <el-button type="text" v-if="scope.row.status === 0" @click="applyInStockHandle(scope.row.id)"><span style="color: #000000">未审</span></el-button>
          </el-tooltip>
          <span style="color: lime" v-if="scope.row.status === 1">已审</span>
          <span style="color: green" v-if="scope.row.status === 2">已审入库</span>
          <span style="color: lightcoral" v-if="scope.row.status === -1">未通过</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="70"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="selectSamplesList(scope.row)">选择</el-button>
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
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
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
        equipmentSelectListVisible: false
      }
    },

    methods: {
      init () {
        this.visible = true
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/samples/select-list'),
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
      selectSamplesList (row) {
        this.visible = false
        this.$emit('selectSamplesList', row)
      }
    }
  }
</script>
