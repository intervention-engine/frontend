`import Ember from 'ember'`

dateFormat = Ember.Handlebars.makeBoundHelper (date) ->
  return moment(date).format('lll')


`export default dateFormat`
