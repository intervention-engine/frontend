import Ember from 'ember';

var RegistrationController = Ember.Controller.extend({
  actions: {
    register: function(){

      var _this, credentials;
      _this = this;
      credentials = this.getProperties('identification', 'password', 'confirmation');

      return Ember.$.ajax({
        url:         '/register',
        type:        'POST',
        data:        JSON.stringify( { identification: credentials.identification, password: credentials.password, confirmation: credentials.confirmation } ),
        contentType: 'application/json'
      }).then((function(response){

        return Ember.run((function() {

          console.log("Registration succeeded");

          _this.get('session').authenticate('authenticator:ie', {
            identification: credentials.identification,
            password: credentials.password
          });

          return _this.send("registrationSucceeded", response);

        }));

      }), (function(xhr, status, error) {

        return Ember.run((function() {
          return _this.send("registrationFailed", xhr, status, error);
        }));

      }));

    },

    registrationSucceeded: function(response) {
      return console.log("Registration Succeeded: " + (Ember.inspect(response)));
    },

    registrationFailed: function(xhr, status) {
      console.log("Registration Failed: " + status);
      var response = JSON.parse(xhr.responseText);
      console.log(response);
      this.set('errorMessage', response.error);
    }

  }
});

export default RegistrationController;
