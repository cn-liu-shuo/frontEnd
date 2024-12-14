export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    fullName: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateFullName (state, fullName) {
      state.fullName = fullName
    }
  }
}
