import Component from 'ember-component';
import computed from 'ember-computed';
import { REASON_CODES } from 'ember-on-fhir/models/huddle-patient';

export default Component.extend({
  tagName: 'i',
  classNameBindings: ['reasonIconClass'],

  huddle: null,
  patient: null,

  didInsertElement() {
    this._super(...arguments);

    this.$().tooltip({
      container: 'body',
      title: () => {
        return this.get('huddlePatient.reasonText');
      }
    });
  },

  willDestoryElement() {
    this._super(...arguments);
    this.$().tooltip('destroy');
  },

  huddlePatient: computed('huddle', 'patient', {
    get() {
      let huddle = this.get('huddle');
      if (huddle) {
        return huddle.getHuddlePatient(this.get('patient'));
      }
    }
  }),

  reasonIconClass: computed('huddlePatient.reason', {
    get() {
      let reason = this.get('huddlePatient.reason');
      if (reason === REASON_CODES.CARRYOVER) {
        return 'fa fa-fw fa-arrow-circle-o-right';
      } else if (reason === REASON_CODES.MANUAL_ADDITION) {
        return 'fa fa-fw fa-pencil';
      } else if (reason === REASON_CODES.RECENT_ADMISSION) {
        return 'fa fa-fw fa-h-square';
      } else if (reason === REASON_CODES.RECENT_ED_VISIT) {
        return 'fa fa-fw fa-ambulance';
      } else if (reason === REASON_CODES.RECENT_READMISSION) {
        return 'fa fa-fw fa-hospital-o';
      } else if (reason === REASON_CODES.RISK_SCORE) {
        return 'fa fa-fw fa-pie-chart';
      }

      return 'hidden';
    }
  })
});
