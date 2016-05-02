import Route from 'ember-route';
import service from 'ember-service/inject';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  store: service(),

  model() {
    return this.get('store').createRecord('group');
  },

  resetController(controller, isExiting/*, transition*/) {
    if (isExiting) {
      controller.set('filterName', null);
    }
  }
});