`import ApplicationSerializer from './application'`

EmberItemSerializer = ApplicationSerializer.extend(
  attrs:
    parameter: {embedded: 'always'}
)

`export default EmberItemSerializer`
