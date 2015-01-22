`import Ember from 'ember'`

PatientsIndexRoute = Ember.Route.extend(
  model: ->
    @store.findAll("patient")#.filterBy("isNew", false)
)

`export default PatientsIndexRoute`
