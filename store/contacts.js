
export const state = () => ({
    entreprises: [],
    contacts: [],
    totalElements: 0
})
export const getters = {
    getAllContacts(state) {
        return state.contacts;
    },
    getAllContactsForTable(state) {

        return state.contacts.map(({ id, firstName, lastName, address, type, tva, entreprises }) => {

            let myArrayFiltered = state.entreprises.filter((a) => {
                return entreprises.some((b) => {
                    return b === a.id;
                });
            });

            let _entreprises = myArrayFiltered.map(entreprise => entreprise.address).join(" - ")

            return { id, firstName, lastName, address, type, tva, entreprises: _entreprises }
        })
    },
    getSearchEntreprises(state) {
        return state.entreprises

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
        state.entreprises = content;
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
