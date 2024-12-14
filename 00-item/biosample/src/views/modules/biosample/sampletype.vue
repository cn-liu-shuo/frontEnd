<template>
  <div class="mod-config">
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('biosample:sampletype:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('biosample:sampletype:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :highlight-current-row="true"
      :data="dataList"
      border
      size="mini"
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
        label="ID">
      </el-table-column>-->
      <el-table-column
        prop="photo"
        header-align="center"
        align="center"
        label="样本图片">
        <template slot-scope="scope">
          <img v-if="scope.row.photo" style="width: 35px; height: 35px" :src="scope.row.photo"/>
          <img v-else style="width: 35px; height: 35px" src="static/img/biosample/null.png"/>
        </template>
      </el-table-column>
      <!--<el-table-column
        prop="mainId"
        header-align="center"
        align="center"
        label="模板ID">
      </el-table-column>-->
      <!--<el-table-column
        prop="mainName"
        header-align="center"
        align="center"
        label="模板名称">
      </el-table-column>-->
      <el-table-column
        prop="code"
        header-align="center"
        align="center"
        label="类型编码">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="类型名称">
      </el-table-column>
      <el-table-column
        prop="defaultCapacity"
        header-align="center"
        align="center"
        label="默认容量">
      </el-table-column>
      <el-table-column
        prop="unit"
        header-align="center"
        align="center"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="validityHours"
        header-align="center"
        width="110"
        align="center"
        label="有效期(小时)">
      </el-table-column>
      <el-table-column
        prop="waningHours"
        header-align="center"
        width="120"
        align="center"
        label="提前预警(小时)">
      </el-table-column>
      <el-table-column
        prop="subPackageNum"
        header-align="center"
        align="center"
        label="分装份数">
      </el-table-column>
      <el-table-column
        prop="subPackageCapacity"
        header-align="center"
        align="center"
        label="分装容量">
      </el-table-column>
      <el-table-column
        prop="sortCode"
        header-align="center"
        align="center"
        label="排序码">
      </el-table-column>
      <!--<el-table-column
        prop="photoType"
        header-align="center"
        align="center"
        label="样本图片">
      </el-table-column>-->
      <el-table-column
        prop="seriesNumber"
        header-align="center"
        align="center"
        label="序列号">
      </el-table-column>
      <el-table-column
        prop="createOn"
        header-align="center"
        width="140px"
        align="center"
        label="创建时间">
      </el-table-column>
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
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
  import AddOrUpdate from './sampletype-add-or-update'
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
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/sampletype/list'),
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
            url: this.$http.adornUrl('/biosample/sampletype/delete'),
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
