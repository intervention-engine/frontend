`import ApplicationSerializer from './application'`

PeriodSerializer = ApplicationSerializer.extend(
  attrs:
    start : {embedded: 'always'}
    end : {embedded: 'always'}
)

`export default PeriodSerializer`
