`import ApplicationSerializer from './application'`

ExtensionSerializer = ApplicationSerializer.extend(
  attrs:
    value : {embedded: 'always'}
    valueCodeableConcept: {embedded: 'always'}
)

`export default ExtensionSerializer`
