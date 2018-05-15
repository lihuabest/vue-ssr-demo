const httpProxy = require('http-proxy')

function proxyMiddleware(prefix, target, options) {
    if (typeof prefix === 'string') {
        prefix = [prefix]
    }

    if (Array.isArray(prefix) && target) {
        return async (ctx, next) => {
            if (prefix.filter(pre => {
                return ctx.url.indexOf(pre) === 0
            }).length) {
                const proxy = httpProxy.createProxyServer({ changeOrigin: true, preserveHeaderKeyCase: true });
                proxy.web(ctx.req, ctx.res, {
                    target
                })
                ctx.response = false
            } else {
                next()
            }
        }
    }
}

module.exports = proxyMiddleware
