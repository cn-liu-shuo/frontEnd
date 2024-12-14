<template>
  <div>
    <!-- 样本来源 -->
    <el-input v-model="search" size="mini"  placeholder="姓名，身份证号，家系名" style="width: 300px; margin-bottom: 10px;"></el-input>
    <el-button type="primary" @click="hycsearchData" size="mini">查询</el-button>
    <el-button type="primary" @click="openAddDialog" size="mini">新增</el-button>
    <el-button type="primary" @click="exportExcel" size="mini">导出EXCEL</el-button>

    <el-table :data="tableData" style="width: 100%; margin-top: 20px;" border>
      <!-- 表格列定义 -->
      <el-table-column prop="sampleCode" label="样本编码" width="180" align="center"></el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex == 1">男</el-tag>
          <el-tag else="scope.row.sex == 2">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120" align="center"></el-table-column>
      <el-table-column prop="telephone" label="电话" width="160" align="center"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="160" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160" align="center"></el-table-column>
      <el-table-column prop="nation" label="民族" width="160" align="center"></el-table-column>
      <el-table-column prop="comeFrom" label="居住地" width="160" align="center"></el-table-column>
      <el-table-column prop="homeAddress" label="家庭地址" width="160" align="center"></el-table-column>
      <el-table-column prop="homeAddress" label="家系名称" width="160" align="center"></el-table-column>
      <el-table-column prop="createOn" label="创建时间" width="160" align="center"></el-table-column>
      <el-table-column prop="createBy" label="创建人" width="160" align="center"></el-table-column>
      <el-table-column prop="modifiedBy" label="修改人" width="160" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" width="160" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="hychandleEdit(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="hycDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage1" :page-size="10" layout="total, prev, pager, next" :total="total">
    </el-pagination>
    <!-- 新增/修改弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idCard" required>
              <el-input v-model="form.idCard" @blur="handleIdCardBlur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="家系">
          <el-select v-model="form.sourceIdCard" placeholder="请选择活动区域" style="width: 100%" size="small">
            <el-option v-for="(item, index) in activeList" :key="index" :label="`${item.name}(${item.sourceIdCard})`"
              :value="item.sourceIdCard"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="form.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input-number v-model="form.age" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话" prop="telephone">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日" prop="birthday">
              <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="form.nation"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="居住地" prop="comeFrom">
          <el-input v-model="form.comeFrom"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" prop="homeAddress">
          <el-input v-model="form.homeAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="remark" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="hychandleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { hyclist, hycaddlist, hychandleDelete, hycxiugai } from '../../../api/donorsinfo'
import fileDownload from 'js-file-download'
export default {
  data () {
    return {
      // 家系
      activeList: [],

      search: '',
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      dialogFormVisible: false,
      title: '',
      form: {
        idCard: '',
        name: '',
        family: '',
        gender: '男',
        age: 0,
        telephone: '',
        birthday: '',
        email: '',
        nation: '',
        comeFrom: '',
        homeAddress: '',
        remark: ''
      },
      rules: {
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.hycgetList()
    this.hycjiaxi()
  },
  methods: {
    //   handleIdCardBlur() {
    //   const idCard = this.form.idCard;
    //   if (idCard.length === 18) {
    //     // 解析生日
    //     const birthYear = idCard.substring(6, 10);
    //     const birthMonth = idCard.substring(10, 12);
    //     const birthDay = idCard.substring(12, 14);
    //     this.form.birthday = `${birthYear}-${birthMonth}-${birthDay}`;

    //     // 解析性别
    //     const genderCode = idCard.substring(16, 17);
    //     if (genderCode % 2 === 0) {
    //       this.form.sex = '女';
    //     } else {
    //       this.form.sex = '男';
    //     }
    //   } else {
    //     this.$message.error('身份证号格式不正确');
    //   }
    // },
    // 导出EXCEL
    exportExcel () {
      this.$http({
        url: this.$http.adornUrl('/biosample/donorsinfo/export-excel-donorsinfo'),
        method: 'get',
        responseType: 'blob',
        withCredentials: false,
        params: this.query
      }).then(response => {
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        fileDownload(blob, '样本来源' + Date.parse(new Date()) + '.xlsx')
      })
    },

    // 家系列表
    hycjiaxi () {
      this.$http({
        url: this.$http.adornUrl('/biosample/familyman/AllList'),
        method: 'get',
        params: this.$http.adornParams(this.query)
      }).then((res) => {
        this.activeList = res.data.AllList
        console.log(this.activeList)
      })
    },
    // 修改
    hychandleEdit (row) {
      this.dialogFormVisible = true
      this.form = { ...row }
      this.title = '修改'
    },
    // 新增或保存修改
    hychandleSubmit () {
      if (this.title === '新增') {
        hycaddlist({
          idCard: this.form.idCard,
          age: this.form.age,
          telephone: this.form.telephone,
          birthday: this.form.birthday,
          email: this.form.email,
          nation: this.form.nation,
          comeFrom: this.form.comeFrom,
          homeAddress: this.form.homeAddress,
          createOn: this.form.createOn,
          createBy: this.form.createBy,
          modifiedBy: this.form.modifiedBy,
          remark: this.form.remark,
          code: this.form.code,
          name: this.form.name,
          bianma: this.form.bianma
        }).then(res => {
          if (res.data.code === 0) {
            this.$message.success('新增成功')
            this.dialogFormVisible = false // 关闭弹窗
            this.hycgetList() // 重新获取列表
          } else {
            this.$message.error('新增失败')
          }
        }).catch(err => {
          console.error('请求错误', err)
          this.$message.error('请求失败')
        })
      } else {
        hycxiugai(this.form)
          .then(res => {
            if (res.data.code === 0) {
              this.$message.success('修改成功')
              this.dialogFormVisible = false // 关闭弹窗
              this.hycgetList() // 重新获取列表
            } else {
              this.$message.error('修改失败')
            }
          }).catch(err => {
            console.error('请求错误', err)
            this.$message.error('请求失败')
          })
      }
    },
    // 删除
    hycDelete (id) {
      this.$confirm('此操作将会删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hychandleDelete([id]).then(res => {
          if (res.data.code === 0) {
            this.$message.success('删除成功')
            this.hycgetList()
          }
        }).catch(() => {
          this.$message.error('请求失败')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 打开新增弹窗
    openAddDialog () {
      this.dialogFormVisible = true
      this.resetForm()
      this.title = '新增'
    },
    // 重置表单
    resetForm () {
      this.form = {
        idCard: '',
        name: '',
        family: '',
        gender: '男',
        age: 0,
        telephone: '',
        birthday: '',
        email: '',
        nation: '',
        comeFrom: '',
        homeAddress: '',
        remark: ''
      }
    },
    // 获取列表数据
    hycgetList () {
      hyclist({
        page: this.currentPage,
        limit: this.pageSize,
        key: this.search

      }).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.page.list
          this.total = res.data.page.totalCount
        } else {
          console.error('获取数据失败', res.message)
        }
      }).catch(err => {
        console.error('请求错误', err)
      })
    },
    // 查询
    hycsearchData () {
      this.currentPage = 1
      this.hycgetList()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.hycgetList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.hycgetList()
    }
  }
}
</script>

<style scoped></style>
