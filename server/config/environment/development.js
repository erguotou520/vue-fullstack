'use strict'
var path = require('path')
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/vue-fullstack-dev'
  },

  seedDB: true,

  // frontend folder
  frontend: path.resolve(__dirname, '../../../client')
}
