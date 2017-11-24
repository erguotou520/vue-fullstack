module.exports = function (socket) {
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2))
  })
  socket.on('client:hello', function (data) {
    console.info('Received from client: %s', data)
    socket.emit('server:hello', 'server hello')
  })
}
