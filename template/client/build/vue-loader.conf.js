var utils = require('./utils')
var config = require({{#if_eq mock "mock"}}'../config'{{/if_eq}}{{#if_eq mock "backend"}}'../../config'{{/if_eq}}).frontend
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}
