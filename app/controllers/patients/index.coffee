`import Ember from 'ember'`

PatientsIndexController = Ember.Controller.extend(
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.[]')
  populations: []
  currentPatient: null

  actions:
    showPatient: (patient) ->
      @set('currentPatient', patient)
)

`export default PatientsIndexController`
