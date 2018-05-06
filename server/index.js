const fs                       = require('fs')
const path                     = require('path')
const Koa                      = require('koa')
const KoaRuoter                = require('koa-router')
const serve                    = require('koa-static')
const proxy                    = require('koa-proxy')
const { createBundleRenderer } = require('vue-server-renderer')

const app = new Koa()
const router = new KoaRuoter()

const distPath = '../dist'
const templateHtml = require('fs').readFileSync(path.resolve(__dirname, '../src/index.ssr.html'), 'utf-8')
const renderer = createBundleRenderer(require(`${ distPath }/vue-ssr-server-bundle.json`), {
  runInNewContext: false,
  template: templateHtml,
  clientManifest: require(`${ distPath }/vue-ssr-client-manifest.json`)
})

app.use(proxy(     
    {
        match: /^\/v2/,
        host: 'https://api.douban.com',
    }
))

// 静态资源
app.use(serve(path.resolve(__dirname, distPath), { extensions: ['js', 'css']}))

router.get('*', render)
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 8089
app.listen(port, '0.0.0.0', () => {
    console.log(`server started at localhost:${port}`)
})


/**
 * 渲染函数
 * @param {*} ctx
 * @param {*} next
 */
function render(ctx, next) {
    ctx.set('Content-Type', 'text/html;charset=UTF-8')

    const context = {
        title: 'hello vue, this is ssr',
        url: '/'
    }

    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                console.error(err.stack)
                return reject(err)
            }

            ctx.status = 200
            ctx.body = html
            resolve(html)
        })
    })
}
