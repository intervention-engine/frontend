import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('filters', function() {
    this.route('new');
    this.route('show', { path: ':id' });
  });

  this.resource('patients', function() {
    this.route('show', { path: ':id' });
    this.route('print');
  });

  this.route('login');
  this.route('utilities');

  // Registration is currently disabled
  // this.route('register');

  this.route('forgotPassword');
});

export default Router;
