import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  weight: DS.attr('number'),
  value: DS.attr('value'),
  maxValue: DS.attr('number')
});
