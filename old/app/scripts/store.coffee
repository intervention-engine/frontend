App.ApplicationAdapter = DS.RESTAdapter.extend
  # host: "http://localhost:3001"
  pathForType: (type) ->
    return Ember.String.capitalize(type)
