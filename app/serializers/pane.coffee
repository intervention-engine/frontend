`import ApplicationSerializer from './application'`

PaneSerializer = ApplicationSerializer.extend(
  attrs:
    items : {embedded: 'always'}
)

`export default PaneSerializer`
