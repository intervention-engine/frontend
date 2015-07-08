`import Ember from 'ember'`
`import addFilterPane from '../../utils/add-filter-pane'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'`

FiltersNewRoute = Ember.Route.extend(AuthenticatedRouteMixin,
  model: ->
    @store.createRecord('filter')


  # resets the controller upon exiting route
  resetController: (controller, isExiting, transition) ->
    controller.set('filterName', null) if isExiting
    return
)

`export default FiltersNewRoute`
