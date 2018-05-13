const path               = require('path')
const webpack            = require('webpack')
const merge              = require('webpack-merge')
const CopyWebpackPlugin  = require('copy-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const base               = require('./webpack.base.conf.js')

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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"',
            'TARGET': '"node"' // 定义一个总体的环境变量
        }),
        new VueSSRServerPlugin(),
        // 静态文件拷贝
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ])
    ]
})
