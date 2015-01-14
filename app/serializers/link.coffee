`import ApplicationSerializer from './application'`

LinkSerializer = ApplicationSerializer.extend(
  attrs:
    other : {embedded: 'always'}
)

`export default LinkSerializer`
