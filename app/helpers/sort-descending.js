import { helper } from 'ember-helper';

export function sortDescending([sortDescending, invert = false]) {
  if (invert) {
    return !sortDescending;
  }

  return sortDescending;
}

export default helper(sortDescending);
