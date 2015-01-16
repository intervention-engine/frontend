`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'filter', 'Filter', {
  # Specify the other units that are required for this test.
  needs: ['model:query', 'model:pane', 'model:extension', 'model:response', 'model:ember-item']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
