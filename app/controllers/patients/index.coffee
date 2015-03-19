`import Ember from 'ember'`

PatientsIndexController = Ember.Controller.extend(
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.[]')
  populations: []
  selectedCategory: null
)

`export default PatientsIndexController`
