<template>
  <div>
    <div class="text" id="login"></div>
    <div class="box">
      <h1>登录</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="url" alt="" @click="getCaptchaImage" style="width: 100%;">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Particle } from "jparticles";
import { captchaImage } from "@/api/login";
export default {
  mounted() {
    new Particle("#login", {
        color: '#25bfff',
    lineShape: 'cube',
    range: 2000,
    proximity: 100,
    // 开启视差效果
    parallax: true,
    });
    this.getCaptchaImage()
  },
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "admin123",
        code: '',
        uuid: ''
      },
      url: '',
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    isLogin(){
      return this.$store.state.user.isLogin
    }
  },
  methods: {
    getCaptchaImage(){
      captchaImage().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.url = 'data:image/gif;base64,' + res.img
          this.ruleForm.uuid = res.uuid
        }
      })
      .catch(err => {
        this.$message.error("验证码过期")
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        // 如果表单校验通过
        if (valid) {
          // 调接口 登录api
          // login(this.ruleForm).then(res => {
          //     console.log(res);
          //         如果成功
          //     if (res.code == 200) {
          // 存token
          //         localStorage.setItem('token', res.token)
          //         // 跳转到首页
          //         this.$router.push({
          //             path: "/home"
          //         })
          //     }
          // })
          // 调用vuex中 封装好的登录方法goLogin，并传参
          try{
             await this.$store.dispatch("user/goLogin", this.ruleForm);
             if(this.isLogin == false){
              this.getCaptchaImage()
             }
          } catch (err){
            console.log(err)
            // this.getCaptchaImage()
          }

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
  height: 400px;
  box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.8);
  background-color: #fff;
  padding-right: 40px;
  border-radius: 5%;
  z-index: 99;

  h1 {
    padding: 40px 0 30px;
    text-align: center;
  }
}
</style>