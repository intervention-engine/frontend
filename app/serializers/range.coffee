`import ApplicationSerializer from './application'`

RangeSerializer = ApplicationSerializer.extend(
  attrs:
    low : {embedded: 'always'}
    high : {embedded: 'always'}
)

`export default RangeSerializer`
