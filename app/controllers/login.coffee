`import Ember from 'ember'`
`import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin'`

LoginController = Ember.Controller.extend(LoginControllerMixin, {
  queryParams: ['registered']
  authenticator: 'authenticator:ie'

  identification: null
  password: null
  registered: false
  loginFailed: false

  actions: {
    authenticate: ->
      # HACK: wipe the registered message upon log in attempt
      @set('registered', false) if @get('registered')
      false

      # quickly exit and avoid the AJAX call if either the email or password is empty
      if Ember.isEmpty(@get('identification')) || Ember.isEmpty(@get('password'))
        @set('loginFailed', true)
        return

      # wipe the failed message and make the AJAX call to log the user in
      # this._super() is defined by ember-simple-auth in
      # the LoginControllerMixin included in this controller
      @set('loginFailed', false)
      @_super().catch((response) =>
        # log in failed, either invalid email or password
        @set('loginFailed', true)
      )
  }
})

`export default LoginController`
