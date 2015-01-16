`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'patient', 'Patient', {
  # Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:human-name', 'model:contact-point', 'model:address', 'model:codeable-concept', 'model:attachment', 'model:contact', 'model:animal', 'model:reference', 'model:link', 'model:period', 'model:resource-reference', 'model:coding']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
