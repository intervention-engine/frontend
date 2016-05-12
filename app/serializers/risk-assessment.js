import ApplicationSerializer from './application';
import get from 'ember-metal/get';

export default ApplicationSerializer.extend({
  normalize(type, hash, prop) {
    let referenceUrl = get(hash, 'basis.firstObject.reference');
    if (referenceUrl) {
      let splitReferernce = referenceUrl.split('/');
      let pieId = splitReferernce[splitReferernce.length - 1];
      hash.links = {
        pie: `/Pie/${pieId}`
      };
    }
    return this._super(type, hash, prop);
  }
});
