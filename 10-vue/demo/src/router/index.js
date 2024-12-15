// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 引入homeView组件
import HomeView from '../views/HomeView.vue'
// 在vue中使用路由
Vue.use(VueRouter)

// 配置路由信息(表)
const routes = [
  {
    // 根目录 表示打开网址默认显示的组件
    path: '/',
    // 路由起个名字
    name: 'home',
    component: HomeView
    // @指的是从src目录开始找
    // component: () => import('@/components/hello.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ,
  {
    path: '/huo',
    name: 'huo',
    component: () => import(/* webpackChunkName: "about" */ '../views/huo.vue')
  }
  ,
  {
    path: '/ji',
    name: 'ji',
    component: () => import(/* webpackChunkName: "about" */ '../views/ji.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import(/* webpackChunkName: "about" */ '../views/text.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
