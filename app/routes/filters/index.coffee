`import Ember from 'ember'`

FiltersIndexRoute = Ember.Route.extend(
  model: ->
    @store.findAll("filter")#.filterBy("isNew", false)
)

`export default FiltersIndexRoute`
