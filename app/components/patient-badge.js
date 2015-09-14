import Ember from 'ember';

export default Ember.Component.extend({
  patient: null,
  currentAssessment: null,
  maxRisk: 6, // TODO: get max risk for currentAssessment from Risk Assessment Service

  genderIconClassName: Ember.computed('patient.computedGender', function() {
    let gender = this.get('patient.computedGender');

    if (gender === 'Male') {
      return 'fa-male';
    } else if (gender === 'Female') {
      return 'fa-female';
    }

    return 'fa-user';
  }),

  ageIconClassName: Ember.computed('patient.computedAge', function() {
    let age = this.get('patient.computedAge');

    if (age <= 3) {
      return 'icon-baby';
    } else if (age <= 17) {
      return 'icon-child';
    } else if (age <= 64) {
      return 'icon-adult';
    } else if (age >= 65) {
      return 'icon-elderly';
    }

    return 'fa fa-birthday-cake';
  }),

  computedRisk: Ember.computed('patient.currentRisk', 'currentAssessment', function() {
    let currentAssessment = this.get('currentAssessment');
    let risks = this.get('patient.currentRisk');

    if (currentAssessment && risks.length > 0) {
      return risks.filterBy('key', currentAssessment)[0].value.get('value');
    }

    return 0;
  }),

  inputRisk: Ember.computed.gt('computedRisk', 0),

  _updateWidth: Ember.observer('computedRisk', function() {
    if (this.isDestroyed) {
      return;
    }

    let width = Math.floor(this.get('computedRisk') * this.get('maxRisk') * 3);
    this.element.querySelector('.patient-risk-bar').style.width = `${width}%`;
  }),

  actions: {
    selectPatient() {
      this.sendAction('selectPatient', this.get('patient'));
    }
  }
});
