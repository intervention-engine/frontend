import Ember from 'ember';

export default Ember.Component.extend({
  patient: null,
  currentAssessment: "Stroke",

  slices: Ember.computed('currentAssessment', 'patient.sortedRisks.@each.pie', function(){
    let risk = this.get('patient.sortedRisks').filterBy('prediction.firstObject.outcome.text', this.get('currentAssessment')).get('lastObject');
    if (risk) {
      return risk.get('pie').get('sliceArray');
    } else {
      return [
      {name: 'medications', title: 'Medications', value: 0, weight: 1},
      {name: 'conditions', title: 'Conditions', value: 0, weight: 2},
      {name: 'readmissions', title: 'Readmissions', value: 0, weight: 1},
      {name: 'utilization', title: 'Utilizations', value: 5, weight: 0.5},
      {name: 'social_barriers', title: 'Social Barriers', value: 2, weight: 1},
      {name: 'falls', title: 'Falls', value: 1, weight: 1}
      ];
    }
  }),

  actions: {
    switchAssessment: function(assessment) {
      this.set("currentAssessment", assessment);
    }
  }
});
