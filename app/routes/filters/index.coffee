`import Ember from 'ember'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'`


FiltersIndexRoute = Ember.Route.extend(AuthenticatedRouteMixin,
  model: ->
    @store.findAll("group")#.filterBy("isNew", false)
)

`export default FiltersIndexRoute`
