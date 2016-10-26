/**
 * Socket.io configuration
 */

'use strict'

var config = require('../../config').backend

// When the user disconnects.. perform this
function onDisconnect (socket) {
}

// When the user connects.. perform this
function onConnect (socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2))
  })

  // Insert sockets below
  require('../api/thing/thing.socket').register(socket)
}

module.exports = function (socketio) {
  socketio.use(require('socketio-jwt').authorize({
    secret: config.secrets.session,
    handshake: true
  }))
  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null
      ? socket.handshake.address.address + ':' + socket.handshake.address.port
      : process.env.DOMAIN

    socket.connectedAt = new Date()

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket)
      console.info('[%s] DISCONNECTED', socket.address)
    })

    // Call onConnect.
    onConnect(socket)
    console.info('[%s] CONNECTED', socket.address)
  })
}
