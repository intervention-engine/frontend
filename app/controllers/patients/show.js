import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  currentAssessment: 'Stroke',
  riskAssessments: computed({
    get() {
      // TODO: get this list from the backend
      return ['Stroke', 'Negative Outcome'];
    }
  }),

  actions: {
    setRiskAssessment(riskAssessment) {
      this.set('currentAssessment', riskAssessment);
    }
  }
});
