import axios from 'axios';

export const http = axios.create({
    baseURL: "https://poliscrypts-backend.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});

http.interceptors.request.use(
    config => {
        const token = localStorage.getItem("accessToken");
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    response => {

        console.log("response.status", response.status)
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }, error => {


        if (error.response.status) {
            switch (error.response.status) {
                case 400:

                    console.log('Bad request')
                    break;

                case 401:
                    {
                        let username = localStorage.getItem("username");
                        let refreshToken = localStorage.getItem('refreshToken')
                        if (refreshToken == null) {
                            Promise.reject(error)
                        }

                        let requestBody = {
                            refreshToken,
                            username
                        }

                        http.post('/refresh', { requestBody })
                            .then(({ accessToken, refreshToken, username, roles }) => {
                                localStorage.setItem('accessToken', accessToken)
                                localStorage.setItem('refreshToken', refreshToken)
                                localStorage.setItem('username', username)
                                localStorage.setItem('roles', roles)

                                const config = error.config

                                if (config.params && config.params['token'] !== undefined) {
                                    config.params['token'] = `${localStorage.getItem('accessToken')}`
                                }

                                return new Promise((resolve, reject) => {
                                    http
                                        .request(config)
                                        .then(response => {
                                            resolve(response)
                                        })
                                        .catch(error => {
                                            reject(error)
                                        })
                                })
                            })
                            .catch(error => {
                                Promise.reject(error)
                            })
                    }
                    break;
                case 403:
                    this.$router.replace({
                        path: "/auth",
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;

                case 502:
                    setTimeout(() => {
                        router.replace({
                            path: "/auth",
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
            }
            return Promise.reject(error.response);
        }
    }
); 
