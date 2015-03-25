`import { test, moduleFor } from 'ember-qunit'`

moduleFor 'controller:filters/new', 'FiltersNewController', {
  # Specify the other units that are required for this test.
  needs: ['controller:filters.new']
}

# Replace this with your real tests.
test 'it exists', ->
  controller = @subject()
  ok controller

test 'it updates hasFilterPane appropriately', ->
  controller = @subject()
  ok false == controller.get('hasFilterPane')
