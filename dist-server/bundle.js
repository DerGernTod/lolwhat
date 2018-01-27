require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = __webpack_require__(0)

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, "config"))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const path = __webpack_require__(0)
const config = __webpack_require__(1)
const ExtractTextPlugin = __webpack_require__(11)
const packageConfig = __webpack_require__(12)

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = __webpack_require__(13)

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, "build"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webpack___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_webpack__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_webpack_dev_middleware__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_webpack_dev_middleware___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_webpack_dev_middleware__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_webpack_hot_middleware__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_webpack_hot_middleware___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_webpack_hot_middleware__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__build_webpack_dev_conf__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__build_webpack_dev_conf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__build_webpack_dev_conf__);
/* eslint no-console: 0 */








const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : Number(process.env.PORT);
const app = __WEBPACK_IMPORTED_MODULE_1_express__();

function startServer() {
  const server = __WEBPACK_IMPORTED_MODULE_3_http__["createServer"](app);

  server.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });
}

if (isDeveloping) {
  __WEBPACK_IMPORTED_MODULE_6__build_webpack_dev_conf__["then"](webpackConf => {
    const compiler = __WEBPACK_IMPORTED_MODULE_2_webpack__(webpackConf);
    const middleware = __WEBPACK_IMPORTED_MODULE_4_webpack_dev_middleware__(compiler, {
      publicPath: webpackConf.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    });
    app.use(middleware);
    //app.use(webpackHotMiddleware(compiler));
    app.get('/api/matchList', (req, res) => {
      console.log('getting matchlist');
      res.write(JSON.stringify({someResult: 'result'}));
      res.end();
    });
    app.get('*', (req, res) => {
      console.log('delivering: ', __WEBPACK_IMPORTED_MODULE_0_path__["join"](__dirname, '../dist/index.html'));
      res.write(middleware.fileSystem.readFileSync(__WEBPACK_IMPORTED_MODULE_0_path__["join"](__dirname, '../dist/index.html')));
      res.end();
    });
    startServer();
  });

} else {
  app.use(__WEBPACK_IMPORTED_MODULE_1_express__["static"](`${__dirname}../../dist`));
  app.get('*', (req, res) => {
    res.sendFile(__WEBPACK_IMPORTED_MODULE_0_path__["join"](__dirname, '../../dist/index.html'));
  });
  startServer();
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "src-server"))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const utils = __webpack_require__(2)
const webpack = __webpack_require__(3)
const config = __webpack_require__(1)
const merge = __webpack_require__(4)
const path = __webpack_require__(0)
const baseWebpackConfig = __webpack_require__(14)
const CopyWebpackPlugin = __webpack_require__(17)
const HtmlWebpackPlugin = __webpack_require__(18)
const FriendlyErrorsPlugin = __webpack_require__(19)
const portfinder = __webpack_require__(20)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': __webpack_require__(21)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

/* WEBPACK VAR INJECTION */}.call(exports, "build"))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"name":"riotapi","version":"1.0.0","description":"Riot API Testing","author":"Gernot Raudner <gitkraken@gernotraudner.at>","private":true,"scripts":{"dev":"concurrently \"npm run dev:client\" \"npm run dev:server\" \"npm run build:server\"","dev:client":"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js","start":"npm run dev","unit":"cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run","test":"npm run unit","lint":"eslint --ext .js,.vue src test/unit","build":"node build/build.js","build:server":"webpack -w --config ./build/webpack.server.conf.js","dev:server":"nodemon --watch dist-server ./dist-server/bundle.js"},"dependencies":{"vue":"^2.5.2","vue-router":"^3.0.1"},"devDependencies":{"autoprefixer":"^7.1.2","azure-functions-core-tools":"^2.0.1-beta.22","babel-core":"^6.22.1","babel-eslint":"^8.2.1","babel-helper-vue-jsx-merge-props":"^2.0.3","babel-loader":"^7.1.1","babel-plugin-istanbul":"^4.1.1","babel-plugin-syntax-jsx":"^6.18.0","babel-plugin-transform-runtime":"^6.22.0","babel-plugin-transform-vue-jsx":"^3.5.0","babel-preset-env":"^1.3.2","babel-preset-stage-2":"^6.22.0","chai":"^4.1.2","chalk":"^2.0.1","concurrently":"^3.5.1","copy-webpack-plugin":"^4.0.1","cross-env":"^5.0.1","css-loader":"^0.28.0","eslint":"^4.15.0","eslint-config-airbnb-base":"^11.3.0","eslint-friendly-formatter":"^3.0.0","eslint-import-resolver-webpack":"^0.8.3","eslint-loader":"^1.7.1","eslint-plugin-import":"^2.7.0","eslint-plugin-vue":"^4.0.0","express":"^4.16.2","extract-text-webpack-plugin":"^3.0.0","file-loader":"^1.1.4","friendly-errors-webpack-plugin":"^1.6.1","html-webpack-plugin":"^2.30.1","inject-loader":"^3.0.0","karma":"^1.4.1","karma-coverage":"^1.1.1","karma-mocha":"^1.3.0","karma-phantomjs-launcher":"^1.0.2","karma-phantomjs-shim":"^1.4.0","karma-sinon-chai":"^1.3.1","karma-sourcemap-loader":"^0.3.7","karma-spec-reporter":"0.0.31","karma-webpack":"^2.0.2","mocha":"^3.2.0","node-notifier":"^5.1.2","nodemon":"^1.14.11","optimize-css-assets-webpack-plugin":"^3.2.0","ora":"^1.2.0","phantomjs-prebuilt":"^2.1.14","portfinder":"^1.0.13","postcss-import":"^11.0.0","postcss-loader":"^2.0.8","postcss-url":"^7.2.1","rimraf":"^2.6.0","semver":"^5.3.0","shelljs":"^0.7.6","sinon":"^4.0.0","sinon-chai":"^2.8.0","source-map-support":"^0.5.3","uglifyjs-webpack-plugin":"^1.1.1","url-loader":"^0.5.8","vue-loader":"^13.3.0","vue-style-loader":"^3.0.1","vue-template-compiler":"^2.5.2","webpack":"^3.6.0","webpack-bundle-analyzer":"^2.9.0","webpack-dev-middleware":"^2.0.4","webpack-dev-server":"^2.9.1","webpack-hot-middleware":"^2.21.0","webpack-merge":"^4.1.0"},"engines":{"node":">= 6.0.0","npm":">= 3.0.0"},"browserslist":["> 1%","last 2 versions","not ie <= 8"]}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("node-notifier");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const path = __webpack_require__(0)
const utils = __webpack_require__(2)
const config = __webpack_require__(1)
const vueLoaderConfig = __webpack_require__(15)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: __webpack_require__(16),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
console.log('__dirname is ' + __dirname);
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, "build"))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const utils = __webpack_require__(2)
const config = __webpack_require__(1)
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("eslint-friendly-formatter");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("copy-webpack-plugin");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("friendly-errors-webpack-plugin");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("portfinder");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const merge = __webpack_require__(4)
const prodEnv = __webpack_require__(22)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {
  NODE_ENV: '"production"'
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map