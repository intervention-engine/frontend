import Route from 'ember-route';
import service from 'ember-service/inject';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  store: service(),

  model() {
    return this.get('store').findAll('group');
  }
});
