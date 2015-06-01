`import Ember from 'ember'`

PatientsIndexController = Ember.Controller.extend(
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.[]')
  populations: []
  selectedCategory: null
  sortedPatients: (-> @get('model.patients').sortBy('serverRisk.risk', 'notificationCount', 'computedAge').reverse()).property('model.risk')
)

`export default PatientsIndexController`
