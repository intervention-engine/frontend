`import ApplicationSerializer from './application'`

QuerySerializer = ApplicationSerializer.extend(
  attrs:
    parameter : {embedded: 'always'}
    response : {embedded: 'always'}
)

`export default QuerySerializer`
