import { login } from "@/api/login"
const state = {}
const getters = {}
const mutations = {}
const actions = {
    goLogin({commit}, abcd){
        login(abcd).then(res => {
            console.log(res);
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}