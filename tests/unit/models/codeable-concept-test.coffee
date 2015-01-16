`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'codeable-concept', 'CodeableConcept', {
  # Specify the other units that are required for this test.
  needs: ['model:coding', 'model:resource-reference']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
