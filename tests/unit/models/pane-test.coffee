`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'pane', 'Pane', {
  # Specify the other units that are required for this test.
  needs: ['model:ember-item', 'model:extension']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
