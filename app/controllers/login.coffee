`import Ember from 'ember'`
`import EmberValidations from 'ember-validations'`
`import emailRegex from '../utils/email-validation-regex'`
`import validatedClassNames from '../utils/validation-group-classnames'`

LoginController = Ember.Controller.extend(EmberValidations, {
  queryParams: ['registered']
  currentVersion: 'beta'
  mitreURL: 'http://www.mitre.org/'
  interventionEnginURL: 'http://www.interventionengine.org'

  identification: null
  password: null
  registered: false
  loginFailed: false
  loggingIn: false
  displayErrors: false
  registered: false

  disableLoginBtn: Ember.computed('loggingIn', 'displayErrors', 'isValid', ->
    return true if @get('loggingIn') || (@get('displayErrors') && !@get('isValid'))
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
      length: {
        minimum: 8
        messages: {
          tooShort: 'must be at least 8 characters'
        }
      }
    }
  }

  identificationClassNames: validatedClassNames('identification')
  passwordClassNames: validatedClassNames('password')

  actions: {
    authenticate: ->
      return if @get('loggingIn')

      @set('displayErrors', true)

      @validate().then(=>
        @set('loggingIn', true)
        credentials = @getProperties('identification', 'password')

        successFn = =>
          @set('loggingIn', false)
          return

        errorFn = (message) =>
          @set('loggingIn', false)
          @set('errorMessage', message)
          return


        @get('session').authenticate('authenticator:ie', credentials).then(successFn, errorFn)

        return
      )

      return

    clearErrors: ->
      @set('errorMessage', null)

    clearRegistered: ->
      @set('registered', false)
  }
})

`export default LoginController`
