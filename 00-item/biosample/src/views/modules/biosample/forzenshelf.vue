<style lang="scss" scoped>

</style>

<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-input size="mini" v-model="queryInfo.page.key" placeholder="参数名" clearable></el-input>
      </el-col>
      <el-col :span="20">
        <el-button size="mini" @click="lsOnSearch()">查询</el-button>
        <el-button size="mini" type="primary" @click="lsOpenforzenshelfAddOrUpdate()">新增</el-button>
        <el-button size="mini" type="danger" :disabled="multipleSelection.length === 0" @click="lsBatchDelete()">批量删除</el-button>
      </el-col>
    </el-row>
    <el-row style="margin: 20px 0;">
      <el-col :span="24">
        <el-table v-loading="loading" size="mini" ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="equipmentName" label="设备" width="160" align="center">
          </el-table-column>
          <el-table-column prop="code" label="编码" width="140" align="center">
          </el-table-column>
          <el-table-column prop="shelfTypeName" label="规格" width="160" align="center">
          </el-table-column>
          <el-table-column prop="rowNums" label="行数" align="center">
          </el-table-column>
          <el-table-column prop="columnNums" label="列数" align="center">
          </el-table-column>
          <el-table-column prop="rowNo" label="第X行" align="center">
          </el-table-column>
          <el-table-column prop="columnNo" label="第Y列" align="center">
          </el-table-column>
          <el-table-column prop="barcode" label="条形码" width="140" align="center">
          </el-table-column>
          <el-table-column prop="hardcode" label="硬件编码" width="140" align="center">
          </el-table-column>
          <el-table-column prop="createOn" label="创建时间" width="140" align="center">
          </el-table-column>
          <el-table-column prop="modifieOn" label="修改时间" width="140" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="140" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="lsOpenforzenshelfAddOrUpdate(scope.row.id)">修改</el-button>
              <el-button size="mini" type="text" @click="lsBatchDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="text-align: right;">
      <el-col :span="24">
        <pagination :total="queryInfo.page.total" :currentPage="queryInfo.page.page" :pageSize="queryInfo.page.limit" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination>
      </el-col>
    </el-row>
    <forzenshelf-add-or-update v-if="forzenshelfAddOrUpdateVisible" ref="forzenshelfAddOrUpdateRef" @refresh="lsGetTableList"></forzenshelf-add-or-update>
  </div>
</template>

<script>
import forzenshelf from '../../../api/forzenshelf'
import forzenshelfAddOrUpdate from './forzenshelf-add-or-update.vue'
import pagination from '../../../components/pagination'
export default {
  components: {
    forzenshelfAddOrUpdate,
    pagination
  },
  data () {
    return {
      loading: false,
      tableData: [],
      multipleSelection: [],
      forzenshelfAddOrUpdateVisible: false,
      queryInfo: {
        page: {
          total: 0,
          page: 1,
          limit: 10,
          key: ''
        }
      }
    }
  },
  created () {
    this.lsGetTableList()
  },
  methods: {
    lsGetTableList () {
      this.loading = true
      forzenshelf.lsGetShelfForzenList(this.queryInfo.page).then(({data}) => {
        if (data.code === 0) {
          this.tableData = data.page.list
          this.queryInfo.page.total = data.page.totalCount
          this.loading = false
        }
      })
    },
    // 查询
    lsOnSearch () {
      this.lsGetTableList()
    },
    // 新增/修改
    lsOpenforzenshelfAddOrUpdate (id) {
      this.forzenshelfAddOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.forzenshelfAddOrUpdateRef.lsInit(id)
      })
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除/删除
    lsBatchDelete (id) {
      let ids = id ? [id] : []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id)
      }
      this.$confirm(`确定对[id=${ids}]进行${id ? '删除' : '批量删除'}操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        forzenshelf.lsDelShelfForzen(ids).then(({data}) => {
          if (data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.lsGetTableList()
          }
        })
      }).catch(() => {
        ids = []
        this.multipleSelection = []
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (val) {
      this.queryInfo.page.page = val
      this.lsGetTableList()
    },
    handleSizeChange (val) {
      this.queryInfo.page.limit = val
      this.queryInfo.page.page = 1
      this.lsGetTableList()
    }
  }
}
</script>