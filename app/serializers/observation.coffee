`import ApplicationSerializer from './application'`

ObservationSerializer = ApplicationSerializer.extend(
  attrs:
    name : {embedded: 'always'}
    valueQuantity : {embedded: 'always'}
    valueCodeableConcept : {embedded: 'always'}
    valuePeriod : {embedded: 'always'}
    interpretation : {embedded: 'always'}
    appliesPeriod : {embedded: 'always'}
    bodySite : {embedded: 'always'}
    method : {embedded: 'always'}
    identifier : {embedded: 'always'}
    subject : {embedded: 'always'}
    specimen : {embedded: 'always'}
    performer : {embedded: 'always'}
    encounter : {embedded: 'always'}
  
)

`export default ObservationSerializer`
