import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  event: DS.attr(),
  isEnd: DS.attr('boolean', { defaultValue: false }),

  effectiveDate: Ember.computed('isEnd', 'event', function() {
    if (this.get('isEnd')) {
      return this.get('event.endDate');
    }
    return this.get('event.startDate');
  })
});
