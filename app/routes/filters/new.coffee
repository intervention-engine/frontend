`import Ember from 'ember'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'`

FiltersNewRoute = Ember.Route.extend(AuthenticatedRouteMixin,
  model: ->
    @store.createRecord('group')


  # resets the controller upon exiting route
  resetController: (controller, isExiting, transition) ->
    controller.set('filterName', null) if isExiting
    return
)

`export default FiltersNewRoute`
