`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'patient', 'Patient', {
  # Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:human-name', 'model:contact-point', 'model:address', 'model:codeable-concept', 'model:attachment', 'model:contact',
   'model:animal', 'model:reference', 'model:link', 'model:condition', 'model:observation', 'model:encounter', 'model:medicationStatement', 'model:period'
   'model:resource-reference', 'model:coding', 'model:location', 'model:quantity', 'model:participant', 'model:hospitalization', 'model:dosage', 'model:medication']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
