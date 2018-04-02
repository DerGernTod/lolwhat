import { expect } from 'chai';
import to from '&/utils/to';
import { fetchProfileIcon } from '@/services/riotapi/static';

export default () => {
  describe('#static', () => {
    it('should deliver a list of profile icons', async () => {
      const [err, iconData] = await to(fetchProfileIcon(1234));
      expect(err).to.equal(null);
      console.log('icon data received: ', iconData);
    });
  });
};
