import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onSave() {
      this.transitionTo('filters.index');
    }
  }
});
