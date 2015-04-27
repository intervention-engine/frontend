`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'extension', 'Extension', {
  # Specify the other units that are required for this test.
  needs: ['model:codeable-concept', 'model:coding', 'model:range', 'model:quantity']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
