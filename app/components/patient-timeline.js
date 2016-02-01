import Ember from 'ember';

export default Ember.Component.extend({
  patient: null,
  searchTimeline: '',

  filteredEvents: Ember.computed('patient.events', 'searchTimeline', function() {
    let rx = new RegExp(this.get('searchTimeline'), 'gi');
    return this.get('patient.events').filter(function(e) {
      return e.get('event.text').toString().match(rx);
    });
  })
});
