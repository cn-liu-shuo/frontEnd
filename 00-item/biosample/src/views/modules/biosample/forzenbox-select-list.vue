<template>
  <el-dialog
    title="选择冻存盒"
    :close-on-click-modal="false"
    :visible.sync="visible">

    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="冻存盒编码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.rowNo" placeholder="行" style="width: 50px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.columnNo" placeholder="列" style="width: 50px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :highlight-current-row="true"
      size="mini"
      :data="dataList"
      highlight-current-row
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="shelfName"
        header-align="center"
        align="center"
        label="冻存架">
      </el-table-column>
      <el-table-column
        prop="rowNo"
        header-align="center"
        align="center"
        label="第X行">
      </el-table-column>
      <el-table-column
        prop="columnNo"
        header-align="center"
        align="center"
        label="第Y列">
      </el-table-column>
      <el-table-column
        prop="boxTypeName"
        header-align="center"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="code"
        header-align="center"
        align="center"
        width="160px"
        label="冻存盒编码">
      </el-table-column>
      <el-table-column
        prop="rowNums"
        header-align="center"
        align="center"
        label="行数">
      </el-table-column>
      <el-table-column
        prop="columnNums"
        header-align="center"
        align="center"
        label="列数">
      </el-table-column>
      <el-table-column
        prop="equipmentName"
        header-align="center"
        align="center"
        width="200px"
        label="冰箱">
      </el-table-column>
      <el-table-column
        prop="barcode"
        width="160px"
        header-align="center"
        align="center"
        label="条形码">
      </el-table-column>
      <el-table-column
        prop="barcode2"
        width="160px"
        header-align="center"
        align="center"
        label="二维码">
      </el-table-column>
      <el-table-column
        prop="hardwareOde"
        header-align="center"
        width="160px"
        align="center"
        label="硬件编码">
      </el-table-column>
      <!--<el-table-column
        prop="sampleTypes"
        header-align="center"
        align="center"
        width="200px"
        label="样本类型">
      </el-table-column>
      <el-table-column
        prop="createOn"
        header-align="center"
        align="center"
        width="160px"
        label="创建时间">
      </el-table-column>-->
      <!--<el-table-column
        prop="createUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="modifiedOn"
        header-align="center"
        align="center"
        width="160px"
        label="修改时间">
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
        prop="remark"
        header-align="center"
        align="center"
        width="160px"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="selectBox(scope.row)">选择</el-button>
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
      small
      layout="prev, pager, next">
    </el-pagination>

  </el-dialog>
</template>

<script>
  import merge from 'lodash/merge'
  export default {
    props: {
      shelfId: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        visible: false,
        dataForm: {
          key: '',
          rowNo: '',
          columnNo: ''
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
    methods: {
      init () {
        this.visible = true
        this.getDataList()
      },
      selectBox (boxRow) {
        this.visible = false
        this.$emit('selectBox', boxRow)
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        let params = this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key,
          'rowNo': this.dataForm.rowNo,
          'columnNo': this.dataForm.columnNo
        })
        if (this.shelfId) {
          params = merge(params, {'shelfId': this.shelfId})
        }
        this.$http({
          url: this.$http.adornUrl('/biosample/forzenbox/list'),
          method: 'get',
          params: params
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
      }
    }
  }
</script>
