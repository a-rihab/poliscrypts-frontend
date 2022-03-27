
export const state = () => ({
    enterprises: [],
    totalElements: 0
})
export const getters = {
    getAllEntreprises(state) {
        return state.enterprises.map(({ id, address, tva }) => {
            let _tva = tva.toString()
            return { id, address, tva: _tva }
        })
    },
    getTotalElements(state) {
        return state.totalElements
    },
    getEntrepriseById(state, id) {
        return state.enterprises.find((e) => e.id === id) || null
    },

}
export const mutations = {
    set(state, { content, totalElements }) {

        state.enterprises = content;
        state.totalElements = totalElements
    },
    add(state, item) {
        state.enterprises.unshift(item);
        state.totalElements++;
    },
    update(state, item) {
        const index = state.enterprises.findIndex(e => e.id === item.id)
        if (index !== -1)
            state.enterprises.splice(index, 1, item)
    },
    remove(state, id) {
        state.enterprises = state.enterprises.filter(e => e.id !== id)
        state.totalElements--
    }
}

export const actions = {
    set({ commit }, { content, totalElements }) {
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
