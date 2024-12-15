<template>
    <div>
        <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      :default-active="$route.path"
      :collapse="isCollapse"
      router
      active-text-color="#ffd04b">
      <el-menu-item index="/home/hello">
        <i class="el-icon-menu"></i>
        <span slot="title">helloWorld</span>
      </el-menu-item>
      <el-menu-item index="/home/world">
        <i class="el-icon-eleme"></i>
        <span slot="title">world</span>
      </el-menu-item>
      <el-menu-item index="/home/father">
        <i class="el-icon-eleme"></i>
        <span slot="title">父子传参</span>
      </el-menu-item>
      <el-menu-item index="/home/grandpa">
        <i class="el-icon-eleme"></i>
        <span slot="title">爷孙传参</span>
      </el-menu-item>
      <el-menu-item index="/home/vuex">
        <i class="el-icon-eleme"></i>
        <span slot="title">vuex</span>
      </el-menu-item>
      <el-menu-item index="/home/vuexFun">
        <i class="el-icon-eleme"></i>
        <span slot="title">vuex辅助函数</span>
      </el-menu-item>
      <el-menu-item index="/home/protect">
        <i class="el-icon-eleme"></i>
        <span slot="title">路由守卫</span>
      </el-menu-item>
      <el-menu-item index="/home/slot">
        <i class="el-icon-eleme"></i>
        <span slot="title">插槽</span>
      </el-menu-item>
      <el-menu-item index="/home/table">
        <i class="el-icon-eleme"></i>
        <span slot="title">表格</span>
      </el-menu-item>
      <el-menu-item index="/home/layout">
        <i class="el-icon-eleme"></i>
        <span slot="title">布局</span>
      </el-menu-item>
      <el-menu-item index="/home/clue">
        <i class="el-icon-eleme"></i>
        <span slot="title">线索管理</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
  export default {
    created(){
        console.log(this.$route);
    },  
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      isCollapse(){
        return this.$store.state.isCollapse
      }
    }
  }
</script>
<style scoped lang="scss">
    ::v-deep .el-menu{
        border: 0 !important;
    }
</style>