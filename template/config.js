/**
 * Project config file includes dev/prod and frontend/backend
 */
var path = require('path')
var _ = require('lodash')
{{#if_eq mock 'backend'}}
var backendBase = {
  // Root path of server
  root: path.normalize(__dirname),

  // Server port
  port: process.env.PORT || {{backendPort}},

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SECRET || '{{name}}-secret'
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
}{{/if_eq}}

var development = {
  frontend: {
    port: {{frontendPort}},
    assetsRoot: path.resolve(__dirname, './{{#if_eq mock "backend"}}client/{{/if_eq}}src'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': { target: 'http://localhost:' + {{#if_eq mock 'backend'}}backendBase.port{{/if_eq}}{{#if_eq mock 'mock'}}{{mockPort}}{{/if_eq}}, changeOrigin: true{{#if_eq mock "mock"}}, pathRewrite: { '^/api/': '' }{{/if_eq}} },
      '/socket.io': { target: 'http://localhost:' + {{#if_eq mock 'backend'}}backendBase.port{{/if_eq}}{{#if_eq mock 'mock'}}{{mockPort}}{{/if_eq}}, changeOrigin: true, ws: true }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }{{#if_eq mock 'backend'}},
  backend: _.merge({}, backendBase, {
    mongo: {
      uri: {{#if mongoUri}}'{{mongoUri}}-dev'{{else}}'mongodb://localhost/{{name}}-dev'{{/if}}
    }
  }){{/if_eq}}{{#if_eq mock 'mock'}},
  mock: {
    port: {{mockPort}}
  }{{/if_eq}}
}
var production = {
  frontend: {
    index: path.resolve(__dirname, './{{#if_eq mock "backend"}}client/{{/if_eq}}dist/index.html'),
    assetsRoot: path.resolve(__dirname, './{{#if_eq mock "backend"}}client/{{/if_eq}}dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }{{#if_eq mock 'backend'}},
  backend: _.merge({}, backendBase, {
    // whether backend servers the frontend, you can use nginx to server frontend and proxy to backend services
    // if set to true, you need no web services like nginx
    serverFrontend: true,
    // Server IP
    ip: process.env.APP_HOST || process.env.APP_IP || process.env.HOST || process.env.IP,
    // Server port
    port: process.env.APP_PORT || process.env.PORT,
    // MongoDB connection options
    mongo: {
      uri: process.env.MONGODB_URI || process.env.MONGOHQ_URI ||
           {{#if mongoUri}}'{{mongoUri}}'{{else}}'mongodb://localhost/{{name}}'{{/if}}
    },

    // frontend folder
    frontend: path.resolve(__dirname, './client/dist')
  }){{/if_eq}}{{#if_eq mock 'mock'}},
  mock: {
    port: process.env.APP_PORT || process.env.PORT
  }{{/if_eq}}
}

var config = process.env.NODE_ENV === 'production' ? production : development

module.exports = _.assign({}, config)
