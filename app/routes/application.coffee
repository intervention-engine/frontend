`import Ember from 'ember'`
`import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin'`

ApplicationRoute = Ember.Route.extend(ApplicationRouteMixin,
  actions: invalidateSession: ->
    @get('session').invalidate()
    return
)

`export default ApplicationRoute`
