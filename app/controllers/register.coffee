`import Ember from 'ember'`
`import EmberValidations from 'ember-validations'`
`import emailRegex from '../utils/email-validation-regex'`
`import validatedClassNames from '../utils/validation-group-classnames'`

RegisterController = Ember.Controller.extend(EmberValidations, {
  registering: false
  identification: null
  password: null
  passwordConfirmation: null
  displayErrors: false
  errorMessage: null

  disableRegisterBtn: Ember.computed('registering', 'displayErrors', 'isValid', ->
    return true if @get('registering') || (@get('displayErrors') && !@get('isValid'))
    null
  )

  validations: {
    identification: {
      presence: true
      format: {
        with: emailRegex
        allowBlank: true
        message: 'not a valid email'
      }
    },
    password: {
      confirmation: true
      length: {
        minimum: 8
        messages: {
          tooShort: 'must be at least 8 characters'
        }
      }
    },
    passwordConfirmation: {
      presence: true
    }
  }

  identificationClassNames: validatedClassNames('identification')
  passwordClassNames: validatedClassNames('password')
  passwordConfirmationClassNames: validatedClassNames('passwordConfirmation')

  actions: {
    register: ->
      return if @get('registering')

      @set('displayErrors', true)

      @validate().then(=>
        @set('registering', true)

        credentials = {
          identification: @get('identification')
          password: @get('password')
          confirmation: @get('passwordConfirmation')
        }

        ajaxParams = {
          url: '/register',
          type: 'POST',
          data: JSON.stringify(credentials),
          contentType: 'application/json'
        }

        successFn = =>
          @transitionTo('login', { queryParams: { registered: true } })

        errorFn = (xhr) =>
          Ember.run(=>
            response = JSON.parse(xhr.responseText)
            @set('errorMessage', response.error)
            @set('registering', false)
          )

        Ember.$.ajax(ajaxParams).then(successFn, errorFn)
        return
      )

      return

    clearErrors: ->
      @set('errorMessage', null)
  }
})

`export default RegisterController`