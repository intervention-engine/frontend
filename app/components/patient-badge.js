import Component from 'ember-component';
import computed from 'ember-computed';
import service from 'ember-service/inject';
import PatientIconClassNames from '../mixins/patient-icon-class-names';
import { isTodayOrAfter } from 'ember-on-fhir/helpers/is-today-or-after';

export default Component.extend(PatientIconClassNames, {
  classNames: ['patient-badge'],

  routing: service('-routing'),

  patient: null,
  assessment: null,
  maxRisk: 4, // TODO: get max risk for currentAssessment from Risk Assessment Service

  nextHuddle: computed('huddles.@each.date', {
    get() {
      let huddles = this.get('huddles').filter((huddle) => isTodayOrAfter([huddle.get('date')]));
      return huddles.sortBy('date').objectAt(0);
    }
  }),

  computedRisk: computed('patient.currentRisk', 'assessment', {
    get() {
      let assessment = this.get('assessment');
      let risks = this.get('patient.currentRisk');

      if (assessment && risks.length > 0) {
        return risks.filterBy('key', assessment)[0].value.get('value');
      }

      return 0;
    }
  }).readOnly(),

  displayRiskScore: computed.gt('computedRisk', 0),

  didRender() {
    this._super(...arguments);

    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    let riskBar = this.element.querySelector('.patient-risk-bar');
    if (riskBar) {
      let width = Math.floor(this.get('computedRisk') * this.get('maxRisk') * 3);
      riskBar.style.width = `${width}%`;
    }
  },

  click(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.get('routing').transitionTo('patients.show', [this.get('patient')]);
  }
});
