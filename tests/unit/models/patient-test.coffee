`import { test, moduleForModel} from 'ember-qunit'`

moduleForModel 'patient', 'Patient', {
  # Specify the other units that are required for this test.
  needs: ['adapter:application', 'serializer:application',
   'serializer:patient', 'model:identifier', 'model:human-name',
   'model:contact-point', 'model:address',
   'model:codeable-concept', 'serializer:codeable-concept', 'model:attachment',
   'model:contact', 'model:animal', 'model:reference',
   'model:link', 'model:condition',
   'model:observation', 'model:encounter', 'serializer:encounter',
   'model:medicationStatement', 'model:period',
   'model:resource-reference', 'model:coding', 'serializer:coding',
   'model:location', 'model:quantity',
   'model:participant', 'model:hospitalization',
   'model:dosage', 'model:medication', 'model:accomodation']
  setup: ->
    @store().adapterFor('patient').reopen({namespace: 'testing'})
    @store().serializerFor('patient').reopen({testingPrefix: true})
}

test 'fullName', ->
  store = @store()
  model = null
  Ember.run ->
    model = store.find('patient', 1)
  model.then ->
    equal model.get('fullName'), 'A, BH_Adult'

test 'inpatientAdmissions', ->
  store = @store()
  patient = null
  admissions = null
  Ember.run ->
    patient = store.find('patient', 1)
  patient.then ->
    patient.get('encounters').then ->
      ia = patient.get('inpatientAdmissions')
      equal ia.get('length'), 1
