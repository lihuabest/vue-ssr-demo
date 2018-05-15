/**
 * client服务
 */
const axios = require('axios')

let api;

axios.defaults.timeout = 100000
// 开发环境下 基础请求地址就是当前运行地址，然后代理问题给koa
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8089'
}

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
        get: function (target, params = {}) {
            const suffix = Object.keys(params).map(name => {
                return `${name}=${JSON.stringify(params[name])}`;
            }).join('&');
            const urls = `${target}?${suffix}`;
            return new Promise((resolve, reject) => {
                axios.get(urls, params).then(res => {
                    resolve(res.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
        post: function (target, options = {}) {
            return new Promise((resolve, reject) => {
                axios.post(target, options).then(res => {
                    resolve(res.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }
}

module.exports = api
