`import Ember from 'ember'`

PatientsIndexRoute = Ember.Route.extend(

  model: ->
    Ember.RSVP.hash(
      patients: @store.findAll('patient'),
      populations: @store.findAll('filter')
    )
)

`export default PatientsIndexRoute`
