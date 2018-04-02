import { expect } from 'chai';
import { fetchRiotApi } from '@/services/riotapi/riotapi';
import { SUMMONER_URLS } from '@/services/riotapi';
import elastic, { shutdownProcesses } from '@/services/elastic/elastic';
import to from '&/utils/to';
import staticSpec from './static.spec';

describe('riotapi.js', () => {
  before(async function initializeElastic() {
    this.timeout(15000);
    await elastic();
  });
  after(() => shutdownProcesses());
  describe('#fetchRiotApi', () => {
    it('should provide a useful result', async () => {
      const [err, result] = await to(fetchRiotApi(`${SUMMONER_URLS.byName}/DerGernTod`));
      expect(err).to.equal(null);
      expect(result.name).to.equal('DerGernTod');
    });

    it('should enqueue subsequent requests', () => {
      const checkResult = (result, name) => {
        expect(result.name).to.equal(name);
      };
      const promises = [
        fetchRiotApi(`${SUMMONER_URLS.byName}/DerGernTod`)
          .then(result => checkResult(result, 'DerGernTod')),
        fetchRiotApi(`${SUMMONER_URLS.byName}/EvaKeefar`)
          .then(result => checkResult(result, 'EvaKeefar')),
        fetchRiotApi(`${SUMMONER_URLS.byName}/Antsoldier`)
          .then(result => checkResult(result, 'Antsoldier')),
      ];
      return Promise.all(promises);
    });

    it('should only execute once for duplicate requests', () => {
      let firstResult;
      const checkResult = (result) => {
        if (firstResult) {
          expect(result).to.equal(firstResult);
        }
        firstResult = result;
      };
      const promises = [
        fetchRiotApi(`${SUMMONER_URLS.byName}/DerGernTod`).then(checkResult),
        fetchRiotApi(`${SUMMONER_URLS.byName}/DerGernTod`).then(checkResult),
      ];
      return Promise.all(promises);
    });
  });
  staticSpec();
});
