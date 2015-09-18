import Ember from 'ember';

export default Ember.Component.extend({
  event: null,
  isCondition: Ember.computed.equal('event.type', 'condition'),
  isMedication: Ember.computed.equal('event.type', 'medication'),
  isEncounter: Ember.computed.equal('event.type', 'encounter'),

  eventClass: Ember.computed('event', function() {
    if (this.get('isCondition')) { return 'event-condition'; }
    if (this.get('isMedication')) { return 'event-medication'; }
    if (this.get('isEncounter')) { return 'event-encounter'; }
    return 'event-unknown';
  }),

  iconClass: Ember.computed('event', function() {
    if (this.get('isCondition')) { return 'icon-med-clipboard'; }
    if (this.get('isMedication')) { return 'icon-medication'; }
    if (this.get('isEncounter')) { return 'fa fa-hospital-o'; }
    return 'event-unknown';
  })
});
