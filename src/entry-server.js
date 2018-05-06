const createApp = require('./app.js')

// module.exports = createApp

// context 就是那个上下文参数
module.exports = (context) => {
    return new Promise((resolve, reject) => {
        let { app, router } = createApp()
        
        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            
            Promise.all(matchedComponents.map(Component => {
                if (Component.methods && Component.methods.asyncData) {
                    return Component.methods.asyncData({
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                resolve(app)
            }).catch(reject)
        })
    })
}