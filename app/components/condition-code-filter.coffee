`import Ember from 'ember'`

ConditionCodeFilterComponent = Ember.Component.extend(
  item: null
  codingSystems:[
    {url:"http://hl7.org/fhir/sid/icd-9", system: "ICD-9"}
    {url: "http://hl7.org/fhir/sid/icd-10", system: "ICD-10"}
    {url: "http://snomed.info/sct", system: "SNOMED CT"}
    {url: "http://loinc.org", system: "LOINC"}
    {url: "http://www.hl7.org/FHIR/valueset-dicom-dcim.html", system:"DCM"}
    {url: "http://unitsofmeasure.org", system:"UCUM"}
    {url: "http://www.radlex.org/", system: "RadLex"}
    {url: "http://www.whocc.no/atc", system: "WHO"}
    {url: "urn:std:iso:11073:10101", system: "ISO 11073-10101"}

  ]
  # actions:
  #   addCode: =>
  #     # I need access to ACTUAL this not the _this that coffeescript keeps putting there
  #     model = ` this `.item
  #     code = model.store.createRecord("coding")
  #     model.get("parameter.valueCodeableConcept.coding").pushObject(code)
)

`export default ConditionCodeFilterComponent`
