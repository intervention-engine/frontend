`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'ember-item', 'EmberItem', {
  # Specify the other units that are required for this test.
  needs: ['model:extension', 'model:codeable-concept']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
