`import Ember from 'ember'`
`import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin'`

LoginController = Ember.Controller.extend(LoginControllerMixin, {
  queryParams: ['registered']
  authenticator: 'authenticator:ie'
  currentVersion: 'beta'
  logoLargeURL: 'assets/images/logo-darkbg-lg.png'
  mitreURL: 'http://www.mitre.org/'
  interventionEnginURL: 'http://www.interventionengine.org'

  identification: null
  password: null
  registered: false
  loginFailed: false

  actions: {
    authenticate: ->
      _this = this
      credentials = this.getProperties('identification', 'password')
      this.get('session').authenticate('authenticator:ie', credentials).then(null, (message) ->
        _this.set('errorMessage', message))
  }
})

`export default LoginController`
