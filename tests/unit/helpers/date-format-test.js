import { dateFormat } from '../../../helpers/date-format';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Helper | date format');

// Replace this with your real tests.
test('only date', function(assert) {
  let now = new Date();

  assert.equal(dateFormat([now]), moment(now).format('lll'), 'correctly formatted date given a Date object');
  assert.equal(dateFormat([moment(now)]), moment(now).format('lll'), 'correctly formatted date given a Moment object');
});

test('date and format', function(assert) {
  let now = new Date();

  assert.equal(dateFormat([now, 'x']), moment(now).format('x'), 'correctly formatted date given a Date object');
  assert.equal(dateFormat([moment(now), 'x']), moment(now).format('x'), 'correctly formatted date given a Moment object');
});
