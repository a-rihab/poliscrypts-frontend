import { http } from './interceptor';

class ContactApi {

    // get All contact
    getAllContacts(store, params) {
        return new Promise(function (resolve, reject) {
            http.get('/contact/search', { params })
                .then(({ data }) => {
                    resolve(data)
                    store.dispatch("contacts/set", data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    // delete contact by id
    getContactById(id) {
        return new Promise(function (resolve, reject) {
            http.get(`/contact/${id}`)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    createOrUpdateContact(contact) {
        return new Promise(function (resolve, reject) {
            if (contact && contact.id > 0) {
                http.put(`/contact/${contact.id}`, contact)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                http.post(`/contact`, contact)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }

        })
    }

    // delete contact by id
    deleteContactById(id) {
        return new Promise(function (resolve, reject) {
            http.delete(`/contact/${id}`)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export default new ContactApi();