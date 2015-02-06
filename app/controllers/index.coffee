`import Ember from 'ember'`

IndexController = Em.Controller.extend
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.[]')
  uniquePatients: (-> debugger).property('patients.@each')
  patients: (->
    items = @get('selectedItems').map((item) -> item.get('patients.patientids'))
    []
  ).property('selectedItems.[]')

`export default IndexController`
