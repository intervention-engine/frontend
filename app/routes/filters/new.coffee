`import Ember from 'ember'`
`import addFilterPane from '../../utils/add-filter-pane'`

FiltersNewRoute = Ember.Route.extend(
  model: ->
    @store.createRecord('filter')

  rebuildQuery: (->
    console.log "Building Query?"
  ).observes('model')

  # resets the controller upon exiting route
  resetController: (controller, isExiting, transition) ->
    controller.set('filterName', null) if isExiting
    return
)

`export default FiltersNewRoute`
