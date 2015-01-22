`import Ember from 'ember'`
`import SelectableMixin from 'ember-on-fhir/mixins/selectable'`

module 'SelectableMixin'

# Replace this with your real tests.
test 'it works', ->
  SelectableObject = Ember.Object.extend SelectableMixin
  subject = SelectableObject.create()
  ok subject
