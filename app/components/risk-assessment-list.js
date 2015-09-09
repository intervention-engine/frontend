import Ember from 'ember';

const { uuid } = Ember;

export default Ember.Component.extend({
  currentAssessment: null,
  riskAssessments: null,

  proxiedRiskAssessments: Ember.computed('currentAssessment', 'riskAssessments.[]', function() {
    let riskAssessments = this.get('riskAssessments');
    let currentAssessment = this.get('currentAssessment');
    if (Ember.isNone(riskAssessments)) {
      return [];
    }

    return riskAssessments.map(function(risk) {
      return {
        name: risk,
        id: `risk_assessment${uuid()}`,
        selected: risk === currentAssessment ? true : null
      };
    });
  }),

  actions: {
    selectRiskAssessment(riskAssessment) {
      this.sendAction('selectRiskAssessment', riskAssessment);
    }
  }
});
