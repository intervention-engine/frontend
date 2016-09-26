import Ember from 'ember';
import Route from 'ember-route';
import service from 'ember-service/inject';
import UnuthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import PaginatedRouteMixin from 'ember-cli-pagination/remote/route-mixin';
import FHIRPagedRemoteArray from '../../utils/fhir-paged-remote-array';
import { parseHuddles } from 'ember-on-fhir/models/huddle';

const { RSVP } = Ember;

export default Route.extend(UnuthenticatedRouteMixin, PaginatedRouteMixin, {
  store: service(),
  ajax: service(),

  perPage: 8,
  huddle: null,

  activate() {
    let controller = this.controllerFor('patients.show');
    if (controller.get('huddlePatients')) {
      // Ember controllers are singletons, this means when we overwrite the computed property we lose being able to compute it.
      // If we have the controller set up when we activate THIS route we want to reset that computed property.
      controller.set('currentPatientIndex',  Ember.computed('huddlePatients', 'model', function() {
        return controller.get('huddlePatients').indexOf(controller.get('model')) + 1 + controller.get('huddleOffset');
      }));
    }
  },

  model(params) {
    let paramMapping = {
      page: '_offset',
      perPage: '_count'
    };

    let store = this.get('store');
    let perPage = this.get('perPage');
    let groupIds = [params.huddleId, params.groupId].filter((n) => n);

    Ember.$.ajaxSetup({ traditional: true });
    return RSVP.hash({
      // patients: store.findAll('patient'),
      patients: FHIRPagedRemoteArray.create({
        modelName: 'patient',
        store,
        page: params.page || 1,
        perPage,
        paramMapping,
        sortBy: params.sortBy || 'family',
        sortDescending: params.sortDescending,
        groupId: groupIds
      }),
      groups: store.query('group', { actual: false }),
      huddles: this.get('ajax').request('/Group', { data: { code: 'http://interventionengine.org/fhir/cs/huddle|HUDDLE' } }).then((response) => parseHuddles(response.entry || []))
      // risks: store.findAll('risk'),
      // notificationCounts: store.findAll('notification-count')
    });
  }
});
