`import { test, moduleForModel } from 'ember-qunit'`

moduleForModel 'medication-statement', 'MedicationStatement', {
  # Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:codeable-concept',
          'model:period', 'model:coding', 'model:medication',
          'model:quantity', 'model:reference',
          'model:medication-statement-dosage-component',
          'model:timing', 'model:ratio']
}

test 'a medication statement without an period end has not occured', ->
  model = @subject()
  ok !model.hasOccured('whenGiven.end')

test 'a medication statement with an period end in the future has not occured', ->
  period = null
  Ember.run =>
    period = @store().createRecord('period', {end: new Date(2020, 1, 1)})
  model = @subject({whenGiven: period})
  ok !model.hasOccured('whenGiven.end')

test 'a medication statement with an period end in the past has occured', ->
  period = null
  Ember.run =>
    period = @store().createRecord('period', {end: new Date(2000, 1, 1)})
  model = @subject({whenGiven: period})
  ok model.hasOccured('whenGiven.end')