`import ApplicationSerializer from './application'`

EncounterSerializer = ApplicationSerializer.extend(
  attrs:
    identifier : {embedded: 'always'}
    type : {embedded: 'always'}
    subject : {embedded: 'always'}
    participant : {embedded: 'always'}
    fulfills : {embedded: 'always'}
    period : {embedded: 'always'}
    length : {embedded: 'always'}
    reason : {embedded: 'always'}
    indication : {embedded: 'always'}
    priority : {embedded: 'always'}
    hospitalization : {embedded: 'always'}
    location : {embedded: 'always'}
    serviceProvider : {embedded: 'always'}
    partOf : {embedded: 'always'}
)

`export default EncounterSerializer`
