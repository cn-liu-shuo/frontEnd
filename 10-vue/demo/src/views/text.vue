<template>
    <div class="text">
        <h1>text</h1>
        <div class="box">
            <h1>登录</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"></el-input>
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
// 导入axios
import axios from 'axios'
import { login } from "@/api/login"
    export default{
        data(){
            return{
                ruleForm: {
                userName: '',
                passWord: ''
            },
        rules: {
            userName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
        }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {


                    // 掉接口
                    // axios.post('http://wish.byesame.com/login', this.ruleForm, {
                    //     headers: {
                    //         'Content-Type': 'application/x-www-form-urlencoded'
                    //     },
                    //     timeout: 5000 //设置超时时间
                    // }).then(res => {
                    //     console.log(res)
                    //     if (res.data.code == 200) {
                    //         this.$message({
                    //             message: '恭喜你，登录成功',
                    //             type: 'success'
                    //         });
                    //     }
                    // })

                    // axios.get(url, 参数)
                    // login(this.ruleForm).then(res => {
                    //     console.log(res);
                    // })
                    this.$store.dispatch('user/goLogin', this.ruleForm)
          
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

<style scoped lang="scss">
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
}
</style>