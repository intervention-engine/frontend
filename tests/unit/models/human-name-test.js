import Ember from 'ember';
import FactoryGuy from 'ember-data-factory-guy';
import { test } from 'ember-qunit';
import startApp from '../../helpers/start-app';


let App = null;
let FG = FactoryGuy;

module('human-name', {
  beforeEach: function(){
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});


test('it exists', function(assert){
  let store = FG.getStore();
  let female = null;
  Ember.run(function(){
    // This is a bit of a hack in the short term because the model being built isn't exactly what the serializer expects
    female = store.createRecord('human-name', FG.build('human-name', 'female'));
  });
  assert.equal(female.get('given'), 'Daisy');
  assert.ok(true);
});
