import { moduleForModel, test } from 'ember-qunit';
import run from 'ember-runloop';

moduleForModel('medication-statement', 'Unit | Model | medication statement', {
  // Specify the other units that are required for this test.
  needs: [
    'model:identifier', 'model:codeable-concept',
    'model:period', 'model:coding', 'model:medication',
    'model:quantity', 'model:reference',
    'model:medication-statement-dosage-component',
    'model:timing', 'model:ratio', 'model:range'
  ]
});

test('a medication statement without an period end has not occured', function(assert) {
  let model = this.subject();
  assert.ok(!model.hasOccured('whenGiven.end'));
});

test('a medication statement with an period end in the future has not occured', function(assert) {
  let period = null;

  run(() => {
    period = this.store().createRecord('period', {
      end: new Date(2020, 1, 1)
    });
  });

  let model = this.subject({
    whenGiven: period
  });

  assert.ok(!model.hasOccured('whenGiven.end'));
});

test('a medication statement with an period end in the past has occured', function(assert) {
  let period = null;

  run(() => {
    period = this.store().createRecord('period', {
      end: new Date(2000, 1, 1)
    });
  });

  let model = this.subject({
    whenGiven: period
  });

  assert.ok(model.hasOccured('whenGiven.end'));
});
