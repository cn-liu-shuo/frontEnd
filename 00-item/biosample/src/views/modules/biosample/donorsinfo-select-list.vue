<template>
  <el-dialog
    title="选择样本来源"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form size="mini" :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :highlight-current-row="true"
      size="mini"
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
      <!--<el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="">
      </el-table-column>-->
      <el-table-column
        prop="idCard"
        header-align="center"
        align="center"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="innerNo"
        header-align="center"
        align="center"
        label="内部编号">
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
      </el-table-column>
      <el-table-column
        prop="companyName"
        header-align="center"
        align="center"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="duty"
        header-align="center"
        align="center"
        label="职责">
      </el-table-column>
      <el-table-column
        prop="birthday"
        header-align="center"
        align="center"
        label="生日">
      </el-table-column>
      <el-table-column
        prop="age"
        header-align="center"
        align="center"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="telephone"
        header-align="center"
        align="center"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="nation"
        header-align="center"
        align="center"
        label="民族">
      </el-table-column>
      <el-table-column
        prop="comeFrom"
        header-align="center"
        align="center"
        label="居住地">
      </el-table-column>
      <el-table-column
        prop="homeAddress"
        header-align="center"
        align="center"
        label="家庭住址">
      </el-table-column>
      <el-table-column
        prop="maritalStatus"
        header-align="center"
        align="center"
        label="材料状态">
      </el-table-column>
      <el-table-column
        prop="xisNum"
        header-align="center"
        align="center"
        label="家系人数">
      </el-table-column>
      <el-table-column
        prop="admissionNumber"
        header-align="center"
        align="center"
        label="准入数量">
      </el-table-column>
      <el-table-column
        prop="isInFormed"
        header-align="center"
        align="center"
        label="是否在册">
      </el-table-column>
      <el-table-column
        prop="pathologicalNum"
        header-align="center"
        align="center"
        label="疾病数量">
      </el-table-column>
      <el-table-column
        prop="clinicalDiagnosis"
        header-align="center"
        align="center"
        label="临床诊断">
      </el-table-column>
      <el-table-column
        prop="clinicNum"
        header-align="center"
        align="center"
        label="诊断数量">
      </el-table-column>
      <el-table-column
        prop="checkNum"
        header-align="center"
        align="center"
        label="检查数量">
      </el-table-column>
      <el-table-column
        prop="checkPoint"
        header-align="center"
        align="center"
        label="检查点">
      </el-table-column>
      <el-table-column
        prop="illnessName"
        header-align="center"
        align="center"
        label="患者姓名">
      </el-table-column>
      <el-table-column
        prop="xpublicState"
        header-align="center"
        align="center"
        label="公共状态">
      </el-table-column>
      <el-table-column
        prop="department"
        header-align="center"
        align="center"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="diagnosticTime"
        header-align="center"
        align="center"
        label="诊疗时间">
      </el-table-column>
      <el-table-column
        prop="familyState"
        header-align="center"
        align="center"
        label="家庭状态">
      </el-table-column>
      <!--<el-table-column
        prop="familyId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>-->
      <el-table-column
        prop="createOn"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <!-- <el-table-column
        prop="createUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column> -->
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
        label="修改时间">
      </el-table-column>
      <!--<el-table-column
        prop="modifiedUserId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>-->
      <el-table-column
        prop="modifiedBy"
        header-align="center"
        align="center"
        label="修改人">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <!--<el-table-column
        prop="back11"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back12"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back13"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back14"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back15"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back16"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back17"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back18"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back19"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back20"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back21"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back22"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back23"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back24"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back25"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back26"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back27"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back28"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back29"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back30"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back31"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back32"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back33"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back34"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back35"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back36"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back37"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back38"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="back39"
        header-align="center"
        align="center"
        label="">
      </el-table-column>-->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="selectDonor(scope.row)">选择</el-button>
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
      selectDonor (row) {
        this.visible = false
        this.$emit('selectDonor', row)
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/biosample/donorsinfo/list'),
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
