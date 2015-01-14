`import ApplicationSerializer from './application'`

AccomodationSerializer = ApplicationSerializer.extend(
  attrs:
    bed: {embedded: 'always'}
    period: {embedded: 'always'}
)

`export default AccomodationSerializer`
