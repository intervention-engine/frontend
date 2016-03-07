import { helper } from 'ember-helper';
import numeral from 'numeral';

export function numeralFormat([number, format]) {
  return numeral(number).format(format);
}

export default helper(numeralFormat);
