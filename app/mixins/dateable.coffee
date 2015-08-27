`import Ember from 'ember'`

DateableMixin = Ember.Mixin.create
  # Method to check if something has happened in the last val*period
  inLast: (field, val, period) ->
    @sinceDate(field,val, period, new Date())

  # Method to check if something will happen in the next val*period
  inNext: (field, val, period) ->
    @untilDate(field,val, period, new Date())

  # Checks if something happened in val*period from startDate
  sinceDate: (field, val, period, startDate) ->
    periodAgo = moment(startDate).subtract(val, period).toDate()
    new Date(@get(field)) > periodAgo

  untilDate: (field, val, period, startDate) ->
    periodTo = moment(startDate).add(val, period).toDate()
    new Date(@get(field)) < periodTo


  # Check if something has occured, ie the date isn't in the future
  hasOccured: (field) ->
    new Date(@get(field)) <= new Date()

  isActive: (field) ->
    @get(field) is undefined or not @hasOccured(field)


`export default DateableMixin`
