import { helper } from 'ember-helper';
import moment from 'moment';

export function isTodayOrAfter([date]/*, hash*/) {
  let now = moment();

  return now.isSame(date, 'day') || now.isBefore(date, 'day');
}

export default helper(isTodayOrAfter);
