`import DS from 'ember-data'`

Dosage = DS.Model.extend
    schedule: DS.belongsTo('timing')
    asNeededBoolean: DS.attr('boolean')
    asNeededCodeableConcept: DS.belongsTo('codeableConcept')
    site: DS.belongsTo('codeableConcept')
    route: DS.belongsTo('codeableConcept')
    method: DS.belongsTo('codeableConcept')
    quantity: DS.belongsTo('quantity')
    rate: DS.belongsTo('ratio')
    maxDosePerPeriod: DS.belongsTo('ratio')

`export default Dosage`
