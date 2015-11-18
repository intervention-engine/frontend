import Group from 'ember-fhir-adapter/serializers/group';


let GroupSerializer = Group.extend({
  attrs:{
    groupList: {serialize: false}
  },
  normalize: function(type, hash, prop){
    (hash.content||hash)["links"] = {
      groupList: `/GroupList/${hash.id}`
    };
    hash.type = hash.type || "unknown";
    return this._super(type, hash, prop);
  }

});

export default GroupSerializer;
