import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  currentAssessment: 'Stroke',
  selectedCategory: null,
  showAddInterventionModal: false,

  riskAssessments: computed({
    get() {
      // TODO: get this list from the backend
      return ['Stroke', 'Negative Outcome'];
    }
  }),

  actions: {
    setRiskAssessment(riskAssessment) {
      this.set('currentAssessment', riskAssessment);
      this.set('selectedCategory', null);
    },

    selectCategory(category) {
      this.set('selectedCategory', category);
    },

    openAddInterventionModal() {
      this.set('showAddInterventionModal', true);
    },

    hideAddInterventionModal() {
      this.set('showAddInterventionModal', false);
    }
  }
});
