import Controller from 'ember-controller';
import computed from 'ember-computed';
import run from 'ember-runloop';
import service from 'ember-service/inject';
import EmberValidations from 'ember-validations';
import emailRegex from '../utils/email-validation-regex';
import validatedClassNames from '../utils/validation-group-classnames';

export default Controller.extend(EmberValidations, {
  ajax: service(),

  registering: false,
  identification: null,
  password: null,
  passwordConfirmation: null,
  displayErrors: false,
  errorMessage: null,

  disableRegisterBtn: computed('registering', 'displayErrors', 'isValid', function disableRegisterBtn() {
    if (this.get('registering') || (this.get('displayErrors') && !this.get('isValid'))) {
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
      confirmation: true,
      length: {
        minimum: 8,
        messages: {
          tooShort: 'must be at least 8 characters'
        }
      }
    },
    passwordConfirmation: {
      presence: true
    }
  },

  identificationClassNames: validatedClassNames('identification'),
  passwordClassNames: validatedClassNames('password'),
  passwordConfirmationClassNames: validatedClassNames('passwordConfirmation'),

  actions: {
    register() {
      if (this.get('registering')) {
        return;
      }

      this.set('displayErrors', true);
      this.validate().then(() => {
        this.set('registering', true);

        let credentials = {
          identification: this.get('identification'),
          password: this.get('password'),
          confirmation: this.get('passwordConfirmation')
        };

        let ajaxParams = {
          type: 'POST',
          data: JSON.stringify(credentials),
          contentType: 'application/json'
        };

        this.get('ajax').request('/register', ajaxParams).then(registerSuccess.bind(this), registerError.bind(this));
      });
    },

    clearErrors() {
      this.set('errorMessage', null);
    }
  }
});

function registerSuccess() {
  this.transitionTo('login', {
    queryParams: {
      registered: true
    }
  });
}

function registerError(error) {
  run(() => {
    let response = JSON.parse(error.payload);
    this.set('errorMessage', response.error);
    this.set('registering', false);
  });
}
