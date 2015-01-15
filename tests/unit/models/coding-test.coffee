`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'coding', 'Coding', {
  # Specify the other units that are required for this test.
  needs: ['model:resource-reference']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
