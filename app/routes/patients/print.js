import Ember from 'ember';
import Route from 'ember-route';
import service from 'ember-service/inject';
import { parseHuddles } from 'ember-on-fhir/models/huddle';

const { RSVP } = Ember;

export default Route.extend({
  store: service(),
  ajax: service(),

  model() {
    return RSVP.hash({
      patients: this.get('store').query('patient', { _count: 0 }),
      huddles: this.get('ajax').request('/Group', { data: { code: 'http://interventionengine.org/fhir/cs/huddle|HUDDLE' } }).then((response) => parseHuddles(response.entry || []))
    });
  }
});
