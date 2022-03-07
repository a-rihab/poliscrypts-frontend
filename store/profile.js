
export const state = () => ({
    authenticated: false,
    roles: [],
    username: '',
})
export const getters = {
    getUsername(state) {
        return state.username;
    },
    getRole(state) {
        return state.roles[0];
    },
    isAuthenticated(state) {
        return state.authenticated;
    }
}
export const mutations = {
    login(state, { username, roles }) {
        state.authenticated = true
        state.username = username
        state.roles = roles
    },
    logout(state) {
        state.authenticated = false
        state.username = null
        state.roles = []
    },
}

export const actions = {

    login({ commit }, { username, roles }) {
        commit('login', { username, roles })
    },
    logout({ commit }) {
        commit('logout')
    },
}