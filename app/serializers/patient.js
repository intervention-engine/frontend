import PatientSerializer from 'ember-fhir-adapter/serializers/patient';

export default PatientSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload) {
    let value = this._super(...arguments);
    value.meta = { total: payload.total };
    return value;
  },

  normalize(type, hash, prop) {
    let queryParam = `?patient:Patient=${hash.id}`;
    (hash.content || hash).links = {
      conditions: `/Condition${queryParam}`,
      observations: `/Observation${queryParam}`,
      encounters: `/Encounter${queryParam}`,
      medications: `/MedicationStatement${queryParam}`,
      appointments: `/Appointment${queryParam}`,
      risks: `/RiskAssessment?subject:Patient=${hash.id}`
    };
    return this._super(type, hash, prop);
  }
});
