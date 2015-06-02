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

  computeInstaCount: (->
    pats = Ember.$.post("/InstaCount/patient",  JSON.stringify(@get('query')?.serialize()||{}))

    pats.fail (=>
      @set('instaPatient', 0)
    )

    pats.then ((res)=>
      val = JSON.parse(res).total
      @set('instaPatient', val)
    )

    encounters = Ember.$.post("/InstaCount/encounter",  JSON.stringify(@get('query')?.serialize()||{}))

    encounters.fail (=>
      @set('instaEncounter', 0)
    )

    encounters.then ((res)=>
      val = JSON.parse(res).total
      @set('instaEncounter', val)
    )


    conds = Ember.$.post("/InstaCount/condition",  JSON.stringify(@get('query')?.serialize()||{}))

    conds.fail (=>
      @set('instaCondition', 0)
    )

    conds.then ((res)=>
      val = JSON.parse(res).total
      @set('instaCondition', val)
    )
  ).observes('model.query').on('init')

  instaPatient: ( ->
    @get('query')
  ).property('computeInstaCount')

  instaEncounter: ( ->
  ).property('computeInstaCount')

  instaCondition: ( ->
  ).property('computeInstaCount')


  # actions
  actions:
    saveFilter: ->
      # @get('model').buildQuery()
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
