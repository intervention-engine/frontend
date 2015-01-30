`import Ember from 'ember'`

IndexController = Em.Controller.extend
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.[]')
  uniquePatients: Em.computed.uniq('patients')
  patients: Em.computed.mapBy('content.selectedItems', 'patients.patientids')

`export default IndexController`
