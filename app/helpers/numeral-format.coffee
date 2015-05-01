`import Ember from 'ember'`

numeralFormat = Ember.Handlebars.makeBoundHelper (number, format) ->
  return numeral(number).format(format)


`export default numeralFormat`
