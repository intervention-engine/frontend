import Component from 'ember-component';
import computed from 'ember-computed';
import { isTodayOrAfter } from 'ember-on-fhir/helpers/is-today-or-after';

export default Component.extend({
  tagName: 'tr',

  patient: null,
  huddles: null,
  assessment: null,

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

  computedRisk: computed('patient.currentRisk', 'assessment', {
    get() {
      let assessment = this.get('assessment');
      let risks = this.get('patient.currentRisk');

      console.debug(assessment)

      if (assessment && risks.length > 0) {
        return risks.filterBy('key', assessment).get('firstObject.value.value') || null;
      }

      return null;
    }
  }).readOnly()
});
