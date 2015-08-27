`import Ember from 'ember'`

LoginRegisterComponent = Ember.Component.extend(
  logoLargeURL: 'assets/images/logo-darkbg-lg.png'

  displayNavbar: Ember.inject.service()

  _setup: Ember.on('didInsertElement', ->
    @get("displayNavbar").hide()
    Ember.$(document.body).addClass("login-register-content")
  )

  _teardown: Ember.on('willDestroyElement', ->
    return if @isDestroyed

    @get("displayNavbar").show()
    Ember.$(document.body).removeClass("login-register-content")
  )
)

`export default LoginRegisterComponent`
