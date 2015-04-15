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
    medUrl = new URI(hash.content.Medication.Reference)
    if medUrl?
      (hash.content||hash)["links"] = medication: medUrl.path()
    @_super(type, hash, prop)

`export default MedicationStatementSerializer`
