`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'reference', 'Reference', {
  # Specify the other units that are required for this test.
  needs: []
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
