`import Ember from 'ember'`

PatientBadgeComponent = Ember.Component.extend(
  patient: null
  currentPatient: null

  actions:
    showPatient: (patient) ->
      @set('currentPatient', patient)
)

`export default PatientBadgeComponent`
