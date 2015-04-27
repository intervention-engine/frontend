`import DS from 'ember-data'`

Event = DS.Model.extend {
  type: DS.attr('string')
  event: DS.attr()
  isEnd: DS.attr('boolean', {defaultValue: false})

  effectiveDate: (->
    if @get('isEnd')
      return @get('event.endDate')
    return @get('event.startDate')
  ).property('isEnd', 'event')
}

`export default Event`
