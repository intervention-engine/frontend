import CodeableConcept from 'ember-fhir-adapter/models/codeable-concept';
import computed from 'ember-computed';

export default CodeableConcept.extend({
  hasCode(code) {
    let matchedCodes = this.get('coding').map(function(c) {
      return c.get('system') === code.system && c.get('code') === code.code;
    });
    return matchedCodes.any((d) => d);
  },

  displayText: computed('text', 'coding.firstObject.display', 'coding.firstObject.system', 'coding.firstObject.code', {
    get() {
      return this.get('text') || this.get('coding.firstObject.display') || `${this.get('coding.firstObject.system')}-${this.get('coding.firstObject.code')}`;
    }
  }).readOnly()
});
