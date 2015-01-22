`import Ember from 'ember'`
`import addFilterPane from '../../utils/add-filter-pane'`

FiltersNewRoute = Ember.Route.extend(
  model: ->
    @store.createRecord('filter')

  actions:
    saveFilter: ->
      @currentModel.buildQuery()
      debugger
      @currentModel.set("name", Ember.generateGuid({}, "Population "))
      @currentModel.save()
      @transitionTo("filters.index")

    addPane: (pane) ->
      addFilterPane(@, pane)
)

`export default FiltersNewRoute`
