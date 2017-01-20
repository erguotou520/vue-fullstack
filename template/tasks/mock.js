require('shelljs/global')
var path = require('path')
var fs = require('fs')
var remove = require('./remove')
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const END = '\x1b[0m'
console.log('mv client folder %s to root path %s', path.join(__dirname, '../client/'), path.join(__dirname, '..'))

/* eslint-disable */
mv(path.join(__dirname, '../client/*'), path.join(__dirname, '../'))
rm('-rf', path.join(__dirname, '../client'))
rm('-rf', path.join(__dirname, '../server'))
remove(__filename)

// rewrite package.json
console.log(BLUE + 'Replace package.json......' + END)
var pkg = require('../package.json')
delete pkg.scripts['remove:mock']
fs.writeFile(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, 2) + '\n', function (err) {
  if (err) {
    console.error(YELLOW + 'Error when replace package.json, you may remove `remove:mock` script by yourself.' + END)
  }
})

console.log(YELLOW + 'Finished. Now you can run the following script.' + END)
