`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'query', 'Query', {
  # Specify the other units that are required for this test.
  needs: ['model:extension', 'model:response', 'model:codeable-concept', 'model:resource-reference']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
