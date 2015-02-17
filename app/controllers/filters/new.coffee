`import Ember from 'ember'`
`import { createPane } from '../../utils/add-filter-pane'`

FiltersNewController = Ember.Controller.extend({
  filterName: null

  # returns true if filter description has at least 1 filter pane and false if not
  hasFilterPane: (->
    @get('model.panes.length') > 0
  ).property('model.panes.length')

  # filter-type objects
  patientObject: Ember.Object.create({ type: 'patient' })
  conditionObject: Ember.Object.create({ type: 'condition' })
  encounterObject: Ember.Object.create({ type: 'encounter' })

  # counts
  patientsCount: '49,461'
  conditionsCount: '1,536'
  encountersCount: '126,185'

  # actions
  actions:
    saveFilter: ->
      @get('model').buildQuery()
      @get('model').set("name", @get('filterName') || Ember.generateGuid({}, "Population "))
      @get('model').save()
      @transitionTo("filters.index")

    addPane: (pane) ->
      paneObject = createPane(@, pane.get('type'))
      @get('model.panes').pushObject(paneObject)

    removePane: (pane) ->
      @model.get("panes").removeObject(pane)
})

`export default FiltersNewController`
