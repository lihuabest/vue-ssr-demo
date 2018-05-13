let configs = {
    '/v2': {
        host: 'api.douban.com',
        // port: 80,
        protocal: 'https'
    }
}

module.exports = (url => {
    // 就是一个绝对路径
    if (url.indexOf('http') === 0) {
        return url
    }
    
    // 补充一个斜线
    if (url.charAt(0) !== '/') {
        url = '/' + url;
    }

    // 根据代理配置 拼凑一个绝对请求地址
    Object.keys(configs).forEach(key => {
        if (url.indexOf(key) === 0) {
            url = (configs[key].protocal || 'http') + '://' + configs[key].host + ':' + (configs[key].port || '') + url
        }
    })

    return url
})