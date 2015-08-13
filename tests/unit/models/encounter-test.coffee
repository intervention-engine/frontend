`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'encounter', 'Encounter', {
  # Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:codeable-concept', 'model:period', 'model:quantity', 'model:location', 'model:coding']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
