import Route from 'ember-route';
import service from 'ember-service/inject';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  store: service(),

  model(params) {
    return this.get('store').find('group', params.id);
  }
});
