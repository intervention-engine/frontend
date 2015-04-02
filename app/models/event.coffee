`import DS from 'ember-data'`

Event = DS.Model.extend {
  startDate: DS.attr('date')
  type: DS.attr('string')
  text: DS.attr('string')
}

`export default Event`
