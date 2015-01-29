`import Ember from 'ember'`

LoginRoute = Ember.Route.extend(

  activate: ->
    @controllerFor("application").set("displayNavbar", false)
    Ember.$("body").addClass("login-content")

  deactivate: ->
    @controllerFor("application").set("displayNavbar", true)
    Ember.$("body").removeClass("login-content")
)

`export default LoginRoute`
