<template>
  <div>
    <el-dialog
      title="选择冻存架"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.key" placeholder="冻存架编码" clearable></el-input>
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
          prop="code"
          header-align="center"
          align="center"
          width="140px"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="shelfTypeName"
          header-align="center"
          align="center"
          width="140px"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="equipmentName"
          header-align="center"
          align="center"
          width="140px"
          label="容器名称">
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
          prop="barcode"
          header-align="center"
          align="center"
          width="140px"
          label="条形码">
        </el-table-column>
        <el-table-column
          prop="barcode2"
          header-align="center"
          align="center"
          width="140px"
          label="条形码2">
        </el-table-column>
        <el-table-column
          prop="hardcode"
          header-align="center"
          align="center"
          width="140px"
          label="硬件编码">
        </el-table-column>
        <!--<el-table-column
          prop="sampleType"
          header-align="center"
          align="center"
          width="160px"
          label="样本类型">
        </el-table-column>
        <el-table-column
          prop="createOn"
          header-align="center"
          align="center"
          width="140px"
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
        </el-table-column>-->
        <el-table-column
          prop="modifiedOn"
          header-align="center"
          align="center"
          width="140px"
          label="修改时间">
        </el-table-column>
        <!--<el-table-column
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
          width="140px"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="100"
          label="选择">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="selectShelf(scope.row)">选择</el-button>
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
  </div>
</template>

<script>
  import merge from 'lodash/merge'
  export default {
    props: {
      equipmentId: {
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
      selectShelf (shelfRow) {
        this.visible = false
        this.$emit('selectShelf', shelfRow)
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
        if (this.equipmentId) {
          params = merge(params, {'equipmentId': this.equipmentId})
        }
        this.$http({
          url: this.$http.adornUrl('/biosample/forzenshelf/list'),
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
            url: this.$http.adornUrl('/biosample/forzenshelf/delete'),
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
      }
    }
  }
</script>
