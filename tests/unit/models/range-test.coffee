`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'range', 'Range', {
  # Specify the other units that are required for this test.
  needs: ['model:quantity']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
