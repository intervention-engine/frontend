import Component from 'ember-component';
import computed from 'ember-computed';
import { isTodayOrAfter } from 'ember-on-fhir/helpers/is-today-or-after';

export default Component.extend({
  tagName: 'tr',

  patient: null,
  huddles: null,
  riskAssessment: null,

  nextHuddle: computed('huddles.@each.date', {
    get() {
      let huddles = this.get('huddles').filter((huddle) => isTodayOrAfter([huddle.get('date')]));
      return huddles.sortBy('date').objectAt(0);
    }
  }),

  huddlePatient: computed('nextHuddle', 'patient', {
    get() {
      let nextHuddle = this.get('nextHuddle');
      if (nextHuddle) {
        return nextHuddle.getHuddlePatient(this.get('patient'));
      }

      return null;
    }
  }),

  computedRisk: computed('riskAssessment', {
    get() {
      let riskAssessment = this.get('riskAssessment');
      if (riskAssessment) {
        return riskAssessment.get('value') || null;
      }
      return null;
    }
  }).readOnly()
});
