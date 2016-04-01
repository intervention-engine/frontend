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

        // TODO: probably needs to change back to YYY-MM-DD once https://www.pivotaltracker.com/n/projects/1179330/stories/116585331 is fixed
        valueDateTime: moment(reviewed).format('YYYY-MM-DDTHH:mm:ssZ')
      });
    }

    return obj;
  }
});
