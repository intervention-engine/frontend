`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'identifier', 'Identifier', {
  # Specify the other units that are required for this test.
  needs: ['model:period', 'model:resource-reference', 'model:date']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
