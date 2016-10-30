import IO from 'socket.io-client'
import Vue from 'vue'

const socket = IO.connect()
Vue.prototype.$socket = socket

export default socket
export function authSocket (token, cb) {
  socket
    .on('authenticated', () => {
      cb()
    })
    .emit('authenticate', { token: token })
}
