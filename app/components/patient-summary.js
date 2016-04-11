import Ember from 'ember';
import service from 'ember-service/inject';
import PatientIconClassNames from '../mixins/patient-icon-class-names';

export default Ember.Component.extend(PatientIconClassNames, {
  classNames: ['patient-summary'],
  store: service(),

  patient: null,
  currentAssessment: null,
  huddle: null,

  risksWithBirthdayStart: Ember.computed('patient.sortedRisks', 'patient.birthDate', 'currentAssessment', function() {
    let currentAssessment = this.get('currentAssessment');
    if (Ember.isNone(currentAssessment)) {
      return [];
    }

    let store = this.get('store');

    let birthRisk = store.createRecord('risk-assessment', { date: this.get('patient.birthDate') });
    let riskCode = store.createRecord('codeable-concept', { text: currentAssessment });
    let rapc = store.createRecord('risk-assessment-prediction-component', { probabilityDecimal: 0 });
    rapc.set('outcome', riskCode);
    birthRisk.get('prediction').pushObject(rapc);
    let risks = [birthRisk];
    risks.pushObjects(this.get('patient.sortedRisks'));
    return risks.filterBy('prediction.firstObject.outcome.displayText', currentAssessment);
  }),

  computedRisk: Ember.computed('patient.currentRisk', 'currentAssessment', function() {
    let currentAssessment = this.get('currentAssessment');
    let risks = this.get('patient.currentRisk');

    if (currentAssessment && risks.length > 0) {
      return risks.filterBy('key', currentAssessment)[0].value.get('value');
    }

    return 0;
  }),

  patientPhoto: Ember.computed.reads('patient.photo')
});
