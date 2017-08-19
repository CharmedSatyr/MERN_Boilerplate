/* webpack.common.config.js - used in client and server config (if applicable) */
const webpack = require('webpack')
const path = require('path');
const WatchIgnorePlugin = require('watch-ignore-webpack-plugin')

const common = {
   plugins: [
      new WatchIgnorePlugin([
         path.resolve(__dirname, './dist'),
         path.resolve(__dirname, './node_modules/')
      ]),
      new webpack.NoEmitOnErrorsPlugin()
   ]
}

/* webpack.client.config.js */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const client = {
   module: {
      rules: [{
         test: /\.jsx?$/,
         include: __dirname + '/src/client',
         exclude: /node_modules/,
         loader: 'babel-loader',
         options: {
            presets: ['env', 'react']
         }
      }, {
         test: /\.scss$/,
         use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            publicPath: '../', //The Plugin assumes scss is in the same directory as the html by default (?) and redoes paths!
            use: [{
                  loader: 'css-loader',
                  options: {
                     minimize: true
                  }
               },
               {
                  loader: 'sass-loader',
                  options: {
                     minimize: true
                  }

               }
            ]
         })
      }, {
         test: /\.(jpg|png|gif)$/,
         loader: 'url-loader',
         options: {
            /* limit =< 10000 ? Data URL : fallback to file-loader */
            limit: 10000,
            /* If using file-loader, emit to img/ as a 10 digit sha256 has with the proper extension. */
            name: 'img/[sha256:hash:10].[ext]'
         }
      }, {
         test: /\.(eot|ttf|svg|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url-loader',
         options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: 'fonts/[sha256:hash:5].[ext]'
         }
      }]
   },
   entry: {
      filename: './src/client/' + 'index.jsx'
   },
   output: {
      path: __dirname + '/dist/client',
      filename: 'index.js'
   },
   target: 'web',
   plugins: [
      new HTMLWebpackPlugin({
         template: __dirname + '/src/client/' + 'index.html',
         filename: __dirname + '/dist/client/' + 'index.html',
         inject: 'body'
      }),
      new ExtractTextPlugin({
         filename: 'styles/styles+[contenthash].min.css'
      }),
      /* DefinePlugin streamlines minification and gets rid of *.min.js console warnings for UglifyJsPlugin */
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production')
         }
      }),
      new webpack.optimize.UglifyJsPlugin()
   ]
}

/* webpack.server.config.js - When I get it working */
/*
const server = {
   module: {
      rules: [{
         test: /\.jsx?$/,
         include: __dirname + '/src/server',
         exclude: /node_modules/,
         loader: 'babel-loader',
         options: {
            presets: ['env']
         }
      }]
   },
   entry: {
      filename: './src/server/server.jsx'
   },
   output: {
      path: __dirname + '/dist/',
      filename: 'server.js'
   },
   target: 'node'
}
*/

module.exports = [
   Object.assign({}, common, client)
   /*, Object.assign({}, common, server)*/
]
