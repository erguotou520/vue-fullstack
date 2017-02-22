var config = require({{#if_eq mock "mock"}}'../config'{{/if_eq}}{{#if_eq mock "backend"}}'../../config'{{/if_eq}}).frontend
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [{{#if_eq mock "mock"}}'./build/dev-client'{{/if_eq}}{{#if_eq mock "backend"}}'./client/build/dev-client'{{/if_eq}}].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.cssSourceMap })
  },
  // cheap-module-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '{{#if_eq mock "mock"}}index.html{{/if_eq}}{{#if_eq mock "backend"}}client/index.html{{/if_eq}}',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
