'use strict';

var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path              = require('path');

var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

let loaders = [{
  test   : /\.jsx?$/,
  loaders: ['babel?cacheDirectory'],
  exclude: /node_modules/
}, {
  test  : /\.(scss|css)$/,
  loader: 'style!css?sourceMap!postcss!sass?sourceMap'
}];


if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings : false
      }
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  );

  loaders = [{
    test   : /\.jsx?$/,
    loader: 'babel',
    exclude: /node_modules/
  },{
    test: /\.jsx?$/,
    loader: "eslint-loader",
    exclude: /node_modules/
  }, {
    test: /\.(scss|css)$/,
    loader: ExtractTextPlugin.extract('css!postcss!sass'),
  }];
}

module.exports = {
  module : {
    loaders:loaders
  },
  entry  : [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './examples/main.js'
  ],
  devtool: 'cheap-module-eval-source-map',
  output : {
    path         : path.join(__dirname, 'examples'),
    filename     : 'bundle.js'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
};
