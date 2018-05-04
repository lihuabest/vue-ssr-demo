const path               = require('path')
const webpack            = require('webpack')
const merge              = require('webpack-merge')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const AssetsPlugin       = require('assets-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const base               = require('./webpack.base.conf.js')
// const clientConf         = require('../dist/client.conf.json')

module.exports = merge(base, {
    entry: {
        server: path.resolve(__dirname, '../src/entry-server.js')
    },
    target: 'node',
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../src/index.ssr.html'),
        //     filename: 'index.ssr.html',
        //     excludeChunks: ['server']
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRServerPlugin()
    ]
})
