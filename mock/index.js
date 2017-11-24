var fms = require('fms')
var glob = require('glob')
var path = require('path')

// api prefix: /api
fms.run({
  port: require('../config').mock.port,
  root: process.cwd(),
  static: './dist',
  urlRewrite: [
    '/', '/index.html',
    /^\/api/, ''
  ]
})

// import all .js module
glob.sync('ajax/**/*.js', {
  cwd: path.resolve(__dirname, './')
}).forEach(function (file) {
  require(path.resolve(__dirname, file))
})

var socketio = require('socket.io')(fms.server)
socketio.sockets.on('connection', function (socket) {
  socket.emit('authenticated')
  // Call onDisconnect.
  socket.on('disconnect', function () {
    console.info('DISCONNECTED')
  })

  // import all .js module
  glob.sync('socket/**/*.js', {
    cwd: path.resolve(__dirname, './')
  }).forEach(function (file) {
    require(path.resolve(__dirname, file))(socket)
  })
  console.info('CONNECTED')
})
