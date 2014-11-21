App.ApplicationAdapter = DS.RESTAdapter.extend
  host: "http://localhost:8080"
  pathForType: (type) ->
    return Ember.String.capitalize(type)+"/"
