`import Ember from 'ember'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'`

IndexRoute = Ember.Route.extend(AuthenticatedRouteMixin,
  beforeModel: ->
    @transitionTo('patients');

  # model: ->
  #   Ember.RSVP.hash(
  #     populations: @store.findAll('filter')
  #   )
  #   # dashboard: @store.createRecord("dashboard", {id: Ember.generateGuid({}, "dashboard")})
)

`export default IndexRoute`
