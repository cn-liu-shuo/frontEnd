<template>
  <div class="mod-config">
    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="类别">
        <span style="font-weight: bold; color: lightgreen">{{this.categoryName}}</span>
      </el-form-item>
      <el-form-item label="|">
        <el-input v-model="dataForm.key" placeholder="编码或名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('biosample:sysitemdetails:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('biosample:sysitemdetails:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <el-button v-if="isAuth('biosample:sysitemdetails:save')" @click="goback()">返回</el-button>
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
        prop="id"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="categoryId"
        header-align="center"
        align="center"
        label="分类ID">
      </el-table-column>
      <!--<el-table-column
        prop="parentId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>-->
      <el-table-column
        prop="itemCode"
        header-align="center"
        width="100px"
        align="center"
        label="编码">
      </el-table-column>
      <el-table-column
        prop="itemName"
        header-align="center"
        align="center"
        width="150px"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="itemValue"
        header-align="center"
        align="center"
        label="值">
      </el-table-column>
      <el-table-column
        prop="itemShortCode"
        header-align="center"
        align="center"
        label="简写码">
      </el-table-column>
      <el-table-column
        prop="enabled"
        header-align="center"
        align="center"
        label="是否可用">
        <template slot-scope="scope">
          <span v-if="scope.row.enabled == 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sortCode"
        header-align="center"
        align="center"
        label="排序码">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <!--<el-table-column
        prop="createdOn"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="modifiedOn"
        header-align="center"
        align="center"
        label="修改时间">
      </el-table-column>-->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
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
    <add-or-update v-if="addOrUpdateVisible" :categoryId="categoryId" :categoryName="categoryName" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './sysitemdetails-add-or-update'
  export default {
    data () {
      return {
        categoryId: 0,
        categoryName: '',
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
      this.categoryId = this.$route.query['categoryId']
      this.categoryName = this.$route.query['categoryName']
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/sysitemdetails/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key,
            'categoryId': this.categoryId
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
        if (!this.categoryId) {
          this.$message({
            message: '分类未确定，不能添加',
            type: 'warning',
            duration: 1500
          })
          return false
        }
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      goback () {
        this.$router.go(-1)
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
            url: this.$http.adornUrl('/biosample/sysitemdetails/delete'),
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
