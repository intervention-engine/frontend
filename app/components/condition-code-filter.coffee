`import Ember from 'ember'`

ConditionCodeFilterComponent = Ember.Component.extend(
  item: null
  actions:
    addCode: =>
      # I need access to ACTUAL this not the _this that coffeescript keeps putting there
      model = ` this `.item
      code = model.store.createRecord("coding")
      model.get("parameter.valueCodeableConcept.coding").pushObject(code)
)

`export default ConditionCodeFilterComponent`
