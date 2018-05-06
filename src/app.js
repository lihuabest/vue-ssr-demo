const Vue = require('vue').default
const App = require('./app.vue').default
const createRouter = require('./routers/index').default

function createApp() {
    let router = createRouter()

    const app = new Vue({
        router,
        render: h => h(App)
    })

    return { app, router }
}

module.exports = createApp;
