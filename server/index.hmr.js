const fs                       = require('fs')
const path                     = require('path')
const Koa                      = require('koa')
const KoaRuoter                = require('koa-router')
const serve                    = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')
const LRU                      = require('lru-cache')

const app = new Koa()
const router = new KoaRuoter()

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const distPath = '../dist'
const templateHtml = require('fs').readFileSync(path.resolve(__dirname, '../src/index.ssr.html'), 'utf-8')

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('../src/index.ssr.html')
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('../dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('../build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

app.use(async (ctx, next) => {
    console.log('request start')
    console.log(ctx.url)
    await next()
    console.log('request end')
})

// 静态资源
app.use(serve(path.resolve(__dirname, distPath), { extensions: ['js', 'css', 'png']}))

router.get('*', isProd ? render : (ctx, next) => {
    readyPromise.then(() => {
        render(ctx, next)
    })
})
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
async function render(ctx, next) {
    ctx.set('Content-Type', 'text/html;charset=UTF-8')

    const context = {
        title: 'hello vue, this is ssr',
        url: ctx.url
    }

    const { PassThrough } = require('stream')
    ctx.body = new PassThrough()

    return new Promise(async (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return reject(err)
            }
            
            ctx.status = 200
            ctx.body.end(html)
            resolve(html)
        })
    })
}