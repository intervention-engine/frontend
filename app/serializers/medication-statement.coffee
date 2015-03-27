`import ApplicationSerializer from './application'`
MedicationStatementSerializer = ApplicationSerializer.extend
  attrs:
    identifier : {embedded: 'always'}
    patient : {embedded: 'always'}
    reasonNotGiven : {embedded: 'always'}
    whenGiven : {embedded: 'always'}
    device : {embedded: 'always'}
    dosage : {embedded: 'always'}

  normalize: (type, hash, prop) ->
    (hash.content||hash)["links"] = medications: hash.content.Medication.Reference
    @_super(type, hash, prop)

`export default MedicationStatementSerializer`
