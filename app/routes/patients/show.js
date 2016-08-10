import Route from 'ember-route';
import service from 'ember-service/inject';
import { parseHuddles } from 'ember-on-fhir/models/huddle';

export default Route.extend({
  store: service(),
  ajax: service(),

  model(params/*, transition */) {
    return this.get('store').find('patient', params.id);
  },

  afterModel(model/*, transition */) {
    return this.get('ajax').request('/Group', {
      data: {
        code: 'http://interventionengine.org/fhir/cs/huddle|HUDDLE',
        member: `Patient/${model.get('id')}`
      }
    }).then((response) => {
      let controller = this.controllerFor('patients.show');
      controller.set('huddles', parseHuddles(response.entry || []));
    });
  }
});
