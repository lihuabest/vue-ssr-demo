/**
 * server服务
 */
const axios = require('axios')

let cook = process.__COOKIE__ || ''; // cookie
let api;

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:8089'

axios.interceptors.response.use(res => {
    if (res.status >= 200 || res.status < 300) {
        return res
    }

    return Promise.reject(res)
}, error => {
    return Promise.reject({ message: 'Network error, reload please.', error: error})
})

if (process.__API__) {
    api = process.__API__
} else {
    api = {
        get: function (target, options = {}) {
            return new Promise((resolve, reject) => {
                axios.request({
                    url: target,
                    method: 'get',
                    headers: {
                        'Cookie': cook
                    },
                    params: options
                }).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        post: function (target, options = {}) {
            return new Promise((resolve, reject) => {
                axios.request({
                    url: target,
                    method: 'post',
                    headers: {
                        'Cookie': cook
                    },
                    params: options
                }).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            });
        }
    }
}

module.exports = api
