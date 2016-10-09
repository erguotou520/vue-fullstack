// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {
      '/socket.io-client': { target: 'http://localhost:9000', changeOrigin: true, ws: true },
      '/api': { target: 'http://localhost:9000', changeOrigin: true, ws: true },
      '/auth': { target: 'http://localhost:9000', changeOrigin: true, ws: true }
    }
  }
}
