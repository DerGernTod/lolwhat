import { fetchSummonerByName } from '@/services/riotapi';
import to from '&/utils/to';

async function handleResponse(req, res, fn, ...args) {
  const [error, result] = await to(fn(...args));
  res.write(JSON.stringify(error || result || { error: 'no result' }));
  console.log('got result/error', result, error);
  res.end();
}

export default function init(app) {
  // todo: improve, elastic storage, caching of riot requests
  app.get('/api/summonerByName/:name', (req, res) => {
    console.log(`getting summoner ${req.params.name}`);
    handleResponse(req, res, fetchSummonerByName, req.params.name);
  });
}

