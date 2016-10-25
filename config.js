/**
 * Project config file includes dev/prod and frontend/backend
 */
var path = require('path')
var _ = require('lodash')

var backendBase = {
  // Root path of server
  root: path.normalize(__dirname),

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'vue-fullstack-secret'
  },

  // List of user roles
  userRoles: ['admin', 'user'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
}

var development = {
  frontend: {
    port: 8082,
    assetsRoot: path.resolve(__dirname, './client/src'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': { target: 'http://localhost:' + backendBase.port, changeOrigin: true },
      '/socket.io': { target: 'http://localhost:' + backendBase.port, changeOrigin: true, ws: true }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  backend: _.merge({}, backendBase, {
    mongo: {
      uri: 'mongodb://localhost/vue-fullstack-dev'
    }
  })
}
var production = {
  frontend: {
    index: path.resolve(__dirname, './client/dist/index.html'),
    assetsRoot: path.resolve(__dirname, './client/dist'),
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
  backend: _.merge({}, backendBase, {
    // is backend server frontend, you can use nginx to server frontend and proxy to backend services
    // if set to true, you need no web services like nginx
    serverFrontend: true,
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,
    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,
    // MongoDB connection options
    mongo: {
      uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||
           process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
           'mongodb://localhost/vue-fullstack'
    },

    // frontend folder
    frontend: path.resolve(__dirname, './client/dist')
  })
}

var config = process.env.NODE_ENV === 'production' ? production : development

module.exports = _.assign({}, config)
