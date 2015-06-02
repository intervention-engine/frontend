`import DS from 'ember-data'`

Risk = DS.Model.extend(
  patient: DS.belongsTo('patient', async:true, inverse:'serverRisk')
  risk: DS.attr("number")
)

`export default Risk`
