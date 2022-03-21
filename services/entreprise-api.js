import { http } from './interceptor';

class EntrepriseApi {

    // get All entreprise
    getAllEntreprises(store, params) {
        return new Promise(function (resolve, reject) {
            http.get('/entreprise/search', { params })
                .then(({ data }) => {
                    resolve(data)
                    store.dispatch("entreprises/set", data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    // delete entreprise by id
    getEntrepriseById(id) {
        return new Promise(function (resolve, reject) {
            http.get(`/entreprise/${id}`)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    createOrUpdateEntreprise(entreprise) {
        return new Promise(function (resolve, reject) {
            if (entreprise && entreprise.id > 0) {
                http.put(`/entreprise/${entreprise.id}`, entreprise)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                http.post(`/entreprise`, entreprise)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }

        })
    }

    // delete entreprise by id
    deleteEntrepriseById(id) {
        return new Promise(function (resolve, reject) {
            http.delete(`/entreprise/${id}`)
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