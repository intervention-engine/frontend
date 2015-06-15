`import Ember from 'ember'`

IndexRoute = Ember.Route.extend(
  model: ->
    Ember.RSVP.hash(
      populations: @store.findAll('filter')
    )
    # dashboard: @store.createRecord("dashboard", {id: Ember.generateGuid({}, "dashboard")})
)

`export default IndexRoute`
