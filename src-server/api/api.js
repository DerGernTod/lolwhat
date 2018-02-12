import { fetchSummonerByName } from '@/services/riotapi/summoner';

export default function init(app) {
  // todo: improve, elastic storage, caching of riot requests
  app.get('/api/summonerByName', (req, res) => {
    console.log('getting summoner');
    fetchSummonerByName('DerGernTod')
      .then((result) => {
        res.write(JSON.stringify(result));
        res.end();
      })
      .catch((error) => {
        res.write(JSON.stringify(error));
        res.end();
      });
  });
}
