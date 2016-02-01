import Component from 'ember-component';
import computed from 'ember-computed';

export default Component.extend({
  currentAssessment: null,
  riskAssessments: computed({
    get() {
      return [];
    }
  })
});
