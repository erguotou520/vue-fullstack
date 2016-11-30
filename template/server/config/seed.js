/**
 * Populate DB with admin user data on server start
 */

'use strict'

var User = require('../api/user/user.model')

// search for admin user, if no, create one
User.find({ role: 'admin' }, function (err, admin) {
  if (err) throw err
  if (!(admin && admin.length)) {
    User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      username: 'admin',
      password: 'admin'
    }, function () {
      console.log('finished populating users')
    })
  }
})
