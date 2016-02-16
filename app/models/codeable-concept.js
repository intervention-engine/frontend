import CodeableConcept from 'ember-fhir-adapter/models/codeable-concept';

export default CodeableConcept.extend({
  hasCode(code) {
    let matchedCodes = this.get('coding').map(function(c) {
      return c.get('system') === code.system && c.get('code') === code.code;
    });
    return matchedCodes.any((d) => d);
  }
});
