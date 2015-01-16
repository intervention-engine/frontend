`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'period', 'Period', {
  # Specify the other units that are required for this test.
  needs: ['model:date']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
