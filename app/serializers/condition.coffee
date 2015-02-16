`import ApplicationSerializer from './application'`

ConditionSerializer = ApplicationSerializer.extend(
  attrs:
    identifier : {embedded: 'always'}
    subject : {embedded: 'always'}
    encounter : {embedded: 'always'}
    asserter : {embedded: 'always'}
    code : {embedded: 'always'}
    category : {embedded: 'always'}
    certainty : {embedded: 'always'}
    severity : {embedded: 'always'}
    location : {embedded: 'always'}
)

`export default ConditionSerializer`