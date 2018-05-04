const Vue = require('vue').default
const app = require('./app.vue').default

function createApp() {
    const a = new Vue({
        render: h => h(app)
    })

    return a
}

module.exports = createApp;
