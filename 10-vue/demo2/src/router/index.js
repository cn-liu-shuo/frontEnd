import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 导入vuex
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向
    redirect: "/login"
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: "/home/hello",
    // 子路由 /home/hello
    children: [
      {
        path: "hello",
        name: "hello",
        component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue')

      },
      {
        path: "world",
        name: "world",
        component: () => import(/* webpackChunkName: "about" */ '../components/world.vue')

      },
      {
        path: "father",
        name: "father",
        component: () => import(/* webpackChunkName: "about" */ '../components/父子传参/father.vue')

      },
      {
        path: "grandpa",
        name: "grandpa",
        component: () => import(/* webpackChunkName: "about" */ '../components/父子传参/grandpa.vue')

      },
      {
        path: "vuex",
        name: "vuex",
        component: () => import('../components/vuex/vuex.vue')
      },
      {
        path: "vuexFun",
        name: "vuexFun",
        component: () => import('../components/vuex/vuex辅助函数.vue')
      },
      {
        path: "protect",
        name: "protect",
        component: () => import('../components/protect.vue')
      },
      {
        path: "slot",
        name: "slot",
        component: () => import('../components/插槽/slot.vue')
      },
      {
        path: "table",
        name: "table",
        component: () => import('../components/table.vue')
      },
      {
        path: "layout",
        name: "layout",
        component: () => import('../components/layout.vue')
      },
      {
        path: "clue",
        name: "clue",
        component: () => import('../components/clue.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
let obj =  {
  path: "/login",
  name: "login",
  component: () => import('../views/login.vue')
}
// 动态路由
router.addRoute(obj)


// 全局路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  // 如果登录 放行
  if (to.path == '/login') {
      return next()
  }else if (!token) {
    // 没有登录 送去登录
    return next('/login')
  }else{
    // 有token放行
    const hasName = store.state.user.name
    if (hasName) {
        next()
    }else{
      store.dispatch('user/getPerson')
      next()
    }
  }
})

export default router
