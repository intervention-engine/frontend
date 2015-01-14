`import ApplicationSerializer from './application'`

AddressSerializer = ApplicationSerializer.extend(
  attrs:
    period : {embedded: 'always'}
)

`export default AddressSerializer`
