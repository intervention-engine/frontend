import { generateUuid } from '../../../helpers/generate-uuid';
import { module, test } from 'qunit';

module('Unit | Helper | generate uuid');

test('prefixes', function(assert) {
  assert.ok(/^test\d+$/.test(generateUuid(['test'])), 'string prefix works');
  assert.ok(/^123\d+$/.test(generateUuid([123])), 'number prefix works');
  assert.ok(/^\[object Object\]\d+$/.test(generateUuid([{}])), 'object prefix works by calling toString() on passed in object');
  assert.ok(/^null\d+$/.test(generateUuid([null])), '"null" is used for null values');
  assert.ok(/^undefined\d+$/.test(generateUuid([])), '"undefined" is used for undefined values');
});
