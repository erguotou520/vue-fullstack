var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password' // this is the virtual field on the model
  },
  function (username, password, done) {
    User.findOne({
      username: username.toLowerCase()
    }, function (err, user) {
      if (err) return done(err)

      if (!user) {
        return done(null, false, { message: 'This username is not registered.' })
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'This password is not correct.' })
      }
      return done(null, user)
    })
  }))
}
