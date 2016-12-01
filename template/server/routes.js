/**
 * Main application routes
 */

'use strict'

var errors = require('./components/errors')
var config = require('../config').backend
var path = require('path')

module.exports = function (app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'))
  app.use('/api/users', require('./api/user'))

  app.use('/api/auth', require('./auth'))

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|static)/*').get(errors[404])

  // All other routes should redirect to the index.html
  if (config.serverFrontend) {
    app.route('/*').get(function (req, res) {
      res.sendFile(path.join(config.frontend, '/index.html'))
    })
  }
}
