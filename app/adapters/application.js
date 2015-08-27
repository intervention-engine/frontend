import Ember from 'ember';
import DS from 'ember-data';

let ApplicationAdapter = DS.RESTAdapter.extend({
  pathForType: function(type){
    return Ember.String.capitalize(Ember.String.camelize(type));
  }
});

export default ApplicationAdapter;
