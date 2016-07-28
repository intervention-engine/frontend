import Component from 'ember-component';

export default Component.extend({
  showLogoutModal: false,

  actions: {
    openLogoutModal(event) {
      event.preventDefault();
      this.set('showLogoutModal', true);
    }
  }
});
