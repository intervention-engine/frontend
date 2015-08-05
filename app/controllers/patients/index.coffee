`import Ember from 'ember'`

PatientsIndexController = Ember.Controller.extend(
  selectedItems: Em.computed.filterBy('model.populations', 'selected', true)
  selectedItemsCount: (-> @get('selectedItems.length')).property('selectedItems.[]')
  populations: []
  selectedCategory: null
  patients: Em.computed 'selectedItems.@each', ->
    if @get('selectedItemsCount') == 0
      return @get('model.patients')
    else
      console.error("This code path is broken until testing with IE server")
      return @get('model.patients')
  sortedPatients: Ember.computed('patients.@each.notifications.count', ()->
    @get('patients').sortBy('notifications.count', 'computedAge').reverse()
    )

  patientSearch: ''

  filteredPatients: Em.computed 'sortedPatients', 'patientSearch', ->
    rx = new RegExp(@get("patientSearch"), "gi")
    @get('sortedPatients').filter( (p)->
      p.get("fullName").toString().match(rx)
    )

)

`export default PatientsIndexController`
