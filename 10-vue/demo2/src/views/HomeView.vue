<template>
  <div class="home">
    <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside :width="isCollapse ? 'auto': '200px'" style="background-color: rgb(238, 241, 246)">
    <CommonAside></CommonAside>
  </el-aside>
  
  <el-container>
    <el-header style="font-size: 12px; display: flex; justify-content: space-between; align-items: center;">
      <i class="el-icon-s-fold" style="margin-right: 15px;font-size: 20px" @click="opens" v-if="!isCollapse"></i>
      <i class="el-icon-s-unfold"  @click="opens" style="margin-right: 15px;font-size: 20px" v-else></i>
      <div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="outLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ name }}</span>
      </div>
      
    </el-header>
    
    <el-main>
      <!-- 组件的缓存 
        <keep-alive> 默认缓存所有组件
            include="hi" 缓存指定组件
            exclude="hi" 排除指定组件
      -->
      <keep-alive exclude="hi">
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue"
  export default {
    methods: {
      outLogin(){
        // 退出
        this.$store.dispatch('user/outLogin')
      },
      opens(){
        this.$store.dispatch("isCollaspe")
      }
    },
    computed: {
      name(){
        return this.$store.state.user.name
      },
      isCollapse(){
        return this.$store.state.isCollapse
      },
    },
    data() {
      return {

      }
    },
    components: {
      CommonAside
    }
  };
</script>

<style scoped lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  ::v-deep .el-aside{
    background-color: rgb(84, 92, 100) !important;
  }
  ::v-deep .el-container{
    height: 100vh !important;
    border: none !important;
  }
</style>
