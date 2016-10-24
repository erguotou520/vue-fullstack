import io from 'socket.io-client'

export default (token, cb) => {
  const socket = io.connect('localhost:8082/socket.io/socket.io.js')
  console.log(Object.keys(socket))
  socket.on('connect', socket => {
    socket.on('authenticated', () => {
      cb(socket)
    })
    // send the jwt
    .emit('authenticate', { token: token })
  })
}
