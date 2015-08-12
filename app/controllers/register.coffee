`import Ember from 'ember'`
`import EmberValidations from 'ember-validations'`

validatedClassNames = (field) ->
  Ember.computed('displayErrors', "errors.#{field}.length", ->
    classNames = []
    if @get("errors.#{field}.length") == 0
      classNames.push('has-success')
    else if @get('displayErrors')
      classNames.push('has-error')

    classNames.push('has-feedback') if classNames.length
    classNames.join(' ')
  )

displayValidatedError = (field) ->
  Ember.computed('displayErrors', "errors.#{field}.length", ->
    @get('displayErrors') && @get("errors.#{field}.length") > 0
  )

RegisterController = Ember.Controller.extend(EmberValidations, {
  registering: false
  identification: null
  password: null
  passwordConfirmation: null
  displayErrors: false
  validated: false

  disableRegisterBtn: Ember.computed('registering', ->
    return true if @get('registering')
    null
  )

  validations: {
    identification: {
      presence: true
    },
    password: {
      presence: true,
      confirmation: true
    },
    passwordConfirmation: {
      presence: true
    }
  }

  displayIdentificationValid: Ember.computed.equal('errors.identification.length', 0)
  displayPasswordValid: Ember.computed.equal('errors.password.length', 0)
  displayPasswordConfirmationValid: Ember.computed.equal('errors.passwordConfirmation.length', 0)

  displayIdentificationError: displayValidatedError('identification')
  displayPasswordError: displayValidatedError('password')
  displayPasswordConfirmationError: displayValidatedError('passwordConfirmation')

  identificationClassNames: validatedClassNames('identification')
  passwordClassNames: validatedClassNames('password')
  passwordConfirmationClassNames: validatedClassNames('passwordConfirmation')

  actions: {
    register: ->
      return if @get('registering')

      @set('displayErrors', true)

      @validate().then(=>
        @set('registering', true)

        credentials = @getProperties('identification', 'password', 'passwordConfirmation')

        ajaxParams = {
          url: '/register',
          type: 'POST',
          data: JSON.stringify(credentials),
          contentType: 'application/json'
        }

        successFn = =>
          Ember.run(=>
            @get('session').authenticate('authenticator:ie', {
              identification: credentials.identification,
              password: credentials.password
            })
            @set('registering', false)
          )

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
  }
})

`export default RegisterController`