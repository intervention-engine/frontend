`import Ember from 'ember'`
`import addFilterPane from '../../utils/add-filter-pane'`

FiltersShowRoute = Ember.Route.extend(
  model: (params) ->
    @store.find('filter', params.id)

  afterModel: (filter) ->
    query = DS.PromiseObject.create({promise: Ember.$.get(filter.get('url'))})
    query.then(->
      filter.set('results', query.content.Response.Total)
    )

  actions:
    saveFilter: ->
      @currentModel.buildQuery()
      @currentModel.save()
      @transitionTo("filters.index")

    addPane: (pane) ->
      addFilterPane(@, pane)
)

`export default FiltersShowRoute`
