import DS from 'ember-data';

export default DS.Model.extend({
  patientids: DS.hasMany('patients', {inverseOf: 'id'})
});
