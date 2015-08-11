`import Ember from 'ember'`

LoginController = Ember.Controller.extend({
  queryParams: ['registered']
  currentVersion: 'beta'
  mitreURL: 'http://www.mitre.org/'
  interventionEnginURL: 'http://www.interventionengine.org'

  identification: null
  password: null
  registered: false
  loginFailed: false
  loggingIn: false

  disableLoginBtn: Ember.computed('loggingIn', ->
    return true if @get('loggingIn')
    null
  )

  actions: {
    authenticate: ->
      return if @get('loggingIn')

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
  }
})

`export default LoginController`
