`import Ember from 'ember'`

TimelineEventComponent = Ember.Component.extend(
  event: null

  isCondition: Ember.computed.equal('event.type', 'condition')
  isMedication: Ember.computed.equal('event.type', 'medication')

  eventClass: ( ->
    return 'event-condition' if (@get('isCondition'))
    return 'event-medication' if (@get('isMedication'))
    return 'event-unknown'
  ).property('event')
)

`export default TimelineEventComponent`
