import Ember from 'ember';

export default Ember.Component.extend({
  patient: null,

  actions: {
    selectPatient() {
      this.sendAction('selectPatient', this.get('patient'));
    }
  }
});
