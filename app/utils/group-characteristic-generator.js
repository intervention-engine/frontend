import Ember from 'ember';

export default function createGCC(context, pane) {
  if (pane === 'age-filter') {
    return createAgeGCC(context);
  } else if (pane === 'gender-filter') {
    return createGenderGCC(context);
  } else if (pane === 'encounter-code-filter') {
    return createEncounterGCC(context);
  } else if (pane === 'condition-code-filter') {
    return createConditionGCC(context);
  }
}

function createAgeGCC(context) {
  let ageGCC = context.get('store').createRecord("group-characteristic-component", { id: Ember.generateGuid({}, "group-characteristic-component") });

  let ageRange = context.get('store').createRecord('range');
  ageRange.set("low", context.get('store').createRecord("quantity", { value: 0 }));
  ageRange.set("high", context.get('store').createRecord("quantity", { value: 65 }));
  ageGCC.set("valueRange", ageRange);

  let ageCoding = context.get('store').createRecord("coding", { code: "21612-7", system: "http://loinc.org" });

  let ageCC = context.get('store').createRecord("codeable-concept");
  ageCC.get("coding").pushObject(ageCoding);
  ageGCC.set("code", ageCC);

  return ageGCC;
}

function createGenderGCC(context) {
  let genderGCC = context.get('store').createRecord("group-characteristic-component", { id: Ember.generateGuid({}, "group-characteristic-component") });

  let genderCoding = context.get('store').createRecord("coding", { code: "21840-4", system: "http://loinc.org" });

  let genderCC = context.get('store').createRecord("codeable-concept");
  genderCC.get("coding").pushObject(genderCoding);
  genderGCC.set("code", genderCC);

  let genderFilterCoding = context.get('store').createRecord("coding", { code: "male", system: "http://hl7.org/fhir/administrative-gender" });

  let genderFilter = context.get('store').createRecord("codeable-concept", {
    id: Ember.generateGuid({}, "codeable-concept")
  });
  genderFilter.get("coding").pushObject(genderFilterCoding);
  genderGCC.set("valueCodeableConcept", genderFilter);

  return genderGCC;
}

function createEncounterGCC(context) {
  let encounterGCC = context.get('store').createRecord("group-characteristic-component", { id: Ember.generateGuid({}, "group-characteristic-component") });

  let encounterCoding = context.get('store').createRecord("coding", { code: "46240-8", system: "http://loinc.org" });

  let encounterCC = context.get('store').createRecord("codeable-concept");
  encounterCC.get("coding").pushObject(encounterCoding);
  encounterGCC.set("code", encounterCC);

  let valueCoding = context.get('store').createRecord("coding");

  let valueCC = context.get('store').createRecord("codeable-concept");
  valueCC.get("coding").pushObject(valueCoding);
  encounterGCC.set('valueCodeableConcept', valueCC);

  return encounterGCC;
}

function createConditionGCC(context) {
  let conditionGCC = context.get('store').createRecord("group-characteristic-component", { id: Ember.generateGuid({}, "group-characteristic-component") });

  let conditionCoding = context.get('store').createRecord("coding", { code: "11450-4", system: "http://loinc.org" });

  let conditionCC = context.get('store').createRecord("codeable-concept");
  conditionCC.get("coding").pushObject(conditionCoding);
  conditionGCC.set("code", conditionCC);

  let valueCoding = context.get('store').createRecord("coding");
  let valueCC = context.get('store').createRecord("codeable-concept");
  valueCC.get("coding").pushObject(valueCoding);
  conditionGCC.set('valueCodeableConcept', valueCC);

  return conditionGCC;
}
