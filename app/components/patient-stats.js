import Ember from 'ember';

export default Ember.Component.extend({
  condition: null,

  conditionText: Ember.computed('condition.text', function() {
    return this.get('condition.text');
  })
});
