import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  displayText: DS.attr('string', { defaultValue: '' }),
  isEnd: DS.attr('boolean', { defaultValue: false }),
  deltaRisk: DS.attr('number', { defaultValue: 0.0 }),
  effectiveDate: Ember.computed('isEnd', 'event', function() {
    if (this.get('isEnd')) {
      return this.get('event.endDate');
    }
    return this.get('event.startDate');
  })
});
