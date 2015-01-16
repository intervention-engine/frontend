`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'contact', 'Contact', {
  # Specify the other units that are required for this test.
  needs: ['model:codeable-concept', 'model:human-name', 'model:contact-point', 'model:address', 'model:reference', 'model:coding', 'model:period']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
