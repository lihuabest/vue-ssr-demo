const httpProxy = require('http-proxy')

function proxyMiddleware(options) {
    return async (ctx, next) => {
        let api = Object.keys(options).filter(key => ctx.url.indexOf(key) === 0)
        if (ctx.url !== '/' && api && api.length) {
            let conf = options[api[0]]
            const proxy = httpProxy.createProxyServer({ changeOrigin: conf.changeOrigin || false, preserveHeaderKeyCase: true });
            console.log(`Origin path: ${ctx.url}`)
            console.log(`Proxy path: ${conf.target + ctx.url}`)
            proxy.web(ctx.req, ctx.res, {
                target: conf.target
            })
            ctx.response = false
        } else {
            await next()
        }
    }
}

module.exports = proxyMiddleware
