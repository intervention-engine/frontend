`import ApplicationSerializer from './application'`

LocationSerializer = ApplicationSerializer.extend(
  attrs:
    location : {embedded: 'always'}
    period : {embedded: 'always'}
)

`export default LocationSerializer`
