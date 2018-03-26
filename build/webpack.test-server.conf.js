'use strict'
// This is the webpack config used for unit tests.

const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.server.conf');
const isCoverage = process.env.NODE_ENV === 'coverage';
const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ],
  module: {
    rules: [].concat(
      !isCoverage ? [] : {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src-server'),
          path.resolve(__dirname, '../src-shared'),
        ],
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src-server'),
          path.resolve(__dirname, '../src-shared'),
          path.resolve(__dirname, '../test'),
        ],
      }
    ),
  }
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
