// 导入 login登录接口
import { login, getInfo } from "@/api/login"
// 导入全局路由实例
import router from "@/router"
import { Message } from "element-ui"

const state = {
    token: "",
    name: "",
    nickName: "",
    avatar: "",
    add:100,
    isLogin: false
}

const getters = {}

const mutations = {
    // 修改state里的参数
    SET_TOKEN(state, token){
        state.token = token
    },
    SET_NAME(state, name){
        state.name = name
    },
    SET_AVATAR(state, avatar){
        state.avatar = avatar
    },
    REMOVE_TOKEN(state){
        state.token = ''
        localStorage.removeItem('token')
        router.push({
            path: "/login"
        });
    },
    SET_ISLOGIN(state, val){
        state.isLogin = val
    }
}

const actions = {
    Rename(){
        console.log("我是user里的方法");
    },
    // 封装登录
    goLogin({ commit }, loginForm){
        // 调用登录api
        login(loginForm).then(res => {
            console.log(res);
            if (res && res.code == 200) {
                // 存token在本地
                localStorage.setItem('token', res.token)
                // 调用mutations里的SET_TOKEN方法， 并将token传参过去
                commit('SET_TOKEN', res.token)
                commit('SET_ISLOGIN', true)
                // 跳转到首页
                router.push({
                    path: "/home"
                })
            }
        })
        .catch(err => {
            Message.error(err.msg)
            commit('SET_ISLOGIN', false)

        })
    },
    // 获取个人信息
    getPerson({ commit }){
        getInfo().then(res => {
            console.log(res)
            if (res.code == 200) {
                commit('SET_NAME', res.user.nickName)
                commit('SET_AVATAR', res.user.avatar)
            }
        })
    },
    // 退出登录
    outLogin({ commit }){
        commit('REMOVE_TOKEN')
        commit('SET_ISLOGIN', false)
    }

}


export default {
    // 开启命名空间
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}