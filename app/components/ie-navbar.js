import Component from 'ember-component';
import service from 'ember-service/inject';

export default Component.extend({
  session: service(),

  actions: {
    invalidateSession(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      this.get('session').invalidate();
    }
  }
});
