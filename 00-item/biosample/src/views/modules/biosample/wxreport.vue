<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('biosample:wxreport:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('biosample:wxreport:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
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
        label="">
      </el-table-column>
      <el-table-column
        prop="sampleId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="sampleCode"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="sampleType"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="sampleTypeName"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="collectAddress"
        header-align="center"
        align="center"
        label="采集地点">
      </el-table-column>
      <el-table-column
        prop="collectAddressName"
        header-align="center"
        align="center"
        label="采集地点名称">
      </el-table-column>
      <el-table-column
        prop="receiveDate"
        header-align="center"
        align="center"
        label="采集时间">
      </el-table-column>
      <el-table-column
        prop="sourceId"
        header-align="center"
        align="center"
        label="来源ID">
      </el-table-column>
      <el-table-column
        prop="idCard"
        header-align="center"
        align="center"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="sex"
        header-align="center"
        align="center"
        label="性别：1 男，2 女">
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
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="dnaConsi"
        header-align="center"
        align="center"
        label="DNA浓度（ng/μL）">
      </el-table-column>
      <el-table-column
        prop="extractTime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="extractUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="extractUser"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="dnaApplyTime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="dnaApplyUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="dnaApplyUser"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="dnaCreateOn"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="dnaCreateUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="dnaCreateBy"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="smn17"
        header-align="center"
        align="center"
        label="SMN1-7数值">
      </el-table-column>
      <el-table-column
        prop="qcValue17"
        header-align="center"
        align="center"
        label="1-7质控值">
      </el-table-column>
      <el-table-column
        prop="result17"
        header-align="center"
        align="center"
        label="1-7结果：0 阴性，1阳性">
      </el-table-column>
      <el-table-column
        prop="smn18"
        header-align="center"
        align="center"
        label="SMN1-8数值">
      </el-table-column>
      <el-table-column
        prop="qcValue18"
        header-align="center"
        align="center"
        label="1-8质控值">
      </el-table-column>
      <el-table-column
        prop="result18"
        header-align="center"
        align="center"
        label="1-8结果：0阴性，1阳性">
      </el-table-column>
      <el-table-column
        prop="qcValue"
        header-align="center"
        align="center"
        label="质控数值">
      </el-table-column>
      <el-table-column
        prop="result"
        header-align="center"
        align="center"
        label="结果：0 阴性，1阳性">
      </el-table-column>
      <el-table-column
        prop="detectTime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="detectUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="detectUser"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="applyUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="applyUser"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="createOn"
        header-align="center"
        align="center"
        label="">
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
        label="">
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
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="0 未审核，1 审核通过，-1 审核未通过">
      </el-table-column>
      <el-table-column
        prop="deleted"
        header-align="center"
        align="center"
        label="是否删除 0未删除 1删除">
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
  import AddOrUpdate from './wxreport-add-or-update'
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
          url: this.$http.adornUrl('/biosample/wxreport/list'),
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
            url: this.$http.adornUrl('/biosample/wxreport/delete'),
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
