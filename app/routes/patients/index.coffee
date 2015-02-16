`import Ember from 'ember'`

PatientsIndexRoute = Ember.Route.extend(

  model: ->
    @store.findAll("patient")

  afterModel: ->
    @store.findAll('filter').then((populations) =>
      @controllerFor('patients.index').set('populations', populations)
    )
)

`export default PatientsIndexRoute`
