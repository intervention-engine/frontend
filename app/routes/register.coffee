`import Ember from 'ember'`

RegisterRoute = Ember.Route.extend(
  resetController: (controller, isExiting) ->
    if isExiting
      controller.set('identification', null)
      controller.set('password', null)
      controller.set('passwordConfirmation', null)
      controller.set('displayErrors', false)
      controller.set('errorMessage', null)
      controller.set('disableRegisterBtn', null)
)

`export default RegisterRoute`
