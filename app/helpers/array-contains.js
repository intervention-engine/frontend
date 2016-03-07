import { helper } from 'ember-helper';
import { isEmberArray } from 'ember-array/utils';

export function arrayContains([array, value]) {
  if (!isEmberArray(array)) {
    return false;
  }

  return array.contains(value);
}

export default helper(arrayContains);
