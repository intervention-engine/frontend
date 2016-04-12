import EmberObject from 'ember-object';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import { A } from 'ember-array/utils';
import { assert } from 'ember-metal/utils';
import { isEmberArray } from 'ember-array/utils';
import HuddlePatient from './huddle-patient';
import moment from 'moment';

const Huddle = EmberObject.extend({
  id: null,
  date: null,
  leader: null,
  type: 'person',
  actual: true,
  name: '',
  patients: computed({
    get() {
      return new A();
    }
  }),
  patientIds: computed.mapBy('patients', 'patientId'),

  displayLeader: computed('leader', {
    get() {
      return `${this.get('leader')}`.replace(/^[^/]+\//, '');
    }
  }).readOnly(),

  addPatient(patient) {
    let huddlePatient = HuddlePatient.create({
      patientId: patient.get('id'),
      reason: 'MANUAL_ADDITION',
      reasonText: 'Manually Added'
    });
    this.get('patients').pushObject(huddlePatient);
  },

  getHuddlePatient(patient) {
    if (patient != null) {
      return this.get('patients').findBy('patientId', get(patient, 'id'));
    }
  },

  hasPatient(patient) {
    if (patient == null) {
      return false;
    }
    return this.get('patientIds').contains(get(patient, 'id'));
  },

  patientReviewed(patient) {
    let huddlePatient = this.getHuddlePatient(patient);
    if (huddlePatient != null) {
      return huddlePatient.get('reviewed') != null;
    }

    return false;
  },

  toFhirJson() {
    let id = this.get('id');
    // TODO: probably needs to change back to YYY-MM-DD once https://www.pivotaltracker.com/n/projects/1179330/stories/116585331 is fixed
    let huddleDate = moment(this.get('date')).format('YYYY-MM-DDTHH:mm:ssZ');
    let obj = {
      resourceType: 'Group',
      meta: {
        profile: ['http://interventionengine.org/fhir/profile/huddle']
      },
      extension: [
        { url: 'http://interventionengine.org/fhir/extension/group/activeDateTime', valueDateTime: huddleDate },
        { url: 'http://interventionengine.org/fhir/extension/group/leader', valueReference: { reference: this.get('leader') } }
      ],
      type: this.get('type'),
      actual: this.get('actual'),
      code: {
        coding: [ { system: 'http://interventionengine.org/fhir/cs/huddle', code: 'HUDDLE' } ],
        text: 'Huddle'
      },
      name: this.get('name'),
      member: this.get('patients').map((patient) => patient.toFhirJson())
    };
    if (id) {
      obj.id = id;
    }

    return obj;
  }
});

export default Huddle;

export function parseHuddles(huddleList) {
  if (isEmberArray(huddleList)) {
    let huddles = new Array(huddleList.length);
    for (let i = 0; i < huddleList.length; i++) {
      let group = huddleList[i];
      huddles[i] = huddleFromGroup(group);
    }

    return huddles;
  } else {
    return huddleFromGroup({ resource: huddleList });
  }
}

function huddleFromGroup(group) {
  let { resource } = group;
  let code = get(resource, 'code.coding.firstObject.code');

  assert(`Found non-huddle group (code \`${code}\`) when expecting huddle`, `${code}`.toUpperCase() === 'HUDDLE');

  let options = {
    id: get(resource, 'id'),
    name: get(resource, 'name'),
    type: get(resource, 'type'),
    actual: get(resource, 'actual')
  };

  extractExtensions(options, resource.extension || []);
  extractPatients(options, resource.member || []);

  return Huddle.create(options);
}

function extractExtensions(options, extensions) {
  for (let i = 0; i < extensions.length; i++) {
    let extension = extensions[i];
    let { url } = extension;

    if (url === 'http://interventionengine.org/fhir/extension/group/activeDateTime') {
      options.date = moment(extension.valueDateTime).toDate();
    } else if (url === 'http://interventionengine.org/fhir/extension/group/leader') {
      options.leader = extension.valueReference.reference;
    }
  }
}

function extractPatients(options, members) {
  let patients = new Array(members.length);
  for (let i = 0; i < members.length; i++) {
    let member = members[i];
    let patientOptions = {
      patientId: `${get(member, 'entity.reference')}`.replace(/^Patient\//, '')
    };
    extractPatientExtensions(patientOptions, get(member, 'extension') || []);
    patients[i] = HuddlePatient.create(patientOptions);
  }

  options.patients = new A(patients);
}

function extractPatientExtensions(options, extensions) {
  for (let i = 0; i < extensions.length; i++) {
    let extension = extensions[i];
    let { url } = extension;

    if (url === 'http://interventionengine.org/fhir/extension/group/member/reason') {
      options.reason = get(extension, 'valueCodeableConcept.coding.firstObject.code');
      options.reasonText = get(extension, 'valueCodeableConcept.text');
    } else if (url === 'http://interventionengine.org/fhir/extension/group/member/reviewed') {
      options.reviewed = moment(extension.valueDateTime).toDate();
    }
  }
}
