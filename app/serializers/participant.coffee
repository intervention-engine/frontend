`import ApplicationSerializer from './application'`

ParticipantSerializer = ApplicationSerializer.extend(
  attrs:
    type : {embedded: 'always'}
    individual : {embedded: 'always'}
)

`export default ParticipantSerializer`
