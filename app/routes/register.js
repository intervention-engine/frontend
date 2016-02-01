import Route from 'ember-route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('identification', null);
      controller.set('password', null);
      controller.set('passwordConfirmation', null);
      controller.set('displayErrors', false);
      controller.set('errorMessage', null);
      controller.set('disableRegisterBtn', null);
    }
  }
});
