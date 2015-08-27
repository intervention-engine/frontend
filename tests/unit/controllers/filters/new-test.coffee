`import { test, moduleFor } from 'ember-qunit'`

moduleFor 'controller:filters/new', {
  # Specify the other units that are required for this test.
  needs: ['model:group','model:identifier',  'model:group-list', 'model:group-characteristic-component',
        'model:human-name',
        'model:contact-point',
        'model:address',
        'model:codeable-concept',
        'model:attachment',
        'model:patient-contact-component',
        'model:patient-animal-component',
        'model:patient-communication-component',
        'model:patient-link-component',
        'model:period',
        'model:coding',
        'model:encounter',
        'model:encounter-participant-component',
        'model:quantity',
        'model:encounter-hospitalization-component',
        'model:encounter-location-component',
        'model:condition',
        'model:condition-stage-component',
        'model:condition-evidence-component',
        'model:condition-location-component',
        'model:condition-due-to-component',
        'model:condition-occurred-following-component',
        'model:medication-statement',
        'model:medication-statement-dosage-component',
        'model:notification-count',
        'model:range',
        'model:appointment',
        'model:appointment-participant-component',
        'model:reference',
        'model:patient'
      ]
}

# Replace this with your real tests.
test 'it exists', ->
  controller = @subject()
  ok controller

test 'it updates hasFilterPane appropriately', ->
  controller = @subject()
  Ember.run ->
    controller.set('model', controller.get('store').createRecord('group'))
  ok false == controller.get('hasFilterPane')
