`import DS from 'ember-data'`

QueryList = DS.Model.extend(
  patientids: DS.hasMany('patient', {async: true})
)


`export default QueryList`
