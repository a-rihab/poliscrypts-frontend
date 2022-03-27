import { http } from './interceptor';

class EntrepriseApi {

    // get All enterprise
    getAllEntreprises(store, params) {
        return new Promise(function (resolve, reject) {
            http.get('/enterprise/search', { params })
                .then(({ data }) => {
                    resolve(data)
                    store.dispatch("enterprises/set", data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    // delete enterprise by id
    getEntrepriseById(id) {
        return new Promise(function (resolve, reject) {
            http.get(`/enterprise/${id}`)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    createOrUpdateEntreprise(enterprise) {
        return new Promise(function (resolve, reject) {
            if (enterprise && enterprise.id > 0) {
                http.put(`/enterprise/${enterprise.id}`, enterprise)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                http.post(`/enterprise`, enterprise)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }

        })
    }

    // delete enterprise by id
    deleteEntrepriseById(id) {
        return new Promise(function (resolve, reject) {
            http.delete(`/enterprise/${id}`)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export default new EntrepriseApi();