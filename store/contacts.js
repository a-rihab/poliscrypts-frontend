
export const state = () => ({
    contacts: [],
    totalElements: 0
})
export const getters = {
    getAllContacts(state) {
        //  return state.contacts.map(c => c.entreprises).map(e => e.address).join(",")
        return state.contacts

    },
    getTotalElements(state) {
        return state.totalElements
    },
    getContactById(state, id) {
        return state.contacts.find((e) => e.id === id) || null
    },

}
export const mutations = {
    set(state, { content, totalElements }) {

        state.contacts = content;
        state.totalElements = totalElements
    },
    add(state, item) {
        state.contacts.unshift(item);
        state.totalElements++;
    },
    update(state, item) {
        const index = state.contacts.findIndex(e => e.id === item.id)
        if (index !== -1)
            state.contacts.splice(index, 1, item)
    },
    remove(state, id) {
        state.contacts = state.contacts.filter(e => e.id !== id)
        state.totalElements--
    }
}

export const actions = {
    set({ commit }, { content, totalElements }) {
        console.log("contactssss", content)
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
