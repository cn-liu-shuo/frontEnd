<template>
  <div class="mod-config">
    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="样本编码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportReport">导出报告</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :highlight-current-row="true"
      :data="dataList"
      size="mini"
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
        prop="sampleCode"
        header-align="center"
        align="center"
        label="样本编码">
      </el-table-column>

      <el-table-column
        prop="collectAddressName"
        header-align="center"
        align="center"
        width="150px"
        label="采集地点">
      </el-table-column>
      <el-table-column
        prop="receiveDate"
        header-align="center"
        align="center"
        width="150px"
        label="采集时间">
        <template slot-scope="scope">
          {{scope.row.receiveDate.split(' ')[0]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="idCard"
        header-align="center"
        align="center"
        width="150px"
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
        label="性别">
        <template  slot-scope="scope">
          <span v-if="scope.row.sex === 1">男</span>
          <span v-if="scope.row.sex === 2">女</span>
        </template>
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
        width="120px"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="dnaConsi"
        header-align="center"
        align="center"
        width="120px"
        label="DNA浓度(ng/μL)">
      </el-table-column>
      <el-table-column
        prop="extractTime"
        header-align="center"
        align="center"
        width="150px"
        label="提取时间">
      </el-table-column>
      <el-table-column
        prop="extractUser"
        header-align="center"
        align="center"
        label="提取人">
      </el-table-column>

      <el-table-column
        prop="smn17"
        header-align="center"
        align="center"
        width="90"
        label="SMN1-7数值">
      </el-table-column>
      <el-table-column
        prop="qcValue17"
        header-align="center"
        align="center"
        width="90"
        label="1-7质控值">
      </el-table-column>
      <el-table-column
        prop="result17"
        header-align="center"
        align="center"
        width="100"
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
        label="SMN1-8数值">
      </el-table-column>
      <el-table-column
        prop="qcValue18"
        header-align="center"
        align="center"
        width="90"
        label="1-8质控值">
      </el-table-column>
      <el-table-column
        prop="result18"
        header-align="center"
        align="center"
        width="100"
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
        prop="createOn"
        header-align="center"
        align="center"
        width="150px"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="modifiedOn"
        header-align="center"
        align="center"
        width="150px"
        label="修改时间">
      </el-table-column>

      <el-table-column
        prop="modifiedBy"
        header-align="center"
        align="center"
        label="修改人">
      </el-table-column>
      <el-table-column
        prop="sampleTypeName"
        header-align="center"
        align="center"
        label="样本类型">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="sendSuccess"
        header-align="center"
        align="center"
        width="100"
        label="发送状态">
        <template slot-scope="scope">
          <span v-if="scope.row.sendSuccess==1" style="color: green">发送成功</span>
          <span v-else style="color: red">未发送成功</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="80"
        label="操作">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>-->
          <el-button type="text" size="small" @click="sendMsgHandle(scope.row.sampleId)">重新发送</el-button>
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
  import fileDownload from 'js-file-download'
  import AddOrUpdate from './wxreportrecord-add-or-update'
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
          url: this.$http.adornUrl('/biosample/wxreportrecord/list'),
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
      exportReport (id) {
        var ids = this.dataListSelections
        for (let i in ids) {
          if (!ids[i].id) {
            this.$message.error(ids[i].sampleCode + '还未生成报告！')
            continue
          }
          this.$http({
            url: this.$http.adornUrl('/biosample/wxreportrecord/export-word-detectreport/' + ids[i].id),
            method: 'get',
            responseType: 'blob',
            withCredentials: false
          }).then(response => {
            let blob = new Blob([response.data], {
              type: 'application/vnd.ms-word'
            })
            fileDownload(blob, '检测报告' + ids[i].sampleCode + '.docx')
          })
        }
      },
      // 删除
      sendMsgHandle (sampleId) {
        this.$confirm(`确定要重新发送吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/biosample/wxreportrecord/sendMsg/' + sampleId),
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '发送成功',
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
