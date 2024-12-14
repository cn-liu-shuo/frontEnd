<template>
  <div>
    <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
      <div class="site-sidebar__inner">
        <el-menu
          :collapse="sidebarFold"
          :collapseTransition="false"
          class="site-sidebar__menu">
          <el-menu-item index="1">
            <i class="el-icon-star-off"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-view"></i>
            <span slot="title">我的关注</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-link"></i>
            <span slot="title">外链分享</span>
          </el-menu-item>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-folder-checked"></i>
              <span slot="title">我的文档</span>
            </template>
            <nav-menu :navMenus="personMenuList"></nav-menu>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-folder-opened"></i>
              <span slot="title">公司文档</span>
            </template>
            <nav-menu :navMenus="companyMenuList"></nav-menu>
          </el-submenu>

          <el-menu-item index="6">
            <i class="el-icon-share"></i>
            <span slot="title">同事文档</span>
          </el-menu-item>

          <el-menu-item index="3">
            <i class="el-icon-delete"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </div>
    </aside>
    <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
      <main class="site-content">
        <el-card style="height: calc(100vh - 80px)">
          <file-catalog></file-catalog>
        </el-card>

      </main>
    </div>
  </div>
</template>

<script>
  import FileCatalog from './filecatalog'
  import fileCatalogApi from '@/api/fileCatalog'
  import NavMenu from '@/components/nav-menu/index.vue'
  export default {
    components: {
      FileCatalog,
      NavMenu
    },
    computed: {
      navbarLayoutType: {
        get () {
          return this.$store.state.common.navbarLayoutType
        }
      },
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      }
    },
    data () {
      return {
        personMenuList: [],
        companyMenuList: []
      }
    },
    created () {
      this.getPersonMenu()
    },
    methods: {
      getPersonMenu () {
        fileCatalogApi.getPersonCatalog().then(res => {
          console.log(res.data.list)
          this.personMenuList = res.data.list
          this.companyMenuList = res.data.list
        }).catch(err => {
          console.error(err)
        })
      },

      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
