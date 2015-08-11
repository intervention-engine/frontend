`import Ember from 'ember'`

CodeableMixin = Ember.Mixin.create
  hasCode: (field, code) ->
    thing = @get(field)
    if thing.isArray
      matchedCodes = thing.map( (c) ->
        c.hasCode(code)
      )
      return matchedCodes.any((d) -> d)
    else
      return thing.hasCode(code)

`export default CodeableMixin`
