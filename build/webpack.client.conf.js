const path               = require('path')
const webpack            = require('webpack')
const merge              = require('webpack-merge')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const AssetsPlugin       = require('assets-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const base               = require('./webpack.base.conf.js')

module.exports = merge(base, {
    entry: {
       client: path.resolve(__dirname, '../src/entry-client.js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //       warnings: false
        //     },
        //     sourceMap: true
        // }),
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('assets/css/[name].[contenthash].css')
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // new webpack.NoEmitOnErrorsPlugin(),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../src/index.html'),
        //     filename: 'index.html'
        // }),
        // new AssetsPlugin({
        //     filename: 'client.conf.json',
        //     path: path.join(__dirname, '../dist')
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new VueSSRClientPlugin()
    ],
    devServer: {
        hot: true
    }
});
