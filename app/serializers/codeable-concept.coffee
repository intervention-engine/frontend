`import ApplicationSerializer from './application'`

CodeableConceptSerializer = ApplicationSerializer.extend(
  attrs:
    coding : {embedded: 'always'}
)

`export default CodeableConceptSerializer`
