<template>
  <el-dialog
    title="选择冻存盒规格"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      :data="dataList"
      highlight-current-row
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <!--<el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="">
      </el-table-column>-->
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="encodingType"
        header-align="center"
        align="center"
        label="位置编码">
        <template slot-scope="scope">
          <span v-if="scope.row.encodingType == 1">纯数字</span>
          <span v-if="scope.row.encodingType == 2">混合</span>
        </template>
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
        prop="width"
        header-align="center"
        align="center"
        label="宽度">
      </el-table-column>
      <el-table-column
        prop="height"
        header-align="center"
        align="center"
        label="高度">
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
        label="">
      </el-table-column>
      <el-table-column
        prop="modifiedOn"
        header-align="center"
        align="center"
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
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="90"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="selectBoxType(scope.row)">选择</el-button>
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
        addOrUpdateVisible: false
      }
    },
    methods: {
      init () {
        this.visible = true
        this.getDataList()
      },
      selectBoxType (boxTypeRow) {
        this.visible = false
        this.$emit('selectBoxType', boxTypeRow)
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/forzenboxtype/list'),
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
      }
    }
  }
</script>
