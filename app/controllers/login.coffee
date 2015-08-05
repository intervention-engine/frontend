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

  actions: {
    authenticate: ->
      credentials = @getProperties('identification', 'password')
      @get('session').authenticate('authenticator:ie', credentials).then(null, (message) =>
        @set('errorMessage', message)
      )
  }
})

`export default LoginController`
