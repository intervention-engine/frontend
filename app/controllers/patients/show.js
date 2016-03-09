import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  currentAssessment: 'Stroke',
  selectedCategory: null,
  showAddInterventionModal: false,
  showAddHuddleModal: false,
  showReviewPatientModal: false,
  defaultAddHuddleDate: null,
  huddles: computed({
    get() {
      return [];
    }
  }),

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
    },

    openAddHuddleModal(date) {
      this.set('showAddHuddleModal', true);
      this.set('defaultAddHuddleDate', date);
    },

    hideAddHuddleModal() {
      this.set('showAddHuddleModal', false);
    },

    openReviewPatientModal(huddle) {
      this.set('showReviewPatientModal', true);
      this.set('ReviewPatientHuddle', huddle);
    },

    hideReviewPatientModal() {
      this.set('showReviewPatientModal', false);
    }
  }
});
