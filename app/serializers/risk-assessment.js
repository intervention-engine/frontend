import DS from 'ember-data';
import ApplicationSerializer from './application'

export default ApplicationSerializer.extend({
  normalize: function(type, hash, prop) {
    let referenceUrl = hash.basis[0].reference
    let splitReferernce = referenceUrl.split('/');
    let pieId = splitReferernce[splitReferernce.length - 1];
    hash["links"] = {
      pie: "/Pie/" + pieId
    }
    return this._super(type, hash, prop)
  }
});