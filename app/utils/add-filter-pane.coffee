`import Ember from 'ember'`

addFilterPane = (context, gcc) ->
  gccObject = createGCC(context, gcc)
  context.currentModel.get('characteristic').pushObject(gccObject)

createGCC = (context, pane, observ) ->
  switch pane
    when "patient-age"
      createAgeGCC(context, observ)
    when "patient-gender"
      createGenderGCC(context, observ)
    when "encounter"
      createEncounterGCC(context, observ)
    when "condition"
      createConditionGCC(context, observ)
    else
      return

createAgeGCC = (context, observ) ->
  ageGCC = context.store.createRecord("group-characteristic-component", {id: Ember.generateGuid({}, "group-characteristic-component")})
  ageRange = context.store.createRecord('range')
  ageRange.set("low", context.store.createRecord("quantity", {value: 0}))
  ageRange.set("high", context.store.createRecord("quantity", {value: 65}))
  ageGCC.set("valueRange", ageRange)
  ageRange.addObserver("low.value", observ)
  ageRange.addObserver("high.value", observ)
  ageCoding = context.store.createRecord("coding", {code: "21612-7", system: "http://loinc.org"})
  ageCC = context.store.createRecord("codeable-concept")
  ageCC.get("coding").pushObject(ageCoding)
  ageGCC.set("code", ageCC)
  ageGCC

createGenderGCC = (context, observ) ->
  genderGCC = context.store.createRecord("group-characteristic-component", {id: Ember.generateGuid({}, "group-characteristic-component")})
  genderCoding = context.store.createRecord("coding", {code: "21840-4", system: "http://loinc.org"})
  genderCC = context.store.createRecord("codeable-concept")
  genderCC.get("coding").pushObject(genderCoding)
  genderGCC.set("code", genderCC)
  genderFilterCoding = context.store.createRecord("coding", {code: "male", system: "http://hl7.org/fhir/administrative-gender"})
  genderFilterCoding.addObserver("code", observ)
  genderFilterCoding.addObserver("system", observ)
  genderFilter = context.store.createRecord("codeable-concept", {id: Ember.generateGuid({}, "codeable-concept")})
  genderFilter.get("coding").pushObject(genderFilterCoding)
  genderGCC.set("valueCodeableConcept", genderFilter)
  genderGCC

createEncounterGCC = (context, observ) ->
  encounterGCC = context.store.createRecord("group-characteristic-component", {id: Ember.generateGuid({}, "group-characteristic-component")})
  encounterCoding = context.store.createRecord("coding", {code: "46240-8", system: "http://loinc.org"})
  encounterCC = context.store.createRecord("codeable-concept")
  encounterCC.get("coding").pushObject(encounterCoding)
  encounterGCC.set("code", encounterCC)
  valueCoding = context.store.createRecord("coding")
  valueCoding.addObserver("code", observ)
  valueCoding.addObserver("system", observ)
  valueCC = context.store.createRecord("codeable-concept")
  valueCC.get("coding").pushObject(valueCoding)
  encounterGCC.set('valueCodeableConcept', valueCC)
  encounterGCC

createConditionGCC = (context, observ) ->
  conditionGCC = context.store.createRecord("group-characteristic-component", {id: Ember.generateGuid({}, "group-characteristic-component")})
  conditionCoding = context.store.createRecord("coding", {code: "11450-4", system: "http://loinc.org"})
  conditionCC = context.store.createRecord("codeable-concept")
  conditionCC.get("coding").pushObject(conditionCoding)
  conditionGCC.set("code", conditionCC)
  valueCoding = context.store.createRecord("coding")
  valueCoding.addObserver("code", observ)
  valueCoding.addObserver("system", observ)
  valueCC = context.store.createRecord("codeable-concept")
  valueCC.get("coding").pushObject(valueCoding)
  conditionGCC.set('valueCodeableConcept', valueCC)
  conditionGCC

`export { addFilterPane, createGCC }`
`export default addFilterPane`
