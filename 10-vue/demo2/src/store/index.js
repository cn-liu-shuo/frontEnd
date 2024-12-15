import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user"

Vue.use(Vuex)

/* 
  vuex是最好的一种实现非父子传参的方式
*/
// 引入持久化插件
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  // 存储公共状态或者公共数据（变量）
  state: {
    count: 0,
    hello: "haha",
    isCollapse: false
  },
  // 相当于计算属性
  getters: {
    count(state){
      return state.count + 10
    }
  },
  // 用来处理同步数据，修改state里的值
  mutations: {
    // 接收俩参数 一个是 存储的state，一个是 接收传递过来的参数
    CHANGE_COUNT(state, params){
      state.count += params
    },
    CHANGE_COLLAPSE(state){
      state.isCollapse = !state.isCollapse
    }
  },
  // 用来存储异步数据（掉接口）
  actions: {
    // [a, b] = [1, 2]  {commit} = {commit: f,getters: f}
    // 两个参数  commit可以调用mutations里的方法， 参数2：接收传过来的参数
    handleChange({commit}, params) {
      // console.log(contxt, params);
      commit('CHANGE_COUNT', params)
    },
    isCollaspe({commit}){
      commit('CHANGE_COLLAPSE')
    }
  },
  // 子模块
  modules: {
    user
  },
  // 配置持久化插件
  plugins: [
    createPersistedState({
      // 默认存到localStorage
      // 存到 sessionStorage
      storage: window.sessionStorage,
      // 存储key
      key: "my-game",
      // 指定存储的模块
      paths: ['count']
    })
  ]
})
