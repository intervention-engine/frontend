import EmberObject from 'ember-object';
import moment from 'moment';

export default EmberObject.extend({
  patientId: null,
  reason: null,
  reasonText: null,
  reviewed: null,

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
        valueDateTime: moment(reviewed).format('YYYY-MM-DD')
      });
    }

    return obj;
  }
});
