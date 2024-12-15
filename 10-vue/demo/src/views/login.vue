<template>
  <div class="box">
    <h1>登录</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName" class="width">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord" class="small">

        <el-input v-model="ruleForm.passWord"></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
//导入axios
import axios from 'axios'
export default {
  data() {
    return {
      ruleForm: {
        userName: '',
        passWord: '',
        
      },
      rules: {
        userName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
        
  
       
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调接口
          axios.post('http://wish.byesame.com/login')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style>
.width {
  width: 500px;
}

.small {
  width: 500px;
  margin: 0;
  padding: 0;
}

h1 {
  width: 100px;
}

.box {
  padding: 30px;
  width: 600px;
  height: 300px;
  margin: 0 auto;
  -webkit-box-shadow: 0px 0px 6px 3px rgba(143, 143, 143, 1);
  -moz-box-shadow: 0px 0px 6px 3px rgba(143, 143, 143, 1);
  box-shadow: 0px 0px 6px 3px rgba(143, 143, 143, 1);
}
</style>