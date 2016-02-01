import Controller from 'ember-controller';
import computed from 'ember-computed';
import EmberValidations from 'ember-validations';
import service from 'ember-service/inject';
import emailRegex from '../utils/email-validation-regex';
import validatedClassNames from '../utils/validation-group-classnames';

export default Controller.extend(EmberValidations, {
  queryParams: ['registered'],

  session: service(),

  mitreURL: 'http://www.mitre.org/',
  interventionEnginURL: 'http://www.interventionengine.org',

  identification: null,
  password: null,
  registered: false,
  loginFailed: false,
  loggingIn: false,
  displayErrors: false,

  disableLoginBtn: computed('loggingIn', 'displayErrors', 'isValid', function disableLoginBtn() {
    if (this.get('loggingIn') || (this.get('displayErrors') && !this.get('isValid'))) {
      return true;
    }

    return null;
  }),

  validations: {
    identification: {
      presence: true,
      format: {
        'with': emailRegex,
        allowBlank: true,
        message: 'not a valid email'
      }
    },
    password: {
      length: {
        minimum: 8,
        messages: {
          tooShort: 'must be at least 8 characters'
        }
      }
    }
  },

  identificationClassNames: validatedClassNames('identification'),
  passwordClassNames: validatedClassNames('password'),

  actions: {
    authenticate() {
      if (this.get('loggingIn')) {
        return;
      }

      this.set('displayErrors', true);
      this.validate().then(() => {
        this.set('loggingIn', true);

        let { identification, password } = this.getProperties('identification', 'password');
        this.get('session').authenticate('authenticator:ie', identification, password).then(loginSuccess.bind(this)).catch(loginError.bind(this));
      });
    },

    clearErrors() {
      this.set('errorMessage', null);
    },

    clearRegistered() {
      this.set('registered', false);
    }
  }
});

function loginSuccess() {
  this.set('loggingIn', false);
}

function loginError(message) {
  this.set('loggingIn', false);
  this.set('errorMessage', message);
}
