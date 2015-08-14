`import Ember from 'ember'`

LoginRoute = Ember.Route.extend(
  resetController: (controller, isExiting) ->
    if isExiting
      controller.set('identification', null)
      controller.set('password', null)
      controller.set('displayErrors', false)
      controller.set('errorMessage', null)
      controller.set('disableLoginBtn', null)
)

`export default LoginRoute`
