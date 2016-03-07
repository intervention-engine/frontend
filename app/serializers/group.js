import GroupSerializer from 'ember-fhir-adapter/serializers/group';

export default GroupSerializer.extend({
  normalize(type, hash) {
    (hash.content || hash).links = {
      groupList: `/GroupList/${hash.id}`
    };
    hash.type = hash.type || 'unknown';
    return this._super(...arguments);
  }
});
