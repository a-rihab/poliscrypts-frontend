
export const state = () => ({
    enterprises: [],
    contacts: [],
    totalElements: 0
})
export const getters = {
    getAllContacts(state) {
        return state.contacts;
    },
    getAllContactsForTable(state) {

        return state.contacts.map(({ id, firstName, lastName, address, type, tva, enterprises }) => {

            let myArrayFiltered = state.enterprises.filter((a) => {
                return enterprises.some((b) => {
                    return b === a.id;
                });
            });

            let _enterprises = myArrayFiltered.map(enterprise => enterprise.address).join(" - ")

            return { id, firstName, lastName, address, type, tva, enterprises: _enterprises }
        })
    },
    getSearchEntreprises(state) {
        return state.enterprises

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
    },
    setEntreprises(state, { content, totalElements }) {
        state.enterprises = content;
    },
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
    },
    setEntreprises({ commit }, { content, totalElements }) {
        commit('setEntreprises', { content, totalElements })
    },
}
