import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize(type, hash, prop) {
    let newHash = {
      patient: hash.Id,
      risk: hash.Value.Risk
    };

    return this._super(type, newHash, prop);
  }
});
