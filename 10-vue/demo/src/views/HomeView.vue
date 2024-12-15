<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <my-con></my-con>
    <my-con></my-con>
    <el-button type="primary" round>默认按钮</el-button>
  </div>
</template>

<!-- js的地方 -->
<script>
// @ is an alias to /src
// 1.引入子组件
import HelloWorld from '@/components/HelloWorld.vue'
import hello from "@/components/hello.vue"
export default {
  // 组件的名字
  name: 'HomeView',
  data(){
    return{
      msg: "哈哈"
    }
  },
  methods: {},
  created(){},
  watch: {},
  computed: {},
  filters:{},
  components: {
    HelloWorld,
    // 2.注册组件
    myCon: hello
  }
}
</script>

<style>

</style>