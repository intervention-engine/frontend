App.Filter = DS.Model.extend
  name: DS.attr("string")
  description: DS.attr("string")
  query: DS.belongsTo("query")
  panes: DS.hasMany("pane")
  buildQuery: ->
    if not @get('query')
      @set('query', @store.createRecord("query", {}))
    activeItems = @get("panes").map((pane) -> pane.get("items").filterBy("active", true))
    for itemSet in activeItems
      for item in itemSet
        @get('query.parameter').pushObject(item.get('parameter'))



App.FilterSerializer = App.ApplicationSerializer.extend
    attrs:
        query : {embedded: 'always'}
        panes : {embedded: 'always'}
