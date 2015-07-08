`import Ember from 'ember'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'`

PatientsIndexRoute = Ember.Route.extend(AuthenticatedRouteMixin,

  model: ->
    Ember.RSVP.hash(
      patients: @store.findAll('patient'),
      # populations: @store.findAll('filter')
      # risks: @store.findAll('risk')
      # notificationCounts: @store.findAll('notificationCount')
    )
)

`export default PatientsIndexRoute`
