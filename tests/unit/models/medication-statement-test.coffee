`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'medication-statement', 'MedicationStatement', {
  # Specify the other units that are required for this test.
  needs: ['model:resource-reference', 'model:identifier', 'model:codeable-concept',
          'model:dosage', 'model:period', 'model:coding', 'model:medication',
          'model:quantity']
}

test 'a medication statement without an period end is active', ->
  model = @subject()
  ok model.get('active')

test 'a medication statement with an period end in the future is active', ->
  model = @subject({period: {end: new Date(2020, 1, 1)}})
  ok model.get('active')

test 'a medication statement with an period end in the past is not active', ->
  model = @subject({period: {end: new Date(2000, 1, 1)}})
  ok !model.get('active')