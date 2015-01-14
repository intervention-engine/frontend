`import ApplicationSerializer from './application'`

IdentifierSerializer = ApplicationSerializer.extend(
  attrs:
    period : {embedded: 'always'}
    assigner : {embedded: 'always'}
)

`export default IdentifierSerializer`
