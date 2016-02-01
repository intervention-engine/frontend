import Ember from 'ember';

export default Ember.Component.extend({
  patient: null,
  currentAssessment: null,
  selectedCategory: null,

  slices: Ember.computed('currentAssessment', 'patient.sortedRisks.@each.pie', function() {
    let currentAssessment = this.get('currentAssessment');
    if (currentAssessment) {
      let risk = this.get('patient.sortedRisks').filterBy('prediction.firstObject.outcome.text', this.get('currentAssessment')).get('lastObject');
      if (risk) {
        return risk.get('pie').get('sliceArray');
      }
    }

    return [
      { name: 'medications', title: 'Medications', value: 0, weight: 1 },
      { name: 'conditions', title: 'Conditions', value: 0, weight: 2 },
      { name: 'readmissions', title: 'Readmissions', value: 0, weight: 1 },
      { name: 'utilization', title: 'Utilizations', value: 5, weight: 0.5 },
      { name: 'social_barriers', title: 'Social Barriers', value: 2, weight: 1 },
      { name: 'falls', title: 'Falls', value: 1, weight: 1 }
    ];
  }),

  computedRisk: Ember.computed('patient.currentRisk', 'currentAssessment', function() {
    let currentAssessment = this.get('currentAssessment');
    let risks = this.get('patient.currentRisk');

    if (currentAssessment && risks.length > 0) {
      return risks.filterBy('key', currentAssessment)[0].value.get('value');
    }

    return 0;
  }),

  actions: {
    selectCategory(category) {
      this.sendAction('selectCategory', category);
    }
  }
});
