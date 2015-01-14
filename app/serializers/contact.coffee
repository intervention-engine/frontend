`import ApplicationSerializer from './application'`

ContactSerializer = ApplicationSerializer.extend(
  attrs:
    relationship : {embedded: 'always'}
    name : {embedded: 'always'}
    telecom : {embedded: 'always'}
    address : {embedded: 'always'}
    organization : {embedded: 'always'}
)

`export default ContactSerializer`
