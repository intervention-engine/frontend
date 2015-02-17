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
)

`export default PatientSerializer`
