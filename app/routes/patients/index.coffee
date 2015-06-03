`import Ember from 'ember'`

PatientsIndexRoute = Ember.Route.extend(

  model: ->
    Ember.RSVP.hash(
      patients: @store.findAll('patient'),
      populations: @store.findAll('filter')
      risks: @store.findAll('risk')
      notificationCounts: @store.findAll('notificationCount')
    )
)

`export default PatientsIndexRoute`
