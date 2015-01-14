`import ApplicationSerializer from './application'`

ResponseSerializer = ApplicationSerializer.extend(
  attrs:
    parameter : {embedded: 'always'}
    first : {embedded: 'always'}
    previous : {embedded: 'always'}
    next : {embedded: 'always'}
    last : {embedded: 'always'}
    reference : {embedded: 'always'}
)

`export default ResponseSerializer`
