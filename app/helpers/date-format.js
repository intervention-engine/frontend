import { helper } from 'ember-helper';
import moment from 'moment';

export function dateFormat([date, format='lll']) {
  return moment(date).format(format);
}

export default helper(dateFormat);
