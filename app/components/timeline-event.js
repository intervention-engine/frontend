import Ember from 'ember';

export default Ember.Component.extend({
  event: null,
  isCondition: Ember.computed.equal('event.type', 'condition'),
  isMedication: Ember.computed.equal('event.type', 'medication'),
  isEncounter: Ember.computed.equal('event.type', 'encounter'),
  isRiskIncrease: Ember.computed.equal('event.type', 'riskIncreased'),
  isRiskDecrease: Ember.computed.equal('event.type', 'riskDecreased'),

  eventClass: Ember.computed('event', function() {
    if (this.get('isCondition')) {
      return 'event-condition';
    } else if (this.get('isMedication')) {
      return 'event-medication';
    } else if (this.get('isEncounter')) {
      return 'event-encounter';
    } else if (this.get('isRiskIncrease')) {
      return 'event-risk-increase';
    } else if (this.get('isRiskDecrease')) {
      return 'event-risk-decrease';
    }
    return 'event-unknown';
  }),

  iconClass: Ember.computed('event', function() {
    if (this.get('isCondition')) {
      return 'icon-med-clipboard';
    } else if (this.get('isMedication')) {
      return 'icon-medication';
    } else if (this.get('isEncounter')) {
      return 'fa fa-hospital-o';
    } else if (this.get('isRiskIncrease')) {
      return 'fa fa-arrow-circle-up text-danger';
    } else if (this.get('isRiskDecrease')) {
      return 'fa fa-arrow-circle-down text-success';
    }
    return 'event-unknown';
  })
});
