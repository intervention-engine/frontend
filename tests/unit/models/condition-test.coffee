`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'condition', 'Conditon', {
  # Specify the other units that are required for this test.
  needs: ['model:resource-reference', 'model:identifier', 'model:codeable-concept',
          'model:location', 'model:period', 'model:coding']
}

test 'a condition without an abatementDate is active', ->
  model = @subject()
  ok model.get('active')

test 'a condition with an abatementDate in the future is active', ->
  model = @subject({abatementDate: new Date(2020, 1, 1)})
  ok model.get('active')

test 'a condition with an abatementDate in the past is not active', ->
  model = @subject({abatementDate: new Date(2000, 1, 1)})
  ok !model.get('active')