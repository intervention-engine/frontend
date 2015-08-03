`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'encounter', 'Encounter', {
  # Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:codeable-concept', 'model:resource-reference', 'model:reference', 'model:participant', 'model:period', 'model:quantity', 'model:hospitalization', 'model:location', 'model:coding', 'model:date', 'model:accomodation']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
