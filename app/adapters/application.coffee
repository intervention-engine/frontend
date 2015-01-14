`import DS from 'ember-data'`

ApplicationAdapter = DS.RESTAdapter.extend(
  # host: "http://localhost:3001"
  pathForType: (type) ->
    return Ember.String.capitalize(type)
)

`export default ApplicationAdapter`
