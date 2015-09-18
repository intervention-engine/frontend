`import Ember from 'ember'`
`import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin'`

FiltersShowRoute = Ember.Route.extend(AuthenticatedRouteMixin,
  model: (params) ->
    @store.find('group', params.id)

  afterModel: (filter) ->
    # query = DS.PromiseObject.create({promise: Ember.$.get(filter.get('url'))})
    # query.then(->
    #   filter.set('results', query.content.Response.Total)
    # )


  actions:
    saveFilter: ->
      @currentModel.save()
      @transitionTo("filters.index")

    addPane: (pane) ->
      addFilterPane(@, pane)
)

`export default FiltersShowRoute`
