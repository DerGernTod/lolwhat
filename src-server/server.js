/* eslint no-console: 0 */
import * as path from 'path';
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import { initializeWebsockets } from '@/services/websockets';
import api from './api/api';
import elastic from './services/elastic/elastic';

elastic();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : Number(process.env.PORT);
const app = express();
app.use(bodyParser.json());
api(app);
app.use(express.static(`${__dirname}../dist`));
app.get('*', (req, res) => {
  console.log('requested path: ', req.path);
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = http.createServer(app);
initializeWebsockets(server);
server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.',
    port,
    port,
  );
});
