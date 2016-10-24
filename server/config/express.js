/**
 * Express configuration
 */

'use strict'

var express = require('express')
var path = require('path')
var compression = require('compression')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var cookieParser = require('cookie-parser')
var config = require('../../config')
var passport = require('passport')

module.exports = function (app) {
  // render
  app.set('views', config.backend.root + '/server/views')
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')

  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(passport.initialize())

  if (config.backend.serverFrontend) {
    var staticPath = path.posix.join(config.frontend.assetsPublicPath, config.frontend.assetsSubDirectory)
    app.use(staticPath, express.static(path.join(config.backend.frontend, '/static')))
  }
}
