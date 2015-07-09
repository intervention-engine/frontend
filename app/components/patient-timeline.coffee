`import Ember from 'ember'`

PatientTimelineComponent = Ember.Component.extend(
  patient: null

  searchTimeline: ""
  filteredEvents: Ember.computed 'patient.events', 'searchTimeline', ->
    rx = new RegExp(@get("searchTimeline"), "gi")
    @get('patient.events').filter( (e)->
        e.get("event.text").toString().match(rx)
    )
)

`export default PatientTimelineComponent`
