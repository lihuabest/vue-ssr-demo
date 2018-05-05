const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "@": resolve("src")
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
