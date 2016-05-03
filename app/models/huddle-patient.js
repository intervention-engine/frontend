import EmberObject from 'ember-object';
import computed from 'ember-computed';
import { isEmpty } from 'ember-utils';
import moment from 'moment';

export const REASON_CODES = {
  CARRYOVER: 'CARRYOVER',
  MANUAL_ADDITION: 'MANUAL_ADDITION',
  RECENT_ENCOUNTER: 'RECENT_ENCOUNTER',
  RISK_SCORE: 'RISK_SCORE'
};

export default EmberObject.extend({
  patientId: null,
  reason: null,
  reasonText: null,
  reviewed: null,

  codedReasonText: computed('reason', 'reasonText', {
    get() {
      if (this.get('reason') === REASON_CODES.MANUAL_ADDITION) {
        return 'Manually Added';
      }

      return this.get('reasonText');
    }
  }).readOnly(),

  displayReasonText: computed('reason', 'reasonText', {
    get() {
      let reasonText = this.get('reasonText');

      if (this.get('reason') === REASON_CODES.MANUAL_ADDITION) {
        return `Manually Added${isEmpty(reasonText) ? '' : ` - ${reasonText}`}`;
      }

      return reasonText;
    }
  }).readOnly(),

  toFhirJson() {
    let obj = {
      entity: {
        reference: `Patient/${this.get('patientId')}`
      },
      extension: [{
        url: 'http://interventionengine.org/fhir/extension/group/member/reason',
        valueCodeableConcept: {
          coding: [{
            system: 'http://interventionengine.org/fhir/cs/huddle-member-reason',
            code: this.get('reason')
          }],
          text: this.get('reasonText')
        }
      }]
    };

    let reviewed = this.get('reviewed');
    if (reviewed) {
      obj.extension.push({
        url: 'http://interventionengine.org/fhir/extension/group/member/reviewed',

        // TODO: probably needs to change back to YYY-MM-DD once https://www.pivotaltracker.com/n/projects/1179330/stories/116585331 is fixed
        valueDateTime: moment(reviewed).format('YYYY-MM-DDTHH:mm:ssZ')
      });
    }

    return obj;
  }
});
