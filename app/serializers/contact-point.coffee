`import ApplicationSerializer from './application'`

ContactPointSerializer = ApplicationSerializer.extend(
  attrs:
    period : {embedded: 'always'}
)

`export default ContactPointSerializer`
