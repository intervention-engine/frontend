`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'hospitalization', 'Hospitalization', {
  # Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:resource-reference', 'model:codeable-concept', 'model:period', 'model:accomodation', 'model:coding', 'model:date']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
