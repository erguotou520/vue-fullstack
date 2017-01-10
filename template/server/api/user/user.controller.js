'use strict'

var User = require('./user.model')
// var passport = require('passport')
var config = require('../../../config').backend
var jwt = require('jsonwebtoken')
var paging = require('../paging')
var _ = require('lodash')

var validationError = function (res, err) {
  return res.status(422).json(err)
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
  var search = _.merge(req.query.search, { role: 'user' })
  paging.listQuery(User, search, '-salt -hashedPassword', {}, req.query.page, function (err, json) {
    if (err) return res.status(500).send(err)
    res.status(200).json(json)
  })
}

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body)
  newUser.provider = 'local'
  newUser.role = 'user'
  newUser.save(function (err, user) {
    if (err) return validationError(res, err)
    var token = jwt.sign({ _id: user._id, name: user.name, role: user.role }, config.secrets.session, { expiresIn: '7d' })
    res.json({ token: token })
  })
}

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id

  User.findById(userId, function (err, user) {
    if (err) return next(err)
    if (!user) return res.sendStatus(404)
    res.json(user.profile)
  })
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send(err)
    return res.sendStatus(204)
  })
}

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id
  var oldPass = String(req.body.oldPassword)
  var newPass = String(req.body.newPassword)

  User.findById(userId, function (err, user) {
    if (err) {
      // handler error
    }
    if (user.authenticate(oldPass)) {
      user.password = newPass
      user.save(function (err) {
        if (err) return validationError(res, err)
        res.sendStatus(200)
      })
    } else {
      res.status(403).json({ message: 'Old password is not correct.' })
    }
  })
}

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) return next(err)
    if (!user) return res.json(401)
    res.json(user)
  })
}
