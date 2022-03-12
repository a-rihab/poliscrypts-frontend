
export const state = () => ({
    entreprises: [],
    totalElements: 0
})
export const getters = {
    getAllEntreprises(state) {
        return state.entreprises;
    },
    getTotalElements(state) {
        return state.totalElements
    },
    getEntrepriseById(state, id) {
        return state.entreprises.find((e) => e.id === id) || null
    },

}
export const mutations = {
    set(state, { content, totalElements }) {

        state.entreprises = content;
        state.totalElements = totalElements
    },
    add(state, item) {
        state.entreprises.unshift(item);
        state.totalElements++;
    },
    update(state, item) {
        const index = state.entreprises.findIndex(e => e.id === item.id)
        if (index !== -1)
            state.entreprises.splice(index, 1, item)
    },
    remove(state, id) {
        state.entreprises = state.entreprises.filter(e => e.id !== id)
        state.totalElements--
    }
}

export const actions = {
    set({ commit }, { content, totalElements }) {
        console.log("entreprisessss", content)
        commit('set', { content, totalElements })
    },
    add({ commit }, item) {
        commit('add', item)
    },
    update({ commit }, item) {
        commit('update', item)
    },
    remove({ commit }, id) {
        commit('remove', id)
    }
}
