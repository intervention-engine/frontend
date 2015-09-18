import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.hash({
      patients: this.store.findAll('patient'),
      populations: this.store.findAll('group'),
      // risks: this.store.findAll('risk'),
      notificationCounts: this.store.findAll('notificationCount')
    });
  }
});
