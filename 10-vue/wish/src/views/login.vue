<template>
    <div>
      <div class="text" id="login"></div>
      <div class="box">
        <h1>登录</h1>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input
              type="passWord"
              v-model="ruleForm.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import { login } from "@/api/login"
  export default {
    data() {
      return {
        ruleForm: {
          userName: "admin",
          passWord: "123456",
        },
        rules: {
          userName: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
          ],
          passWord: [
            { required: true, message: "请选择活动区域", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          // 如果表单校验通过
          if (valid) {
            login(this.ruleForm).then(res => {
                if (res.code == 200) {
                    this.$message.success("登录成功")
                    localStorage.setItem('token', res.data.token)
                    this.$router.push({
                        path: "/home"
                    })
                }
            })
            
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  #login {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.8);
    background-color: #fff;
    padding-right: 40px;
    border-radius: 5%;
    z-index: 99;
   
  }
  </style>