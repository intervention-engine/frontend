`import ApplicationSerializer from './application'`

FilterSerializer = ApplicationSerializer.extend(
  attrs:
    query : {embedded: 'always'}
    panes : {embedded: 'always'}
)

`export default FilterSerializer`
