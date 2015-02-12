`import Ember from 'ember'`

PatientsShowRoute = Ember.Route.extend(
  model: (params) ->
    @store.find('patient', params.id)
  
)

`export default PatientsShowRoute`
