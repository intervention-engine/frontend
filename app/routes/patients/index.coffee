`import Ember from 'ember'`

PatientsIndexRoute = Ember.Route.extend(

  model: ->
    @store.findAll("patient")
)

`export default PatientsIndexRoute`
