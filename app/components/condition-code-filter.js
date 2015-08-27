import Ember from 'ember';
import FilterComponentMixin from '../mixins/filter-component';

export default Ember.Component.extend(FilterComponentMixin, {
  checkboxBaseName: 'condition-filter',

  codingSystems: [
    { url: "http://hl7.org/fhir/sid/icd-9", system: "ICD-9" },
    { url: "http://hl7.org/fhir/sid/icd-10", system: "ICD-10" },
    { url: "http://snomed.info/sct", system: "SNOMED CT" },
    { url: "http://loinc.org", system: "LOINC" },
    { url: "http://www.hl7.org/FHIR/valueset-dicom-dcim.html", system: "DCM" },
    { url: "http://unitsofmeasure.org", system: "UCUM" },
    { url: "http://www.radlex.org/", system: "RadLex" },
    { url: "http://www.whocc.no/atc", system: "WHO" },
    { url: "urn:std:iso:11073:10101", system: "ISO 11073-10101" }
  ],

  codeValue: codingComputedProperty('code'),
  system: codingComputedProperty('system')
});

function codingComputedProperty(propertyName) {
  return Ember.computed({
    get() {
      return this.get(`characteristic.valueCodeableConcept.coding.firstObject.${propertyName}`);
    },

    set(property, value) {
      let coding = this.get('characteristic.valueCodeableConcept.coding.firstObject');
      if (coding) {
        coding.set(propertyName, value);
      }
    }
  });
}
