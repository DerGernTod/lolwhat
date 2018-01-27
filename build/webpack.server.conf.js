var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var nodeModules = {};
var fs = require('fs');
var webpack = require('webpack');
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
  nodeModules
var webpackConfig = {
    entry: path.resolve(__dirname, '../src-server/server.js'),
    output: {
        path: path.resolve(__dirname, '../dist-server'),
        filename: 'bundle.js'
    },
    node: {
      __dirname: true
    },
    target: 'node',
    devServer: {
        contentBase: path.join(__dirname, '../dist-server'),
        compress: false,
        port: 3000
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      })
    ],
    externals: nodeModules,
    devtool: 'sourcemap'
};
module.exports = webpackConfig;
