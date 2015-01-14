`import DS from 'ember-data'`

ApplicationAdapter = DS.RESTAdapter.extend(
  pathForType: (type) ->
    return Ember.String.capitalize(type)
)

`export default ApplicationAdapter`
