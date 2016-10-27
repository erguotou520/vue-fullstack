import IO from 'socket.io-client'
import Vue from 'vue'

export default (token, cb) => {
  const socket = IO.connect()
  socket
    .on('authenticated', function () {
      Vue.prototype.$socket = socket
    })
    .on('news', data => {
      console.log(data)
    })
    .emit('authenticate', { token: token })
}
