import io from 'socket.io-client'
console.log(io)

export default (token, cb) => {
  const socket = io.connect()
  console.log(Object.keys(socket))
  socket.on('connect', function (socket) {
    socket
      .on('authenticated', function () {
        // do other things
      })
      .emit('authenticate', { token: token }) // send the jwt
  })
}
