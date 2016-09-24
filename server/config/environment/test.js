'use strict'
var path = require('path')

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/vue-fullstack-test'
  },

  // frontend folder
  frontend: path.resolve(__dirname, '../../../dist')
}
