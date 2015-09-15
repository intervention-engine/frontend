import Ember from 'ember';

export default Ember.Component.extend({
  patient: null,
  currentAssessment: null,

  risksWithBirthdayStart: Ember.computed('patient.sortedRisks', 'patient.birthDate', 'currentAssessment', function(){
    let currentAssessment = this.get('currentAssessment');
    if (Ember.isNone(currentAssessment)) {
      return [];
    }

    let birthRisk = this.get('patient.store').createRecord("risk-assessment", {date: this.get('patient.birthDate')});
    let riskCode = this.get('patient.store').createRecord("codeable-concept", {text: currentAssessment});
    let rapc = this.get('patient.store').createRecord("risk-assessment-prediction-component", {probabilityDecimal: 0});
    rapc.set('outcome', riskCode);
    birthRisk.get('prediction').pushObject(rapc);
    let risks = [birthRisk];
    risks.pushObjects(this.get('patient.sortedRisks'));
    return risks.filterBy('prediction.firstObject.outcome.text', currentAssessment);
  }),

  computedRisk: Ember.computed('patient.currentRisk', 'currentAssessment', function() {
    let currentAssessment = this.get('currentAssessment');
    let risks = this.get('patient.currentRisk');

    if (currentAssessment && risks.length > 0) {
      return risks.filterBy('key', currentAssessment)[0].value.get('value');
    }

    return 0;
  }),

  patientPhoto: Ember.computed('patient.photo')
});
