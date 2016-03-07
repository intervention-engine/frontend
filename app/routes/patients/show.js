import Route from 'ember-route';
import service from 'ember-service/inject';

export default Route.extend({
  store: service(),

  model(params/*, transition */) {
    return this.get('store').find('patient', params.id);
  }
});
