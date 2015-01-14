`import ApplicationSerializer from './application'`

HumanNameSerializer = ApplicationSerializer.extend(
  attrs:
    period : {embedded: 'always'}
)

`export default HumanNameSerializer`
