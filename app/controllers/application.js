import Controller from 'ember-controller';
import service from 'ember-service/inject';
import computed from 'ember-computed';

export default Controller.extend({
  displayNavbarService: service('display-navbar'),
  displayNavbar: computed.reads('displayNavbarService.displayNavbar')
});
