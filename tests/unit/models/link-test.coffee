`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'link', 'Link', {
  # Specify the other units that are required for this test.
  needs: ['model:reference']
}

test 'it exists', ->
  model = @subject()
  # store = @store()
  ok !!model
