'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginRemove = require('html-webpack-plugin-remove');

module.exports = {
  entry: [
    path.resolve(__dirname, 'examples', 'index')
  ],
  output: {
    path: path.resolve(__dirname, 'examples', 'dist'),
    filename: 'example.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    },{
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass'),
    }]
  },
  plugins: [
    new HtmlWebpackPluginRemove('\n  <script src="./bundle.js"></script>'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'examples', 'index.html'),
      filename: 'index.html',
      inject: 'body',
      hash: true,
      xhtml: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('example.css', { allChunks: true })
  ],
};
