import { helper } from 'ember-helper';
import Ember from 'ember';

export function uniqBy(array, by) {
  let ret = Ember.A();
  let seen = {};

  array.forEach((item) => {
      let guid = item.get(by);
      if (!(guid in seen)) {
        seen[guid] = true;
        ret.push(item);
      }
    });
  return ret;
}

export default helper(uniqBy);
