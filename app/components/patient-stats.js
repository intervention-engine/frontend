import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['patient-stats'],

  condition: null,

  conditionText: Ember.computed.reads('condition.displayText')
});
