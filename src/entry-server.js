import createApp from './app.js'

// context 就是那个上下文参数
export default (context) => {
    return new Promise((resolve, reject) => {
        let { app, router } = createApp()
        
        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            
            Promise.all(matchedComponents.map(Component => {
                if (Component.prefetch) {
                    return Component.prefetch({
                        route: router.currentRoute
                    }).then(data => {
                        Component.__INITIAL_STATE__ = data
                        return data
                    })
                }
            })).then((initialComponentsState) => {
                context.initialComponentsState = JSON.stringify(initialComponentsState)
                resolve(app)
            }).catch(reject)
        })
    })
}