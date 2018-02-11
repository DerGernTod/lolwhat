/* eslint no-console: 0 */
import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as http from 'http';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as config from '../build/webpack.dev.conf';
import elastic from './services/elastic';

elastic();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : Number(process.env.PORT);
const app = express();

function startServer() {
  const server = http.createServer(app);

  server.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });
}

if (isDeveloping) {
  config.then((webpackConf) => {
    const compiler = webpack(webpackConf);
    const middleware = webpackDevMiddleware(compiler, {
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
    app.use(webpackHotMiddleware(compiler));
    app.get('/api/matchList', (req, res) => {
      console.log('getting matchlist');
      res.write(JSON.stringify({ someResult: 'result' }));
      res.end();
    });
    app.get('*', (req, res) => {
      console.log('delivering: ', path.join(__dirname, '../dist/index.html'));
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
      res.end();
    });
    startServer();
  });
} else {
  app.use(express.static(`${__dirname}../../dist`));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
  startServer();
}

