<template>
    <div>
        <div class="serchDiv">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="id">
                            <el-input v-model="form.id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" @click="Search">查询</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="tableDiv">
            <el-button type="success" icon="el-icon-plus" style="margin-bottom: 20px;" @click="add">新增</el-button>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="id" label="id" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width="180">
                </el-table-column>
                <el-table-column prop="role" label="角色">
                    <template v-slot="scope">
                        <el-tag v-if="scope.row.role == 1" type="success">超级管理员</el-tag>
                        <el-tag v-if="scope.row.role == 2" type="info">管理员</el-tag>
                        <el-tag v-if="scope.row.role == 3">平民</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template v-slot="scope">
                        <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                        <el-button size="small" type="danger" icon="el-icon-delete"
                            @click="del(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <page :total="total" :currentPage="query.page" @rows="changeRows" @pages="changePages"></page>

            <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
                <el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户名" prop="userName">
                                <el-input v-model="addForm.userName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="密码" prop="passWord">
                                <el-input v-model="addForm.passWord"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="管理员姓名" prop="name">
                                <el-input v-model="addForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="角色" prop="role">
                                <el-select v-model="addForm.role" placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="TrueAdd('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { adminList, adminSearch, admindel, adminAdd, adminEdit } from "@/api/user.js"
import page from "./page.vue"
export default {
    components:{
        page
    },
  data() {
    return {
      form: {
        id: null
      },
      tableData: [{

      }],
      addForm: {
        name: '',
        userName: '',
        passWord: '123456',
        role: 3
      },
      ids: null,
      total: 0,
      query: {
        page: 1,
        rows: 10
      },
      dialogVisible: false,
      title: null,
      options: [{
        label: "超级管理员",
        value: 1
      },{
        label: "管理员",
        value: 2
      },{
        label: "普通用户",
        value: 3
      }],
      rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          role: [
            { required: true, message: '请输入权限', trigger: 'blur' },
          ],
        }
    };
  },
  created() {
    this.getList()
  },
  methods: {
    TrueAdd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.title == '新增') {
                adminAdd(this.addForm).then(res => {
                if (res.code == 200) {
                    this.$message.success("新增成功")
                    this.dialogVisible = false
                    this.getList()
                    }
                })
                .catch(err => {
                    if(err.code == 188){
                        this.$message.error("用户名重复")
                    }
                })
            }else{
                // 编辑
                adminEdit({
                    id: this.ids,
                    ...this.addForm
                }).then(res => {
                    if (res.code == 200) {
                        this.dialogVisible = false
                        this.getList()
                        this.$message.success("修改成功")
                    }
                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
    },
    // 编辑
    edit(row){
        console.log(row);
        this.dialogVisible = true
        this.title = "编辑"
        this.addForm.name = row.name
        this.addForm.userName = row.userName
        this.addForm.role = row.role
        this.ids = row.id
    },
    getList(){
        adminList(this.query).then(res => {
            console.log(res)
            if (res.code == 200) {
                this.tableData = res.data.list
                this.total = res.data.count
            }
        })
    },
    // 新增
    add(){
        this.dialogVisible = true
        this.title = "新增"
        this.$nextTick(() => {
            this.$refs.ruleForm.resetFields();
        })
    },
    reset(){
        this.form.id = null
        this.getList()
    },
    Search(){
        this.tableData = []
        adminSearch(this.form.id).then(res => {
            console.log(res);
            if (res.code == 200) {
                this.tableData.push(res.data
                )
                this.total = 1
            }
        })
    },
    del(id){
        this.$confirm(`此操作将永久删除id为${id}的数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 点击删除
            admindel({id: id}).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                }
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    changeRows(val){
        this.query.rows = val
        this.query.page = 1
        this.getList()
    },
    changePages(val){
        this.query.page = val
        this.getList()
    }
  },
};
</script>