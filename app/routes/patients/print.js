import Ember from 'ember';
import Route from 'ember-route';
import service from 'ember-service/inject';
import get from 'ember-metal/get';
import { isEmpty } from 'ember-utils';
import { parseHuddles } from 'ember-on-fhir/models/huddle';

const { RSVP } = Ember;

export default Route.extend({
  store: service(),
  ajax: service(),

  queryParams: {
    sortBy: { refreshModel: true },
    sortDescending: { refreshModel: true },
    assessment: { refreshModel: true },
    huddleId: { refreshModel: true },
    groupId: { refreshModel: true },
    name: { refreshModel: true }
  },

  huddle: null,

  beforeModel(transition) {
    let huddleId = get(transition, 'queryParams.huddleId');
    if (huddleId) {
      return this.get('ajax').request(`/Group/${huddleId}`).then((response) => {
        this.set('huddle', parseHuddles(response));
      });
    }

    this.set('huddle', null);
  },

  model(params) {
    let hash = {
      patients: this.get('store').query('patient', patientParams(params, this.get('huddle'))),
      huddles: this.get('ajax').request('/Group', { data: { code: 'http://interventionengine.org/fhir/cs/huddle|HUDDLE' } }).then((response) => parseHuddles(response.entry || []))
    };

    if (params.groupId) {
      hash.group = this.get('store').find('group', params.groupId);
    }

    return new RSVP.Promise((resolve) => {
      RSVP.hash(hash).then((response) => {
        let patientIds = response.patients.mapBy('id');
        let riskParams = {
          method: `http://interventionengine.org/risk-assessments|${methodFromAssessment(params.assessment)}`,
          _tag: 'http://interventionengine.org/tags/|MOST_RECENT',
          'subject:Patient': patientIds.join(',')
        };

        this.get('store').query('risk-assessment', riskParams).then((risks) => {
          resolve(Object.assign({ risks }, response));
        });
      });
    });
  }
});

function patientParams(params, huddle) {
  let patientParams = { _count: 0 };
  let { sortBy, sortDescending } = params;

  if (!isEmpty(sortBy)) {
    patientParams._sort = `${sortDescending === 'true' ? '-' : ''}${sortBy}`;
  }

  let { groupId } = params;
  if (!isEmpty(groupId)) {
    Object.assign(patientParams, {
      _query: 'group',
      groupId
    });
  }

  if (huddle) {
    let patientIds = huddle.get('patients').mapBy('patientId');
    patientParams._id = patientIds.join(',');
  }

  let { name } = params;
  if (name) {
    patientParams.name = name;
  }

  return patientParams;
}

// TODO: find a better way to fetch this value
function methodFromAssessment(assessment) {
  if (assessment === 'Catastrophic Health Event') {
    return 'MultiFactor';
  }
}
