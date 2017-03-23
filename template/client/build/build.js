// https://github.com/shelljs/shelljs
require('shelljs/global')
var path = require('path')
process.env.NODE_ENV = 'production'
var config = require({{#if_eq mock "mock"}}'../config'{{/if_eq}}{{#if_eq mock "backend"}}'../../config'{{/if_eq}}).frontend
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.assetsRoot, config.assetsSubDirectory)
rm('-rf', assetsPath) // eslint-disable-line
mkdir('-p', assetsPath) // eslint-disable-line
cp('-R', {{#if_eq mock "mock"}}'static/*'{{/if_eq}}{{#if_eq mock "backend"}}'client/static/*'{{/if_eq}}, assetsPath) // eslint-disable-line

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
