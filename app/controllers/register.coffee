`import Ember from 'ember'`

RegisterController = Ember.Controller.extend({
  registering: false

  disableRegisterBtn: Ember.computed('registering', ->
    return true if @get('registering')
    null
  )

  actions: {
    register: ->
      return if @get('registering')

      @set('registering', true)

      credentials = @getProperties('identification', 'password', 'confirmation')

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
  }
})

`export default RegisterController`