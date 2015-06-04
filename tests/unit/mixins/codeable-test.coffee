`import Ember from 'ember'`
`import CodeableMixin from 'ember-on-fhir/mixins/codeable'`

module 'CodeableMixin'

# Replace this with your real tests.
test 'it works', ->
  CodeableObject = Ember.Object.extend CodeableMixin
  subject = CodeableObject.create()
  ok subject
