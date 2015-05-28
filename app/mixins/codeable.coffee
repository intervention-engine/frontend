`import Ember from 'ember'`

CodeableMixin = Ember.Mixin.create
  hasCode: (field, code) ->
    matchedCodes = @get(field).map( (c) ->
      c.hasCode(code)
    )
    matchedCodes.any((d) -> d)


`export default CodeableMixin`
