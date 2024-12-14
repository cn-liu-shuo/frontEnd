<template>
  <div class="mod-config">
    <div>
      <span style="float: left; margin-top: -10px">
        <el-button type="text" @click="goPreLevel" v-if="parentId > 0">上一级</el-button>
        <el-button type="text" disabled v-else>上一级</el-button>
      </span>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" style="float: right; margin-top: -10px" size="mini">
        <el-form-item>
          <el-input v-model="dataForm.key" placeholder="参数名" clearable suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item>
          <!--<el-button @click="getDataList()">查询</el-button>-->
          <el-dropdown v-if="isAuth('catalog:filecatalog:save')" @command="handleCreateCommand">
            <el-button type="primary" icon="el-icon-plus">
              新建<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="folder" icon="el-icon-folder"> 文件夹 </el-dropdown-item>
              <el-dropdown-item command="file" divided icon="el-icon-document"> 文件 </el-dropdown-item>
              <el-dropdown-item command="word" icon="el-icon-document"> Word </el-dropdown-item>
              <el-dropdown-item command="excel" icon="el-icon-document"> Excel </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<el-button v-if="isAuth('catalog:filecatalog:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
          <el-button v-if="isAuth('catalog:filecatalog:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="dataList"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      size="mini"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>

      <el-table-column
        prop="fileName"
        header-align="center"
        align="left"
        label="文件名">
        <template slot-scope="scope">
          <el-button icon="el-icon-folder" @click="getDataList(scope.row.id)" type="text" v-if="scope.row.fileType=='1'"> {{scope.row.fileName}}</el-button>
          <el-link :underline="false" icon="el-icon-document" type="success" :href="scope.row.fileUrl" target="_blank" v-else> {{scope.row.fileName}} </el-link>
        </template>
      </el-table-column>

      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="修改时间">
      </el-table-column>
      <el-table-column
        prop="lastModifier"
        header-align="center"
        align="center"
        label="最后修改人">
      </el-table-column>
      <el-table-column
        prop="fileSize"
        header-align="center"
        align="center"
        label="文件大小">
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addFolderHandle(scope.row.id)" v-if="scope.row.fileType=='1'">修改</el-button>
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
    <!--<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
    <add-folder v-if="addFolderVisible" ref="addFolder" @refreshDataList="getDataList"></add-folder>
    <add-file v-if="addFileVisible" ref="addFile" @refreshDataList="getDataList"></add-file>
  </div>
</template>

<script>
  import addFolder from './add-folder.vue'
  import addFile from './add-file.vue'
  import merge from 'lodash/merge'
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
        addFolderVisible: false,
        addFileVisible: false,
        parentId: 0
      }
    },
    components: {
      addFolder,
      addFile
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList (parentId) {
        this.dataListLoading = true
        let params = this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
        })
        if (parentId) {
          params = merge(params, {'parentId': parentId})
          this.parentId = parentId
        } else {
          params = merge(params, {'parentId': 0})
          this.parentId = 0
        }
        this.$http({
          url: this.$http.adornUrl('/catalog/filecatalog/list'),
          method: 'get',
          params
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
      handleCreateCommand (command) {
        if (command === 'folder') {
          this.addFolderHandle()
        } else if (command === 'file') {
          this.addFileHandle()
        } else if (command === 'word') {
          this.addFileHandle()
        }
      },
      // 新增 / 修改
      addFolderHandle (id) {
        this.addFolderVisible = true
        this.$nextTick(() => {
          this.$refs.addFolder.init(id, this.parentId)
        })
      },
      // 新增 / 修改
      addFileHandle (id) {
        this.addFileVisible = true
        this.$nextTick(() => {
          this.$refs.addFile.init(id, this.parentId)
        })
      },
      goPreLevel () {
        if (this.parentId > 0) {
          this.$http({
            url: this.$http.adornUrl(`/catalog/filecatalog/info/${this.parentId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.getDataList(data.fileCatalog.parentId)
            }
          })
        }
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
            url: this.$http.adornUrl('/catalog/filecatalog/delete'),
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
