<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="site-navbar__brand-lg" href="javascript:;">基因检测系统</a>
        <a class="site-navbar__brand-mini" href="javascript:;">BS</a>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="3" @click="routeSystemManager">
          <el-tooltip effect="dark" content="首页" placement="bottom-end">
            <i class="el-icon-house"></i>
          </el-tooltip>
        </el-menu-item>
        <!--<el-menu-item class="site-navbar__switch" index="1" @click="routeFile">
          <el-tooltip effect="dark" content="文件" placement="bottom-end">
            <i class="el-icon-folder-opened"></i>
          </el-tooltip>
        </el-menu-item>-->
        <el-menu-item class="site-navbar__switch" index="1">
          <el-tooltip effect="dark" content="同事" placement="bottom-end">
            <i class="el-icon-user"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="2">
          <el-tooltip effect="dark" content="协作" placement="bottom-end">
            <i class="el-icon-s-cooperation"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="3">
          <el-tooltip effect="dark" content="邮件" placement="bottom-end">
            <i class="el-icon-message"></i>
          </el-tooltip>
        </el-menu-item>
        <el-menu-item class="site-navbar__switch" index="3">
          <el-tooltip effect="dark" content="历史记录" placement="bottom-end">
            <i class="el-icon-time"></i>
          </el-tooltip>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img src="~@/assets/img/avatar.png" :alt="userName">{{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<script>
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
      }
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    methods: {
      routeFile () {
        this.$router.push({path: '/catalog/folder'})
      },
      routeSystemManager () {
        this.$router.push({path: '/home'})
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
