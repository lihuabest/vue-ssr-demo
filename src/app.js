import Vue from 'vue'
import App from './app.vue'
import createRouter from './routers/index'

function createApp() {
    let router = createRouter()

    const app = new Vue({
        router,
        render: h => h(App)
    })

    return { app, router }
}

export default createApp
