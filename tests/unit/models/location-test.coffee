`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'location', 'Location', {
  # Specify the other units that are required for this test.
  needs: ['model:resource-reference', 'model:period', 'model:date']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
