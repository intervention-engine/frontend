import Service from 'ember-service';

export default Service.extend({
  displayNavbar: true,

  show() {
    this.set('displayNavbar', true);
  },

  hide() {
    this.set('displayNavbar', false);
  }
});
