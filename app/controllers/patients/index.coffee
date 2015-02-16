`import Ember from 'ember'`

PatientsIndexController = Ember.Controller.extend(
  currentPatient: null

  actions:
    showPatient: (patient) ->
      @set('currentPatient', patient)
)

`export default PatientsIndexController`
