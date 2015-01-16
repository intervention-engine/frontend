`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'participant', 'Participant', {
  # Specify the other units that are required for this test.
  needs: ['model:codeable-concept', 'model:resource-reference', 'model:coding']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
