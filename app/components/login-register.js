import Component from 'ember-component';
import service from 'ember-service/inject';
import $ from 'jquery';

export default Component.extend({
  displayNavbar: service(),

  logoLargeURL: 'assets/images/logo-darkbg-lg.png',

  didInsertElement() {
    this._super(...arguments);

    this.get('displayNavbar').hide();
    $(document.body).addClass('login-register-content');
  },

  willDestroyElement() {
    this._super(...arguments);

    if (this.isDestroyed) {
      return;
    }

    this.get('displayNavbar').show();
    $(document.body).removeClass('login-register-content');
  }
});
