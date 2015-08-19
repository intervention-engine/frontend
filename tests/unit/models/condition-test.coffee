`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'condition', 'Conditon', {
  # Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:codeable-concept',
          'model:location', 'model:period', 'model:coding',
          'model:reference', 'model:quantity', 'model:range',
          'model:condition-stage-component',
          'model:condition-evidence-component',
          'model:condition-location-component',
          'model:condition-due-to-component',
          'model:condition-occurred-following-component']
}

test 'a condition without an abatementDate has not occured', ->
  model = @subject()
  ok !model.hasOccured('endDate')

test 'a condition with an abatementDate in the future has not occured', ->
  model = @subject({abatementDate: new Date(2020, 1, 1)})
  ok !model.hasOccured('endDate')

test 'a condition with an abatementDate in the past has occured', ->
  model = @subject({abatementDate: new Date(2000, 1, 1)})
  ok model.hasOccured('endDate')