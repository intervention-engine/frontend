import Ember from 'ember';
import PatientIconClassNames from '../mixins/patient-icon-class-names';

export default Ember.Component.extend(PatientIconClassNames, {
  patient: null,
  currentAssessment: null,
  currentPatient: null,
  maxRisk: 6, // TODO: get max risk for currentAssessment from Risk Assessment Service

  active: Ember.computed('patient', 'currentPatient', function() {
    return this.get('patient') === this.get('currentPatient');
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
  }).on('didRender'),

  actions: {
    selectPatient() {
      this.sendAction('selectPatient', this.get('patient'));
    }
  }
});
