import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import FHIRPagedRemoteArray from '../../utils/fhir-paged-remote-array';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  perPage: 8,
  model: function(params) {
    params.paramMapping = {
      page: "_offset",
      perPage: "_count"
    };
    let store = this.store;
    let perPage = this.perPage;
    return Ember.RSVP.hash({

      // patients: this.store.findAll('patient'),
      patients: FHIRPagedRemoteArray.create({modelName: 'patient',
                                      store: store,
                                      perPage: perPage,
                                      paramMapping: params.paramMapping
                                    }),
      populations: this.store.findAll('group'),
      // risks: this.store.findAll('risk'),
      notificationCounts: this.store.findAll('notificationCount')
    });
  }
});
