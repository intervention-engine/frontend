`import Ember from 'ember'`
`import DateableMixin from 'ember-on-fhir/mixins/dateable'`

module 'DateableMixin'

# Replace this with your real tests.
test 'it works', ->
  DateableObject = Ember.Object.extend DateableMixin
  subject = DateableObject.create()
  ok subject
