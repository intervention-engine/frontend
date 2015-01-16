`import Ember from 'ember'`
`import { createPane } from '../../utils/add-filter-pane'`

FiltersNewController = Ember.Controller.extend({
  # returns true if filter description has at least 1 filter pane and false if not
  hasFilterPane: (->
    @get('model.panes.length') > 0
  ).property('model.panes.length')

  patientObject: Ember.Object.create({
    type: 'patient'
  })
  conditionObject: Ember.Object.create({
    type: 'condition'
  })
  encounterObject: Ember.Object.create({
    type: 'encounter'
  })

  actions:
    saveFilter: ->
      @get('model').buildQuery()
      @get('model').save()
      @transitionTo("filters.index")

    addPane: (pane) ->
      paneObject = createPane(@, pane.get('type'))
      @get('model.panes').pushObject(paneObject)
})

`export default FiltersNewController`
