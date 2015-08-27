`import Ember from 'ember'`
`import { createGCC } from '../../utils/add-filter-pane'`

FiltersNewController = Ember.Controller.extend({
  filterName: null

  # returns true if filter description has at least 1 filter pane and false if not
  hasFilterPane: (->
    @get('model.characteristic.length') > 0
  ).property('model.characteristic.length')

  # filter-type objects
  patientAgeObject: Ember.Object.create({ type: 'patient-age' })
  patientGenderObject: Ember.Object.create({ type: 'patient-gender' })
  conditionObject: Ember.Object.create({ type: 'condition' })
  encounterObject: Ember.Object.create({ type: 'encounter' })

  computeInstaCount: (->
    req = Ember.$.post("/InstaCountAll",  JSON.stringify(@get('model')?.serialize()||{}))

    req.fail (=>
      Ember.run(=>
        @set('instaPatient', 0)
        @set('instaCondition', 0)
        @set('instaEncounter', 0)
      )
    )

    req.then ((res)=>
      val = JSON.parse(res)
      Ember.run(=>
        @set('instaPatient', val.patients)
        @set('instaCondition', val.conditions)
        @set('instaEncounter', val.encounters)
      )
    )
  ).observes('model.characteristic').on('init')

  instaPatient: ( ->
    @get('model.characteristic')
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
      paneObject = createGCC(@, pane.get('type'), =>
        @.computeInstaCount())
      @model.get('characteristic').pushObject(paneObject)

    removePane: (pane) ->
      @model.get("characteristic").removeObject(pane)
})

`export default FiltersNewController`
