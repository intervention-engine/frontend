`import DS from 'ember-data'`

Event = DS.Model.extend {
  startDate: DS.attr('date')
  type: DS.attr('string')
  text: DS.attr('string')

  isCondition: Ember.computed.equal('type', 'condition')
  isMedication: Ember.computed.equal('type', 'medication')
}

`export default Event`
