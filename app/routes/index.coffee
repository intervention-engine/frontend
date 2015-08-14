`import Ember from 'ember'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'`

IndexRoute = Ember.Route.extend(AuthenticatedRouteMixin,
  beforeModel: ->
    @transitionTo('patients')
)

`export default IndexRoute`
