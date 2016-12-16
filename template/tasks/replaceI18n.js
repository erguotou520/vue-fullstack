require("babel-register")
var osLocale = require('os-locale')()
var glob = require('glob')
var path = require('path')
var fs = require('fs')
var _ = require('lodash')

let YELLOW = '\x1b[33m'
let BLUE = '\x1b[34m'
let END = '\x1b[0m'

var clientPath = path.join(__dirname, '../client')

// :prop="$t()"
var syntax1 = /\:([a-z-]+=\")\$t\(\'([a-zA-Z\.]+)\'\)(\")/g

// {{$t()}}
var syntax2 = /\{\{\$t\(\'([a-zA-Z\.]+)\'\)\}\}/g

// this.$t()
var syntax3 = /this.\$t\(\'([a-zA-Z\.]+)\'\)/g

var _locale = 'zh_CN'
osLocale.then(locale => {
  // set locale
  if (locale !== _locale) {
    _locale = 'en_US'
  }
  var langConfig = require('../client/src/locale/' + _locale).default

  // match files
  console.log(BLUE +　'Replace src files......' + END)
  glob(clientPath + '/src/**/*.{js,vue}', function (er, files) {
    files.forEach(function (file) {
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          console.error(YELLOW + 'Error when read file: ' + file + ', you may check the file yourself to see if \'$t\' syntax is exist.' + END)
        } else {
          var replaced = data.replace(syntax1, function () {
            return arguments[1] + _.get(langConfig, arguments[2]) + arguments[3]
          }).replace(syntax2, function () {
            return _.get(langConfig, arguments[1])
          }).replace(syntax3, function () {
            return '\'' + _.get(langConfig, arguments[1]) + '\''
          })
          fs.writeFile(file, replaced, function (err) {
            if (err) {
              console.error(YELLOW + 'Error when replace file: ' + file + ', you may replace this file by yourself.' + END)
            }
          })
        }
      })
    })
  })

  // rewrite package.json
  console.log(BLUE +　'Replace package.json......' + END)
  var pkg = require('../package.json')
  delete pkg.devDependencies['os-locale']
  delete pkg.devDependencies['glob']
  delete pkg.devDependencies['babel-register']
  delete pkg.scripts['remove:i18n']
  fs.writeFile(path.join(__dirname, '../package.json'), JSON.stringify(pkg, null, 2) + '\n', function (err) {
    if (err) {
      console.error(YELLOW + 'Error when replace package.json, you may remove \'babel-register\' \'glob\' \'os-locale\' dependencies by yourself.' + END)
    }
  })

  // delete locale folder
  console.log(BLUE +　'Remove locale and task folder......' + END)
  require('shelljs/global')
  rm('-rf', path.join(__dirname, '../client/src/locale'))
  rm('-rf', path.join(__dirname, '../tasks'))
})
