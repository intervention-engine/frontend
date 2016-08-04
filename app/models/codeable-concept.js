import CodeableConcept from 'ember-fhir-adapter/models/codeable-concept';
import computed from 'ember-computed';

// We don't want to display the URI of the system, it's ugly, so here's a lookup table
// TODO the better way to do this would be have it hucked in some config file.
const SYSTEM_LOOKUP = {
  'http://snomed.info/sct': 'SNOMED',
  'http://www.nlm.nih.gov/research/umls/rxnorm': 'RxNorm',
  'http://loinc.org': 'LOINC',
  'http://www.ama-assn.org/go/cpt': 'CPT',
  'http://hl7.org/fhir/sid/icd-9': 'ICD9',
  'http://hl7.org/fhir/sid/icd-10': 'ICD10'
};

export default CodeableConcept.extend({
  hasCode(code) {
    let matchedCodes = this.get('coding').map(function(c) {
      return c.get('system') === code.system && c.get('code') === code.code;
    });
    return matchedCodes.any((d) => d);
  },

  displayText: computed('text', 'coding.firstObject.display', 'coding.firstObject.system', 'coding.firstObject.code', {
    get() {
      return this.get('text') || this.get('coding.firstObject.display') || `${SYSTEM_LOOKUP[this.get('coding.firstObject.system')] || this.get('coding.firstObject.system')} ${this.get('coding.firstObject.code')}`;
    }
  }).readOnly()
});
