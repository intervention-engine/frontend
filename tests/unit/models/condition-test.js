import { moduleForModel, test } from 'ember-qunit';
import moment from 'moment';

moduleForModel('condition', 'Unit | Model | condition', {
  // Specify the other units that are required for this test.
  needs: ['model:identifier', 'model:codeable-concept',
        'model:location', 'model:period', 'model:coding',
        'model:reference', 'model:quantity', 'model:range',
        'model:condition-stage-component',
        'model:condition-evidence-component']
});

test('a condition without an abatementDate has not occured', function(assert) {
  let model = this.subject();
  assert.ok(!model.hasOccured('endDate'));
});

test('a condition with an abatementDate in the future has not occured', function(assert) {
  let model = this.subject({
    abatementDateTime: new Date(2020, 1, 1)
  });
  assert.ok(!model.hasOccured('endDate'));
});

test('a condition with an abatementDate in the past has occured', function(assert) {
  let model = this.subject({
    abatementDateTime: new Date(2000, 1, 1)
  });
  assert.ok(model.hasOccured('endDate'));
});

test('a condition is inactive', function(assert) {
  let model = this.subject({
    abatementDateTime: new Date(2000, 1, 1)
  });
  assert.ok(!model.isActive('endDate'));
});

test('a condition is active', function(assert) {
  let model = this.subject();
  assert.ok(model.isActive('endDate'));
});

test('a condition is active if abatementDate is in the future', function(assert) {
  let model = this.subject({
    abatementDateTime: moment().add(1, 'day').toDate()
  });
  assert.ok(model.isActive('endDate'));
});
