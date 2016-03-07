import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:ie',

  pathForType(type) {
    return Ember.String.capitalize(Ember.String.camelize(type));
  }
});
