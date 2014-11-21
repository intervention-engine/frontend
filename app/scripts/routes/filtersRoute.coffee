App.FiltersNewRoute = Em.Route.extend
  model: ->
    @store.createRecord('population')
  actions:
    filterAdded: (data) ->
      console.log data
