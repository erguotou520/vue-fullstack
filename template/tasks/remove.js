var fs = require('fs')
require('shelljs/global')
module.exports = function (filepath, cb) {
  /* eslint-disable */
  fs.readdir(__dirname, function (err, files) {
    if (files.length > 2) {
      rm('-f', filepath)
      if (cb) {
        cb()
      }
    } else {
      rm('-rf', __dirname)
      if (cb) {
        cb()
      }
    }
  })
}
