const axios = require('axios')
const proxy = require('./proxy')

let api;

axios.defaults.timeout = 10000

// 服务端代理 其实就是绝对地址访问
axios.interceptors.request.use(config => {
    const isNode = TARGET === 'node'
    if (isNode) {
        config.url = proxy(config.url)
    }

    return config
})

axios.interceptors.response.use(res => {
    if (res.status >= 200 || res.status < 300) {
        return res
    }
    console.log(res);
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
