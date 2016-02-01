import DS from 'ember-data';

export default DS.Model.extend({
  patient: DS.belongsTo('patient', { async: true, inverse: 'notifications' }),
  count: DS.attr('number')
});
