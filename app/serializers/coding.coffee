`import ApplicationSerializer from './application'`

CodingSerializer = ApplicationSerializer.extend(
  attrs:
    valueSet : {embedded: 'always'}
)

`export default CodingSerializer`
