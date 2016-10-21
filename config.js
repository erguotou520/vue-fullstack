/**
 * Project config file includes dev/prod and frontend/backend
 */
var path = require('path')
module.exports = {
  frontend: {
    development: {
      port: 8080,
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      proxyTable: {},
      // CSS Sourcemaps off by default because relative paths are "buggy"
      // with this option, according to the CSS-Loader README
      // (https://github.com/webpack/css-loader#sourcemaps)
      // In our experience, they generally work as expected,
      // just be aware of this issue when enabling this option.
      cssSourceMap: false
    },
    production: {
      //
    }
  },
  backend: {
    development: {
      //
    },
    production: {
      //
    }
  },
  build: {
    index: path.resolve(__dirname, './client/dist/index.html'),
    assetsRoot: path.resolve(__dirname, './client/dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}
