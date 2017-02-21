var path = require('path')
var webpack = require('webpack')
var config = require({{#if_eq mock "mock"}}'../config'{{/if_eq}}{{#if_eq mock "backend"}}'../../config'{{/if_eq}}).frontend
var utils = require('./utils')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    enforceExtension: true,
    modules: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'locales': path.resolve(__dirname, '../src/locales'),
      'shared': path.resolve(__dirname, '../src/shared'),
      'resources': path.resolve(__dirname, '../src/resources')
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          formatter: require('eslint-friendly-formatter')
        },
        vue: {
          loaders: utils.cssLoaders({ sourceMap: config.cssSourceMap }),
          postcss: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ]
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
