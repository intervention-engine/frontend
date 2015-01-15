`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'resource-reference', 'ResourceReference', {
  # Specify the other units that are required for this test.
  needs: ['model:thing-time']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
