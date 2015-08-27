import Group from 'ember-fhir-adapter/serializers/group';


let GroupSerializer = Group.extend({
  normalize: function(type, hash, prop){
    (hash.content||hash)["links"] = {
      groupList: `/GroupList/${hash.id}`
    };
    return this._super(type, hash, prop);
  }
});

export default GroupSerializer;
