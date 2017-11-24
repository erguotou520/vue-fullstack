/**
 * Project config file includes dev/prod and frontend/backend
 */
var path = require('path')
var _ = require('lodash')


var development = {
  frontend: {
    port: 9001,
    assetsRoot: path.resolve(__dirname, './src'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': { target: 'http://localhost:' + 7878, changeOrigin: true, pathRewrite: { '^/api/': '' } },
      '/socket.io': { target: 'http://localhost:' + 7878, changeOrigin: true, ws: true }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  mock: {
    port: 7878
  }
}
var production = {
  frontend: {
    index: path.resolve(__dirname, './dist/index.html'),
    assetsRoot: path.resolve(__dirname, './dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  mock: {
    port: process.env.APP_PORT || process.env.PORT
  }
}

var config = process.env.NODE_ENV === 'production' ? production : development

module.exports = _.assign({}, config)
