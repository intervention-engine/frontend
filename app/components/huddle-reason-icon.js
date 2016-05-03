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
        return this.get('huddlePatient.codedReasonText');
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
      switch (this.get('huddlePatient.reason')) {
        case REASON_CODES.CARRYOVER:
          return 'fa fa-fw fa-arrow-circle-o-right';
        case REASON_CODES.MANUAL_ADDITION:
          return 'fa fa-fw fa-pencil';
        case REASON_CODES.RECENT_ENCOUNTER:
          return 'fa fa-fw fa-hospital-o';
        case REASON_CODES.RISK_SCORE:
          return 'fa fa-fw fa-pie-chart';
        default:
          return 'hidden';
      }
    }
  })
});
