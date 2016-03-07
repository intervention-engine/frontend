import { arrayContains } from '../../../helpers/array-contains';
import { module, test } from 'qunit';
import { A } from 'ember-array/utils';

module('Unit | Helper | array contains');

test('native array tests', function(assert) {
  assert.ok(arrayContains([[1, 2, 3], 1]), 'true when element exists in array');
  assert.notOk(arrayContains([[1, 2, 3], 4]), 'false when element does not exist in array');
});

test('Ember array tests', function(assert) {
  assert.ok(arrayContains([new A([1, 2, 3]), 2]), 'true when element exists in array');
  assert.notOk(arrayContains([new A([1, 2, 3]), 4]), 'false when element does not exist in array');
});

test('non array tests', function(assert) {
  assert.notOk(arrayContains([null, 1]), 'works when array is null');
  assert.notOk(arrayContains([undefined, 1]), 'works when array is undefined');
  assert.notOk(arrayContains([1, 1]), 'works when first element is not an array');
});
