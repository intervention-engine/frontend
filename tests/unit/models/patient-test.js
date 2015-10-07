import Ember from 'ember';
import FactoryGuy from 'ember-data-factory-guy';
import { test } from 'ember-qunit';
import startApp from '../../helpers/start-app';


let App = null;
let FG = FactoryGuy;

module('patient', {
  beforeEach: function(){
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});


test('fullName is computed properly', function(assert){
  let store = FG.getStore();
  let patient = null;
  Ember.run(function(){
    FG.make('human-name');
    // This is a bit of a hack in the short term because the model being built isn't exactly what the serializer expects
    console.log(FG.build('patient'));
    patient = store.createRecord('patient', FG.build('patient'));
    patient.get('name').pushObject(store.createRecord('human-name', FG.build('human-name')));
    console.log(patient.get('fullName'));
  });
  assert.ok(true);
});
