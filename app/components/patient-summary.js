import Ember from 'ember';

let PatientSummaryComponent = Ember.Component.extend({
  patient: null,
  currentAssessment: "Stroke",

  risksWithBirthdayStart: Ember.computed('patient.sortedRisks', 'patient.birthDate', 'currentAssessment', function(){
    let birthRisk = this.get('patient.store').createRecord("risk-assessment", {date: this.get('patient.birthDate')})
    let riskCode = this.get('patient.store').createRecord("codeable-concept", {text: "Stroke"});
    let rapc = this.get('patient.store').createRecord("risk-assessment-prediction-component", {probabilityDecimal: 0});
    rapc.set('outcome', riskCode);
    birthRisk.get('prediction').pushObject(rapc);
    let risks = [birthRisk];
    risks.pushObjects(this.get('patient.sortedRisks'));
    return risks.filterBy('prediction.firstObject.outcome.text', this.get("currentAssessment"));
  }),

  actions: {
    switchAssessment: function() {
      this.set("currentAssessment", "Negative Outcome");
      this.sendAction();
    }
  }
});

export default PatientSummaryComponent;