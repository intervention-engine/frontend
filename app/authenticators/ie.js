import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

var IEAuthenticator = Base.extend({
        tokenEndpoint: '/login',

        restore: function(data) {
          return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
              resolve(data);
            } else {
              reject();
            }
          });
        },

        authenticate: function(credentials) {
          var _this = this;
          return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
              url:         _this.tokenEndpoint,
              type:        'POST',
              data:        JSON.stringify({ session: { identification: credentials.identification, password: credentials.password } }),
              contentType: 'application/json'
            }).then(function(response) {
              Ember.run(function() {
                resolve({ token: response.session.token });
              });
            }, function(xhr) {
              var response = JSON.parse(xhr.responseText);
              Ember.run(function() {
                reject(response.error);
              });
            });
          });
        },

        invalidate: function() {
          var _this = this;
          return new Ember.RSVP.Promise(function(resolve) {
            Ember.$.ajax({ url: _this.tokenEndpoint, type: 'DELETE' }).always(function() {
              resolve();
            });
          });
        },
      });

export default IEAuthenticator;
