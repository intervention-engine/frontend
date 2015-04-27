`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'response', 'Response', {
  # Specify the other units that are required for this test.
  needs: ['model:extension', 'model:resource-reference', 'model:codeable-concept', 'model:range']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
