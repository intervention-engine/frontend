import Patient from 'ember-fhir-adapter/serializers/patient';


let PatientSerializer = Patient.extend({
  extract: function(store, type, payload, id, requestType){
    store.setMetadataFor(type,{total: payload.total});
    return this._super(store, type, payload, id, requestType);
  },

  normalize: function(type, hash, prop){
    let queryParam = `?patient:Patient=${hash.id}`;
    (hash.content||hash)["links"] = {
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

export default PatientSerializer;
