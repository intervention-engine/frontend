`import Ember from 'ember'`

addFilterPane = (context, pane) ->
  paneObject = createPane(context, pane)
  context.currentModel.get('panes').pushObject(paneObject)

createPane = (context, pane) ->
  switch pane
    when "patient"
      createPatientPane(context)
    when "encounter"
      createEncounterPane(context)
    when "condition"
      createConditionPane(context)
    else
      return

createPatientPane = (context) ->
  newPane = context.store.createRecord("pane", {id: Ember.generateGuid({}, "pane")})
  ageRange = context.store.createRecord('range')
  ageRange.set("low", context.store.createRecord("quantity", {value: 0}))
  ageRange.set("high", context.store.createRecord("quantity", {value: Infinity}))
  ageParam = context.store.createRecord("extension", {id: Ember.generateGuid({}, "extension"), url: "http://interventionengine.org/patientage", valueRange: ageRange})
  ageFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({}, "ember-item"), parameter: ageParam, componentName: "age-filter"})
  genderParam = context.store.createRecord("extension", {id: Ember.generateGuid({}, "extension"), url: "http://interventionengine.org/patientgender", valueString: "M"})
  genderFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({}, "ember-item"), parameter: genderParam, componentName: "gender-filter"})
  newPane.get('items').pushObjects([genderFilter, ageFilter])
  newPane

createEncounterPane = (context) ->
  newPane = context.store.createRecord("pane", {id: Ember.generateGuid({}, "pane"), icon:"fa-hospital-o"})
  codeParam = context.store.createRecord("extension", {id: Ember.generateGuid({}, "extension"), url: "http://interventionengine.org/encountercode"})
  codeFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({}, "ember-item"), parameter: codeParam, componentName: "encounter-code-filter"})
  newPane.get('items').pushObjects([codeFilter])
  newPane

createConditionPane = (context) ->
  newPane = context.store.createRecord("pane", {id: Ember.generateGuid({}, "pane"), icon:"icon-med-clipboard"})
  codeParam = context.store.createRecord("extension", {id: Ember.generateGuid({}, "extension"), url: "http://interventionengine.org/conditioncode"})
  code = context.store.createRecord("codeableConcept")
  code.get("coding").pushObject(context.store.createRecord("coding"))

  codeParam.set('valueCodeableConcept', code)
  codeFilter = context.store.createRecord("ember-item", {id: Ember.generateGuid({}, "ember-item"), parameter: codeParam, componentName: "condition-code-filter"})

  newPane.get('items').pushObjects([codeFilter])
  newPane


`export { addFilterPane, createPane }`
`export default addFilterPane`
