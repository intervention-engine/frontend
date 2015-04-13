`import ApplicationSerializer from './application'`

PatientSerializer = ApplicationSerializer.extend(
  attrs:
    identifier : {embedded: 'always'}
    gender: {embedded: 'always'}
    birthDate: {embedded: 'always'}
    name : {embedded: 'always'}
    telecom : {embedded: 'always'}
    address : {embedded: 'always'}
    maritalStatus : {embedded: 'always'}
    photo : {embedded: 'always'}
    contact : {embedded: 'always'}
    animal : {embedded: 'always'}
    communication : {embedded: 'always'}
    careProvider : {embedded: 'always'}
    managingOrganization : {embedded: 'always'}
    link : {embedded: 'always'}

  testingPrefix: false

  normalize: (type, hash, prop) ->
    prefix = ""
    prefix = "/testing" if @testingPrefix
    queryParam = "?subject:Patient=#{hash.id}"
    medQuery = "?patient:Patient=#{hash.id}"
    (hash.content||hash)["links"] = conditions: "#{prefix}/Condition#{queryParam}", observations: "#{prefix}/Observation#{queryParam}", encounters: "#{prefix}/Encounter#{queryParam}", medications: "#{prefix}/MedicationStatement#{medQuery}"
    @_super(type, hash, prop)
)

`export default PatientSerializer`
